// app/api/admin/consultations/route.ts
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
 * GET /api/admin/consultations
 * Return all booked calls from the `consultations` table.
 */
export async function GET() {
  const { supabase, error: credError } = getAdminClient() as any;
  if (credError) {
    return NextResponse.json({ error: credError }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .order("scheduled_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { data },
    {
      status: 200,
      headers: { "cache-control": "no-store" },
    }
  );
}
