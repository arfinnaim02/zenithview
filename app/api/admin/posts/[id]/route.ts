import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

// DELETE /api/admin/posts/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { supabase, error: credError } = getAdminClient() as any;
  if (credError) {
    return NextResponse.json({ error: credError }, { status: 500 });
  }

  const { error } = await supabase.from("posts").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { success: true },
    { status: 200, headers: { "cache-control": "no-store" } }
  );
}
