import { NextResponse } from "next/server";

const GAS_URL = process.env.GAS_URL;
const GAS_TOKEN = process.env.GAS_TOKEN;

export async function POST(request: Request) {
  if (!GAS_URL) {
    return NextResponse.json({ ok: false, error: "GAS_URL not configured" });
  }

  let body: { action: string; project?: unknown; id?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" });
  }

  const { action, project, id } = body;
  if (!action || !["add", "update", "delete"].includes(action)) {
    return NextResponse.json({ ok: false, error: "Invalid action" });
  }

  try {
    const res = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: GAS_TOKEN ? `Bearer ${GAS_TOKEN}` : "",
      },
      body: JSON.stringify({ action, project, id }),
    });
    const json = (await res.json().catch(() => ({}))) as { ok?: boolean };
    return NextResponse.json(json);
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "GAS error",
    });
  }
}
