"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  type ActivityType,
  type AvailabilitySlot,
  type BookingRequestResult,
  createBookingRequest,
  getAvailability,
  TopaApiError,
} from "../../lib/topa-api";

type PublicBookingActivity = Exclude<ActivityType, "EVENT">;

const activities: { value: PublicBookingActivity; label: string }[] = [
  { value: "CAFETERIA", label: "Cafetería y juego" },
  { value: "WORKSHOP", label: "Taller TOPA" },
];

const initialForm = {
  customerName: "",
  phone: "",
  email: "",
  adults: "1",
  children: "0",
  infants: "0",
  dietaryRestrictions: "",
  notes: "",
  communicationConsent: false,
};

type BookingForm = typeof initialForm;

type CafeteriaAddOn = {
  slot: AvailabilitySlot;
  workshopSlotIds: string[];
};

function formatTime(value: Date) {
  const parts = new Intl.DateTimeFormat("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(value);
  const hour = parts.find((part) => part.type === "hour")?.value ?? "";
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return minute === "00" ? hour : `${hour}:${minute}`;
}

function formatSlot(slot: AvailabilitySlot) {
  const start = new Date(slot.startsAt);
  const end = new Date(slot.endsAt);
  const date = new Intl.DateTimeFormat("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(start);
  return `${date} · ${formatTime(start)} a ${formatTime(end)} hs`;
}

function upcomingSlotsRange() {
  const from = new Date();
  from.setHours(0, 0, 0, 0);

  const to = new Date(from);
  to.setDate(to.getDate() + 14);
  to.setHours(23, 59, 59, 999);
  return { from, to };
}

function isOnSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getCafeteriaAddOns(
  workshopSlots: AvailabilitySlot[],
  cafeteriaSlots: AvailabilitySlot[],
): CafeteriaAddOn[] {
  const addOnsBySlotId = new Map<string, CafeteriaAddOn>();

  for (const workshopSlot of workshopSlots) {
    const workshopEnd = new Date(workshopSlot.endsAt);
    const nextCafeteriaSlot = cafeteriaSlots
      .filter((cafeteriaSlot) => {
        const cafeteriaStart = new Date(cafeteriaSlot.startsAt);
        return (
          cafeteriaSlot.status !== "FULL" &&
          isOnSameDay(workshopEnd, cafeteriaStart) &&
          cafeteriaStart.getTime() >= workshopEnd.getTime()
        );
      })
      .sort(
        (left, right) =>
          new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime(),
      )[0];

    if (!nextCafeteriaSlot) continue;

    const slotId = String(nextCafeteriaSlot.id);
    const existingAddOn = addOnsBySlotId.get(slotId);
    if (existingAddOn) {
      existingAddOn.workshopSlotIds.push(String(workshopSlot.id));
    } else {
      addOnsBySlotId.set(slotId, {
        slot: nextCafeteriaSlot,
        workshopSlotIds: [String(workshopSlot.id)],
      });
    }
  }

  return [...addOnsBySlotId.values()].sort(
    (left, right) =>
      new Date(left.slot.startsAt).getTime() - new Date(right.slot.startsAt).getTime(),
  );
}

function validate(
  form: BookingForm,
  selectedSlotIds: string[],
  isWorkshop: boolean,
  selectedCafeteriaSlotIds: string[],
) {
  const errors: Record<string, string> = {};
  const includesCafeteria = !isWorkshop || selectedCafeteriaSlotIds.length > 0;
  if (!form.customerName.trim()) errors.customerName = "Ingresá tu nombre.";
  if (isWorkshop && !form.email.trim()) {
    errors.email = "Ingresá el email del padre o madre.";
  } else if (!isWorkshop && !form.email.trim()) {
    errors.email = "Ingresá un email.";
  }
  if (includesCafeteria) {
    if (!form.phone.trim()) errors.phone = "Ingresá un celular.";
    if (Number(form.adults) < 1) errors.adults = "La reserva requiere al menos un adulto.";
  }
  if (selectedSlotIds.length === 0) {
    errors.availabilitySlotId = isWorkshop
      ? "Elegí al menos un taller disponible."
      : "Elegí un turno disponible.";
  }

  const quantities = (
    isWorkshop
      ? includesCafeteria
        ? ["adults", "children"]
        : []
      : ["adults", "children", "infants"]
  ) as ("adults" | "children" | "infants")[];
  for (const field of quantities) {
    const value = Number(form[field]);
    if (!Number.isInteger(value) || value < 0 || value > 52) {
      errors[field] = "Ingresá un número entero entre 0 y 52.";
    }
  }

  return errors;
}

export function BookingPlanner({
  initialActivity = "CAFETERIA",
}: {
  initialActivity?: PublicBookingActivity;
}) {
  const [activity, setActivity] = useState<PublicBookingActivity>(initialActivity);
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [cafeteriaSlots, setCafeteriaSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedCafeteriaSlotIds, setSelectedCafeteriaSlotIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [cafeteriaAvailabilityError, setCafeteriaAvailabilityError] = useState("");
  const [availabilityRefresh, setAvailabilityRefresh] = useState(0);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<BookingRequestResult[]>([]);
  const idempotencyKeysBySlot = useRef<Record<string, string>>({});
  const isWorkshop = activity === "WORKSHOP";
  const selectedWorkshopSlots = useMemo(
    () => slots.filter((slot) => selectedSlotIds.includes(String(slot.id))),
    [slots, selectedSlotIds],
  );
  const cafeteriaAddOns = useMemo(
    () => (isWorkshop ? getCafeteriaAddOns(selectedWorkshopSlots, cafeteriaSlots) : []),
    [isWorkshop, selectedWorkshopSlots, cafeteriaSlots],
  );
  const cafeteriaAddOnIdSet = useMemo(
    () => new Set(cafeteriaAddOns.map((addOn) => String(addOn.slot.id))),
    [cafeteriaAddOns],
  );
  const selectedCafeteriaAddOnIds = selectedCafeteriaSlotIds.filter((slotId) =>
    cafeteriaAddOnIdSet.has(slotId),
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadSlots() {
      const { from, to } = upcomingSlotsRange();

      try {
        const availability = await getAvailability(activity, from, to, controller.signal);
        setSlots(availability);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setSlots([]);
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "No pudimos consultar la disponibilidad.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadSlots();
    return () => controller.abort();
  }, [activity, availabilityRefresh]);

  useEffect(() => {
    if (!isWorkshop) return;

    const controller = new AbortController();

    async function loadCafeteriaSlots() {
      const { from, to } = upcomingSlotsRange();

      try {
        const availability = await getAvailability("CAFETERIA", from, to, controller.signal);
        setCafeteriaSlots(availability);
        setCafeteriaAvailabilityError("");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setCafeteriaSlots([]);
        setCafeteriaAvailabilityError(
          error instanceof Error
            ? error.message
            : "No pudimos consultar los turnos de cafetería.",
        );
      }
    }

    void loadCafeteriaSlots();
    return () => controller.abort();
  }, [isWorkshop, availabilityRefresh]);

  function updateForm(field: keyof BookingForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "", contact: "" }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate(form, selectedSlotIds, isWorkshop, selectedCafeteriaAddOnIds);
    setFieldErrors(errors);
    setSubmitError("");
    setResults([]);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const requests = selectedSlotIds.map((availabilitySlotId) => {
      const activityType = activity;
      const requestKey = `${activityType}:${availabilitySlotId}`;
      const idempotencyKey =
        idempotencyKeysBySlot.current[requestKey] ?? crypto.randomUUID();
      idempotencyKeysBySlot.current[requestKey] = idempotencyKey;

      return { activityType, availabilitySlotId, idempotencyKey, requestKey };
    });
    if (isWorkshop) {
      for (const availabilitySlotId of selectedCafeteriaAddOnIds) {
        const activityType = "CAFETERIA" as const;
        const requestKey = `${activityType}:${availabilitySlotId}`;
        const idempotencyKey =
          idempotencyKeysBySlot.current[requestKey] ?? crypto.randomUUID();
        idempotencyKeysBySlot.current[requestKey] = idempotencyKey;
        requests.push({ activityType, availabilitySlotId, idempotencyKey, requestKey });
      }
    }
    const responses = await Promise.allSettled(
      requests.map(({ activityType, availabilitySlotId, idempotencyKey }) =>
        createBookingRequest({
          customerName: form.customerName.trim(),
          phone: activityType === "WORKSHOP" ? undefined : form.phone.trim(),
          email: form.email.trim() || undefined,
          communicationConsent: form.communicationConsent,
          availabilitySlotId: Number(availabilitySlotId),
          adults: activityType === "WORKSHOP" ? 0 : Number(form.adults),
          children: activityType === "WORKSHOP" ? 1 : Number(form.children),
          infants: activityType === "WORKSHOP" ? 0 : Number(form.infants),
          dietaryRestrictions: form.dietaryRestrictions.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }, idempotencyKey),
      ),
    );
    const successfulResponses = responses.flatMap((response) =>
      response.status === "fulfilled" ? [response.value] : [],
    );
    const failedRequests = responses.flatMap((response, index) =>
      response.status === "rejected" ? [requests[index]] : [],
    );

    if (successfulResponses.length > 0) setResults(successfulResponses);

    if (failedRequests.length > 0) {
      const firstFailure = responses.find(
        (response): response is PromiseRejectedResult => response.status === "rejected",
      );
      const error = firstFailure?.reason;
      if (error instanceof TopaApiError) setFieldErrors(error.fields);
      setSubmitError(
        successfulResponses.length > 0
          ? `Enviamos ${successfulResponses.length} ${successfulResponses.length === 1 ? "solicitud" : "solicitudes"}. Revisá las reservas seleccionadas e intentá nuevamente.`
          : error instanceof TopaApiError
            ? error.message
            : "No pudimos enviar tu solicitud. Intentá nuevamente.",
      );
    } else {
      setSelectedSlotIds([]);
      setSelectedCafeteriaSlotIds([]);
      for (const { requestKey } of requests) {
        delete idempotencyKeysBySlot.current[requestKey];
      }
    }

    setIsSubmitting(false);
  }

  function toggleSlot(slotId: string) {
    if (!isWorkshop) {
      for (const selectedSlotId of selectedSlotIds) {
        if (selectedSlotId !== slotId) {
          delete idempotencyKeysBySlot.current[`${activity}:${selectedSlotId}`];
        }
      }
      setSelectedSlotIds([slotId]);
      setFieldErrors((current) => ({ ...current, availabilitySlotId: "" }));
      return;
    }

    const nextWorkshopSlotIds = selectedSlotIds.includes(slotId)
      ? selectedSlotIds.filter((selectedSlotId) => selectedSlotId !== slotId)
      : [...selectedSlotIds, slotId];
    if (selectedSlotIds.includes(slotId)) {
      delete idempotencyKeysBySlot.current[`WORKSHOP:${slotId}`];
    }
    const nextWorkshopSlots = slots.filter((slot) =>
      nextWorkshopSlotIds.includes(String(slot.id)),
    );
    const nextCafeteriaSlotIds = new Set(
      getCafeteriaAddOns(nextWorkshopSlots, cafeteriaSlots).map((addOn) => String(addOn.slot.id)),
    );
    setSelectedSlotIds(nextWorkshopSlotIds);
    setSelectedCafeteriaSlotIds((current) =>
      current.filter((selectedSlotId) => nextCafeteriaSlotIds.has(selectedSlotId)),
    );
    setFieldErrors((current) => ({ ...current, availabilitySlotId: "" }));
  }

  function toggleCafeteriaAddOn(slotId: string) {
    const isFirstSelection =
      selectedCafeteriaAddOnIds.length === 0 && !selectedCafeteriaAddOnIds.includes(slotId);
    if (isFirstSelection) {
      setForm((currentForm) => ({
        ...currentForm,
        adults: Number(currentForm.adults) < 1 ? "1" : currentForm.adults,
        children: currentForm.children === "0" ? "1" : currentForm.children,
      }));
    }
    setSelectedCafeteriaSlotIds((current) => {
      const activeSlotIds = current.filter((selectedSlotId) =>
        cafeteriaAddOnIdSet.has(selectedSlotId),
      );
      if (activeSlotIds.includes(slotId)) {
        delete idempotencyKeysBySlot.current[`CAFETERIA:${slotId}`];
        return activeSlotIds.filter((selectedSlotId) => selectedSlotId !== slotId);
      }
      return [...activeSlotIds, slotId];
    });
    setFieldErrors((current) => ({ ...current, adults: "", children: "", phone: "" }));
  }

  function selectActivity(nextActivity: PublicBookingActivity) {
    if (nextActivity === activity) return;
    setActivity(nextActivity);
    setSelectedSlotIds([]);
    setSelectedCafeteriaSlotIds([]);
    idempotencyKeysBySlot.current = {};
    setResults([]);
    setIsLoading(true);
    setAvailabilityError("");
    setCafeteriaAvailabilityError("");
    if (nextActivity === "CAFETERIA") {
      setForm((current) => ({
        ...current,
        adults: Number(current.adults) < 1 ? "1" : current.adults,
      }));
    }
  }

  function retryLoadSlots() {
    setIsLoading(true);
    setAvailabilityError("");
    setAvailabilityRefresh((current) => current + 1);
  }

  return (
    <div className="public-booking">
      <div className="booking-activity-tabs" aria-label="Tipo de experiencia">
        {activities.map((item) => (
          <button
            className={item.value === activity ? "booking-tab is-active" : "booking-tab"}
            key={item.value}
            type="button"
            onClick={() => selectActivity(item.value)}
            aria-pressed={item.value === activity}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={selectedSlotIds.length > 0 ? "booking-layout" : "booking-layout is-awaiting-selection"}>
        <section className="availability-panel" aria-labelledby="turnos-title">
          <div className="booking-panel-heading">
            <p className="eyebrow">Próximos turnos</p>
            <h3 id="turnos-title">
              {isWorkshop ? "Elegí uno o varios talleres" : "Elegí un turno"}
            </h3>
            {isWorkshop ? (
              <p>Podés seleccionar varios talleres y completar tus datos una sola vez.</p>
            ) : null}
          </div>
          {isLoading ? <p className="booking-status">Buscando turnos disponibles…</p> : null}
          {availabilityError ? (
            <div className="form-banner is-error" role="alert">
              <p>{availabilityError}</p>
              <button type="button" onClick={retryLoadSlots}>
                Volver a intentar
              </button>
            </div>
          ) : null}
          {!isLoading && !availabilityError && slots.length === 0 ? (
            <p className="booking-status">
              Todavía no hay turnos publicados para esta experiencia. Probá más tarde o escribinos por WhatsApp.
            </p>
          ) : null}
          <div className="slot-list" aria-live="polite">
            {slots.map((slot) => {
              const isFull = slot.status === "FULL";
              const selected = selectedSlotIds.includes(String(slot.id));
              return (
                <button
                  className={selected ? "slot-button is-selected" : "slot-button"}
                  key={slot.id}
                  type="button"
                  disabled={isFull}
                  aria-pressed={selected}
                  onClick={() => toggleSlot(String(slot.id))}
                >
                  <span>{formatSlot(slot)}</span>
                  {isFull ? <small>Sin cupo</small> : null}
                  {slot.publicNotes ? <em>{slot.publicNotes}</em> : null}
                </button>
              );
            })}
          </div>
          {isWorkshop ? (
            <p className="selection-summary" aria-live="polite">
              {selectedSlotIds.length === 0
                ? "Todavía no seleccionaste talleres."
                : `${selectedSlotIds.length} ${selectedSlotIds.length === 1 ? "taller seleccionado" : "talleres seleccionados"}.`}
            </p>
          ) : null}
          {fieldErrors.availabilitySlotId ? (
            <p className="field-error">{fieldErrors.availabilitySlotId}</p>
          ) : null}
        </section>

        {selectedSlotIds.length > 0 ? <form className="booking-form" onSubmit={submit} noValidate>
          <div className="booking-panel-heading">
            <p className="eyebrow">Tus datos</p>
            <h3>{isWorkshop ? "Datos para el taller" : "Contanos quiénes vienen"}</h3>
            <p>La solicitud queda pendiente hasta que TOPA confirme la disponibilidad.</p>
          </div>

          <label className="field">
            <span>{isWorkshop ? "Nombre y apellido del niño" : "Nombre y apellido"}</span>
            <input
              value={form.customerName}
              onChange={(event) => updateForm("customerName", event.target.value)}
              aria-invalid={Boolean(fieldErrors.customerName)}
              autoComplete="name"
              required
            />
            {fieldErrors.customerName ? <small className="field-error">{fieldErrors.customerName}</small> : null}
          </label>

          <div className={isWorkshop ? "field-row field-row-single" : "field-row"}>
            {!isWorkshop ? <label className="field">
              <span>Celular *</span>
              <input
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(fieldErrors.phone)}
                required
              />
            </label> : null}
            <label className="field">
              <span>{isWorkshop ? "Email del padre o madre" : "Email"} *</span>
              <input
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.email)}
                required
              />
            </label>
          </div>
          {fieldErrors.email || (!isWorkshop && fieldErrors.phone) ? (
            <p className="field-error">{fieldErrors.email || fieldErrors.phone}</p>
          ) : null}

          {!isWorkshop ? <div className="guest-counts" aria-label="Cantidad de asistentes">
            {([
              ["adults", "Adultos"],
              ["children", "Niños"],
              ["infants", "Bebés"],
            ] as const).map(([field, label]) => (
              <label className="field" key={field}>
                <span>{label}</span>
                <input
                  type="number"
                  min={field === "adults" ? "1" : "0"}
                  max="52"
                  value={form[field]}
                  onChange={(event) => updateForm(field, event.target.value)}
                  aria-invalid={Boolean(fieldErrors[field])}
                />
                {fieldErrors[field] ? <small className="field-error">{fieldErrors[field]}</small> : null}
              </label>
            ))}
          </div> : null}

          {isWorkshop && cafeteriaAddOns.length > 0 ? (
            <fieldset className="cafeteria-add-on">
              <legend>¿Quieren seguir en la cafetería?</legend>
              <p>
                Podés sumar el turno que sigue ese mismo día y completar ambas reservas ahora.
              </p>
              <div className="cafeteria-add-on-slots">
                {cafeteriaAddOns.map((addOn) => {
                  const slotId = String(addOn.slot.id);
                  const selected = selectedCafeteriaAddOnIds.includes(slotId);
                  return (
                    <label
                      className={selected ? "cafeteria-add-on-option is-selected" : "cafeteria-add-on-option"}
                      key={slotId}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleCafeteriaAddOn(slotId)}
                      />
                      <span>
                        <strong>{formatSlot(addOn.slot)}</strong>
                        <small>
                          {addOn.workshopSlotIds.length === 1
                            ? "Es el turno siguiente a tu taller."
                            : "Es el turno siguiente a algunos de tus talleres."}
                        </small>
                      </span>
                    </label>
                  );
                })}
              </div>

              {selectedCafeteriaAddOnIds.length > 0 ? (
                <div className="cafeteria-add-on-details">
                  <p>Indicá cuántas personas se quedan a jugar en cada turno de cafetería seleccionado.</p>
                  <div className="guest-counts guest-counts-two" aria-label="Asistentes a la cafetería">
                    {([
                      ["adults", "Adultos"],
                      ["children", "Niños"],
                    ] as const).map(([field, label]) => (
                      <label className="field" key={field}>
                        <span>{label}</span>
                        <input
                          type="number"
                          min={field === "adults" ? "1" : "0"}
                          max="52"
                          value={form[field]}
                          onChange={(event) => updateForm(field, event.target.value)}
                          aria-invalid={Boolean(fieldErrors[field])}
                        />
                        {fieldErrors[field] ? <small className="field-error">{fieldErrors[field]}</small> : null}
                      </label>
                    ))}
                  </div>
                  <label className="field">
                    <span>Celular de contacto *</span>
                    <input
                      value={form.phone}
                      onChange={(event) => updateForm("phone", event.target.value)}
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={Boolean(fieldErrors.phone)}
                      required
                    />
                    {fieldErrors.phone ? <small className="field-error">{fieldErrors.phone}</small> : null}
                  </label>
                </div>
              ) : null}
            </fieldset>
          ) : null}

          {isWorkshop && selectedSlotIds.length > 0 && cafeteriaAvailabilityError ? (
            <p className="booking-add-on-status" role="status">
              No pudimos verificar ahora los turnos de cafetería. Podés enviar igualmente la reserva del taller.
            </p>
          ) : null}

          <label className="field">
            <span>Restricciones alimentarias <small>(opcional)</small></span>
            <input
              value={form.dietaryRestrictions}
              onChange={(event) => updateForm("dietaryRestrictions", event.target.value)}
              placeholder="Por ejemplo: celíaca"
            />
          </label>
          <label className="field">
            <span>Algo más que necesitemos saber <small>(opcional)</small></span>
            <textarea
              value={form.notes}
              onChange={(event) => updateForm("notes", event.target.value)}
              rows={3}
            />
          </label>
          <label className="consent-field">
            <input
              type="checkbox"
              checked={form.communicationConsent}
              onChange={(event) => updateForm("communicationConsent", event.target.checked)}
            />
            <span>Quiero recibir novedades de TOPA.</span>
          </label>

          {submitError ? <div className="form-banner is-error" role="alert">{submitError}</div> : null}
          {results.length > 0 ? (
            <div className="booking-success" role="status">
              <strong>{results.length === 1 ? "Solicitud recibida" : "Solicitudes recibidas"}</strong>
              <p>
                {results.length === 1
                  ? results[0].message || "Recibimos tu solicitud."
                  : `Recibimos tus ${results.length} solicitudes.`}
              </p>
              <small>Es una solicitud pendiente: TOPA te confirmará la disponibilidad.</small>
            </div>
          ) : null}

          <button className="button button-primary booking-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando solicitud…" : "Enviar solicitud"}
            <span aria-hidden="true">→</span>
          </button>
        </form> : <aside className="booking-continue-card" aria-live="polite"><p className="eyebrow">Siguiente paso</p><h3>{isWorkshop ? "Primero elegí al menos un taller." : "Primero elegí un turno."}</h3><p>Cuando selecciones un horario disponible, se abrirá el formulario para completar tus datos.</p></aside>}
      </div>
    </div>
  );
}
