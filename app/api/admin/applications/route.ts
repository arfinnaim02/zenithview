import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return { error: "Missing SUPABASE credentials" } as const;
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  return { supabase } as const;
}

/**
 * GET /api/admin/applications
 * Fetch all applications for the admin panel.
 */
export async function GET() {
  const result = getAdminClient();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  const { supabase } = result;

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(JSON.stringify({ data }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
  });
}

/**
 * DELETE /api/admin/applications
 * Bulk delete applications. Body: { ids: string[] }
 */
export async function DELETE(req: Request) {
  const result = getAdminClient();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  const { supabase } = result;

  const body = await req.json().catch(() => null);
  const ids = (body?.ids ?? []) as string[];

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "No ids supplied" }, { status: 400 });
  }

  const { error } = await supabase
    .from("applications")
    .delete()
    .in("id", ids);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "cache-control": "no-store" },
  });
}
