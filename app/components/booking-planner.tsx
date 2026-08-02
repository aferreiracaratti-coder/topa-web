"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

import {
  type ActivityType,
  type AvailabilitySlot,
  type BookingRequestResult,
  createBookingRequest,
  getAvailability,
  TopaApiError,
} from "../../lib/topa-api";

const activities: { value: ActivityType; label: string }[] = [
  { value: "CAFETERIA", label: "Cafetería y juego" },
  { value: "WORKSHOP", label: "Taller TOPA" },
  { value: "EVENT", label: "Evento" },
];

const initialForm = {
  customerName: "",
  phone: "",
  email: "",
  adults: "0",
  children: "0",
  infants: "0",
  dietaryRestrictions: "",
  notes: "",
  communicationConsent: false,
};

type BookingForm = typeof initialForm;

function formatSlot(slot: AvailabilitySlot) {
  const start = new Date(slot.startsAt);
  const end = new Date(slot.endsAt);
  const date = new Intl.DateTimeFormat("es-UY", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(start);
  const time = new Intl.DateTimeFormat("es-UY", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${date} · ${time.format(start)} a ${time.format(end)}`;
}

function capacityLabel(slot: AvailabilitySlot) {
  if (slot.status === "FULL") return "Sin cupo";
  if (slot.availableCapacityUnits !== null) {
    return `${slot.availableCapacityUnits} lugares disponibles`;
  }
  return "Cupo disponible";
}

function validate(form: BookingForm, availabilitySlotId: string) {
  const errors: Record<string, string> = {};
  const quantities = ["adults", "children", "infants"] as const;

  if (!form.customerName.trim()) errors.customerName = "Ingresá tu nombre.";
  if (!form.phone.trim() && !form.email.trim()) {
    errors.contact = "Ingresá un celular o un email.";
  }
  if (!availabilitySlotId) errors.availabilitySlotId = "Elegí un turno disponible.";

  for (const field of quantities) {
    const value = Number(form[field]);
    if (!Number.isInteger(value) || value < 0 || value > 52) {
      errors[field] = "Ingresá un número entero entre 0 y 52.";
    }
  }

  return errors;
}

export function BookingPlanner() {
  const [activity, setActivity] = useState<ActivityType>("CAFETERIA");
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState("");
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BookingRequestResult | null>(null);

  const loadSlots = useCallback(async (signal?: AbortSignal) => {
    const from = new Date();
    const to = new Date(from);
    to.setDate(to.getDate() + 30);

    setIsLoading(true);
    setAvailabilityError("");
    try {
      const availability = await getAvailability(activity, from, to, signal);
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
      if (!signal?.aborted) setIsLoading(false);
    }
  }, [activity]);

  useEffect(() => {
    const controller = new AbortController();
    setSelectedSlotId("");
    setResult(null);
    void loadSlots(controller.signal);
    return () => controller.abort();
  }, [loadSlots]);

  function updateForm(field: keyof BookingForm, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: "", contact: "" }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validate(form, selectedSlotId);
    setFieldErrors(errors);
    setSubmitError("");
    setResult(null);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await createBookingRequest({
        customerName: form.customerName.trim(),
        phone: form.phone.trim() || undefined,
        email: form.email.trim() || undefined,
        communicationConsent: form.communicationConsent,
        availabilitySlotId: Number(selectedSlotId),
        adults: Number(form.adults),
        children: Number(form.children),
        infants: Number(form.infants),
        dietaryRestrictions: form.dietaryRestrictions.trim() || undefined,
        notes: form.notes.trim() || undefined,
      });
      setResult(response);
    } catch (error) {
      if (error instanceof TopaApiError) {
        setFieldErrors(error.fields);
        setSubmitError(error.message);
      } else {
        setSubmitError("No pudimos enviar tu solicitud. Intentá nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="public-booking">
      <div className="booking-activity-tabs" aria-label="Tipo de experiencia">
        {activities.map((item) => (
          <button
            className={item.value === activity ? "booking-tab is-active" : "booking-tab"}
            key={item.value}
            type="button"
            onClick={() => setActivity(item.value)}
            aria-pressed={item.value === activity}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="booking-layout">
        <section className="availability-panel" aria-labelledby="turnos-title">
          <div className="booking-panel-heading">
            <p className="eyebrow">Próximos 30 días</p>
            <h3 id="turnos-title">Elegí un turno</h3>
          </div>
          {isLoading ? <p className="booking-status">Buscando turnos disponibles…</p> : null}
          {availabilityError ? (
            <div className="form-banner is-error" role="alert">
              <p>{availabilityError}</p>
              <button type="button" onClick={() => void loadSlots()}>
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
              const selected = selectedSlotId === String(slot.id);
              return (
                <button
                  className={selected ? "slot-button is-selected" : "slot-button"}
                  key={slot.id}
                  type="button"
                  disabled={isFull}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSlotId(String(slot.id));
                    setFieldErrors((current) => ({ ...current, availabilitySlotId: "" }));
                  }}
                >
                  <span>{formatSlot(slot)}</span>
                  <small>{capacityLabel(slot)}</small>
                  {slot.publicNotes ? <em>{slot.publicNotes}</em> : null}
                </button>
              );
            })}
          </div>
          {fieldErrors.availabilitySlotId ? (
            <p className="field-error">{fieldErrors.availabilitySlotId}</p>
          ) : null}
        </section>

        <form className="booking-form" onSubmit={submit} noValidate>
          <div className="booking-panel-heading">
            <p className="eyebrow">Tus datos</p>
            <h3>Contanos quiénes vienen</h3>
            <p>La solicitud queda pendiente hasta que TOPA confirme la disponibilidad.</p>
          </div>

          <label className="field">
            <span>Nombre y apellido</span>
            <input
              value={form.customerName}
              onChange={(event) => updateForm("customerName", event.target.value)}
              aria-invalid={Boolean(fieldErrors.customerName)}
              autoComplete="name"
            />
            {fieldErrors.customerName ? <small className="field-error">{fieldErrors.customerName}</small> : null}
          </label>

          <div className="field-row">
            <label className="field">
              <span>Celular</span>
              <input
                value={form.phone}
                onChange={(event) => updateForm("phone", event.target.value)}
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={Boolean(fieldErrors.contact || fieldErrors.phone)}
              />
            </label>
            <label className="field">
              <span>Email</span>
              <input
                value={form.email}
                onChange={(event) => updateForm("email", event.target.value)}
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(fieldErrors.contact || fieldErrors.email)}
              />
            </label>
          </div>
          {fieldErrors.contact || fieldErrors.phone || fieldErrors.email ? (
            <p className="field-error">{fieldErrors.contact || fieldErrors.phone || fieldErrors.email}</p>
          ) : null}

          <div className="guest-counts" aria-label="Cantidad de asistentes">
            {([
              ["adults", "Adultos"],
              ["children", "Niños"],
              ["infants", "Bebés"],
            ] as const).map(([field, label]) => (
              <label className="field" key={field}>
                <span>{label}</span>
                <input
                  type="number"
                  min="0"
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
          {result ? (
            <div className="booking-success" role="status">
              <strong>Solicitud recibida</strong>
              <p>{result.message || "Recibimos tu solicitud."}</p>
              <small>Es una solicitud pendiente: TOPA te confirmará la disponibilidad.</small>
            </div>
          ) : null}

          <button className="button button-primary booking-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enviando solicitud…" : "Enviar solicitud"}
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
