import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // no cache
  return new NextResponse(null, { status: 204, headers: { "cache-control": "no-store" } });
}
