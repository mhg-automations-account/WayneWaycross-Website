const REQUIRED = ["name", "email", "phone", "buyerType"] as const;
const FIELDS = [...REQUIRED, "budget", "location"] as const;

/**
 * Receives quote requests from the closing-section form.
 * Set LEAD_WEBHOOK_URL (e.g. a CRM or Zapier hook) to forward each lead as JSON.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") return Response.json({ error: "Invalid request" }, { status: 400 });

  const lead: Record<string, string> = {};
  for (const k of FIELDS) lead[k] = String(body[k] ?? "").trim().slice(0, 300);
  if (REQUIRED.some((k) => !lead[k]) || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.log("Quote request (LEAD_WEBHOOK_URL not set):", lead);
    return Response.json({ ok: true });
  }

  const res = await fetch(hook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source: "familyhomesofcrestview.com", submittedAt: new Date().toISOString() }),
  }).catch(() => null);
  if (!res?.ok) return Response.json({ error: "Could not deliver lead" }, { status: 502 });
  return Response.json({ ok: true });
}
