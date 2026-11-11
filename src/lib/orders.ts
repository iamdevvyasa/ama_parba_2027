import crypto from "node:crypto";

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

const supabaseUrl = () => process.env.SUPABASE_URL;
const supabaseServiceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8;

export async function supabaseRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = supabaseUrl();
  const key = supabaseServiceKey();
  if (!url || !key) throw new Error("Supabase is not configured.");

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const details = await response.text();
    console.error("Supabase request failed.", response.status, details);
    throw new Error("Database request failed.");
  }
  const responseText = await response.text();
  return responseText ? (JSON.parse(responseText) as T) : (undefined as T);
}

export function createAdminSessionToken(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Admin session secret is not configured.");
  const payload = `ama-admin:${Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000}`;
  const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function isAdminSessionValid(token: string | undefined): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return false;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;
  const payload = Buffer.from(encodedPayload, "base64url").toString("utf8");
  if (!payload.startsWith("ama-admin:")) return false;
  const expiresAt = Number(payload.slice("ama-admin:".length));
  if (!Number.isSafeInteger(expiresAt) || Date.now() >= expiresAt) return false;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return (
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  );
}

export function normaliseCustomerDetails(value: unknown): CustomerDetails | null {
  if (!value || typeof value !== "object") return null;
  const candidate = value as Record<string, unknown>;
  const details: CustomerDetails = {
    name: typeof candidate.name === "string" ? candidate.name.trim() : "",
    email: typeof candidate.email === "string" ? candidate.email.trim() : "",
    phone: typeof candidate.phone === "string" ? candidate.phone.trim() : "",
    addressLine1: typeof candidate.addressLine1 === "string" ? candidate.addressLine1.trim() : "",
    addressLine2: typeof candidate.addressLine2 === "string" ? candidate.addressLine2.trim() : "",
    city: typeof candidate.city === "string" ? candidate.city.trim() : "",
    state: typeof candidate.state === "string" ? candidate.state.trim() : "",
    postalCode: typeof candidate.postalCode === "string" ? candidate.postalCode.trim() : "",
  };

  if (
    details.name.length < 2 ||
    details.name.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) ||
    !/^[6-9]\d{9}$/.test(details.phone.replace(/\D/g, "")) ||
    details.addressLine1.length < 5 ||
    details.addressLine1.length > 200 ||
    details.addressLine2.length > 200 ||
    details.city.length < 2 ||
    details.city.length > 80 ||
    details.state.length < 2 ||
    details.state.length > 80 ||
    !/^\d{6}$/.test(details.postalCode)
  ) {
    return null;
  }
  details.phone = details.phone.replace(/\D/g, "");
  return details;
}
