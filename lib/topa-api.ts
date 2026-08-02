const configuredApiUrl =
  process.env.NEXT_PUBLIC_TOPA_API_URL ??
  "https://topa.suturesistemas.com/api/public/topa";

export const TOPA_API_URL = configuredApiUrl.replace(/\/$/, "");

export type ActivityType = "CAFETERIA" | "WORKSHOP" | "EVENT";

export interface AvailabilitySlot {
  id: number;
  activityType: ActivityType;
  startsAt: string;
  endsAt: string;
  status: "PUBLISHED" | "FULL";
  availableAdults: number | null;
  availableChildren: number | null;
  availableCapacityUnits: number | null;
  publicNotes: string | null;
}

export interface PublicBookingRequest {
  customerName: string;
  phone?: string;
  email?: string;
  communicationConsent: boolean;
  availabilitySlotId: number;
  adults: number;
  children: number;
  infants: number;
  dietaryRestrictions?: string;
  notes?: string;
}

export interface BookingRequestResult {
  id: number;
  status: "PENDING" | string;
  activityType: ActivityType;
  startsAt: string;
  endsAt: string;
  message: string;
}

interface ApiErrorBody {
  error?: string;
  message?: string;
  fields?: Record<string, string>;
}

export class TopaApiError extends Error {
  fields: Record<string, string>;

  constructor(message: string, fields: Record<string, string> = {}) {
    super(message);
    this.name = "TopaApiError";
    this.fields = fields;
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function toApiError(body: unknown, fallback: string) {
  const error = (body ?? {}) as ApiErrorBody;
  return new TopaApiError(error.error ?? error.message ?? fallback, error.fields ?? {});
}

export async function getAvailability(
  activityType: ActivityType,
  from: Date,
  to: Date,
  signal?: AbortSignal,
): Promise<AvailabilitySlot[]> {
  const params = new URLSearchParams({
    activityType,
    from: from.toISOString(),
    to: to.toISOString(),
  });
  const response = await fetch(`${TOPA_API_URL}/availability?${params}`, {
    credentials: "omit",
    signal,
  });
  const body = await readJson(response);

  if (!response.ok) {
    throw toApiError(body, "No pudimos consultar la disponibilidad.");
  }

  return Array.isArray(body) ? (body as AvailabilitySlot[]) : [];
}

export async function createBookingRequest(
  input: PublicBookingRequest,
): Promise<BookingRequestResult> {
  const response = await fetch(`${TOPA_API_URL}/requests`, {
    method: "POST",
    credentials: "omit",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const body = await readJson(response);

  if (!response.ok) {
    throw toApiError(body, "No pudimos enviar tu solicitud. Intentá nuevamente.");
  }

  return body as BookingRequestResult;
}
