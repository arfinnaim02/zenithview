import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // Next: never cache this route

export async function GET() {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing" },
      { status: 500 }
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // also send no-store headers for good measure
  return new NextResponse(JSON.stringify({ data }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
