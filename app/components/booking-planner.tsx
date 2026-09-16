"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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

function validate(
  form: BookingForm,
  selectedSlotIds: string[],
  isWorkshop: boolean,
) {
  const errors: Record<string, string> = {};
  if (!form.customerName.trim()) errors.customerName = "Ingresá tu nombre.";
  if (isWorkshop && !form.email.trim()) {
    errors.email = "Ingresá el email del padre o madre.";
  } else if (!isWorkshop) {
    if (!form.phone.trim()) errors.phone = "Ingresá un celular.";
    if (!form.email.trim()) errors.email = "Ingresá un email.";
    if (Number(form.adults) < 1) errors.adults = "La reserva requiere al menos un adulto.";
  }
  if (selectedSlotIds.length === 0) {
    errors.availabilitySlotId = isWorkshop
      ? "Elegí al menos un taller disponible."
      : "Elegí un turno disponible.";
  }

  const quantities = (isWorkshop ? [] : ["adults", "children", "infants"]) as const;
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
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [availabilityRefresh, setAvailabilityRefresh] = useState(0);
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<BookingRequestResult[]>([]);
  const idempotencyKeysBySlot = useRef<Record<string, string>>({});
  const isWorkshop = activity === "WORKSHOP";

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

  function updateForm(field: keyof BookingForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "", contact: "" }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate(form, selectedSlotIds, isWorkshop);
    setFieldErrors(errors);
    setSubmitError("");
    setResults([]);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    const requests = selectedSlotIds.map((availabilitySlotId) => {
      const idempotencyKey =
        idempotencyKeysBySlot.current[availabilitySlotId] ?? crypto.randomUUID();
      idempotencyKeysBySlot.current[availabilitySlotId] = idempotencyKey;

      return { availabilitySlotId, idempotencyKey };
    });
    const responses = await Promise.allSettled(
      requests.map(({ availabilitySlotId, idempotencyKey }) =>
        createBookingRequest({
          customerName: form.customerName.trim(),
          phone: isWorkshop ? undefined : form.phone.trim() || undefined,
          email: form.email.trim() || undefined,
          communicationConsent: form.communicationConsent,
          availabilitySlotId: Number(availabilitySlotId),
          adults: isWorkshop ? 0 : Number(form.adults),
          children: isWorkshop ? 1 : Number(form.children),
          infants: isWorkshop ? 0 : Number(form.infants),
          dietaryRestrictions: form.dietaryRestrictions.trim() || undefined,
          notes: form.notes.trim() || undefined,
        }, idempotencyKey),
      ),
    );
    const successfulResponses = responses.flatMap((response) =>
      response.status === "fulfilled" ? [response.value] : [],
    );
    const failedSlotIds = responses.flatMap((response, index) =>
      response.status === "rejected" ? [requests[index].availabilitySlotId] : [],
    );
    const failedSlotIdsSet = new Set(failedSlotIds);
    for (const { availabilitySlotId } of requests) {
      if (!failedSlotIdsSet.has(availabilitySlotId)) {
        delete idempotencyKeysBySlot.current[availabilitySlotId];
      }
    }

    if (successfulResponses.length > 0) setResults(successfulResponses);

    if (failedSlotIds.length > 0) {
      const firstFailure = responses.find(
        (response): response is PromiseRejectedResult => response.status === "rejected",
      );
      const error = firstFailure?.reason;
      if (error instanceof TopaApiError) setFieldErrors(error.fields);
      setSelectedSlotIds(failedSlotIds);
      setSubmitError(
        successfulResponses.length > 0
          ? `Enviamos ${successfulResponses.length} ${successfulResponses.length === 1 ? "solicitud" : "solicitudes"}. Revisá los talleres que quedaron seleccionados e intentá nuevamente.`
          : error instanceof TopaApiError
            ? error.message
            : "No pudimos enviar tu solicitud. Intentá nuevamente.",
      );
    } else {
      setSelectedSlotIds([]);
    }

    setIsSubmitting(false);
  }

  function toggleSlot(slotId: string) {
    setSelectedSlotIds((current) => {
      if (!isWorkshop) {
        for (const selectedSlotId of current) {
          if (selectedSlotId !== slotId) delete idempotencyKeysBySlot.current[selectedSlotId];
        }
        return [slotId];
      }
      if (current.includes(slotId)) {
        delete idempotencyKeysBySlot.current[slotId];
        return current.filter((selectedSlotId) => selectedSlotId !== slotId);
      }
      return [...current, slotId];
    });
    setFieldErrors((current) => ({ ...current, availabilitySlotId: "" }));
  }

  function selectActivity(nextActivity: PublicBookingActivity) {
    if (nextActivity === activity) return;
    setActivity(nextActivity);
    setSelectedSlotIds([]);
    idempotencyKeysBySlot.current = {};
    setResults([]);
    setIsLoading(true);
    setAvailabilityError("");
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
          {fieldErrors.phone || fieldErrors.email ? (
            <p className="field-error">{fieldErrors.phone || fieldErrors.email}</p>
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
