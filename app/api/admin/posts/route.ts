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

// GET /api/admin/posts – list posts
export async function GET() {
  const { supabase, error: credError } = getAdminClient() as any;
  if (credError) {
    return NextResponse.json({ error: credError }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { data },
    { headers: { "cache-control": "no-store" } }
  );
}

// POST /api/admin/posts – create post
export async function POST(req: Request) {
  const { supabase, error: credError } = getAdminClient() as any;
  if (credError) {
    return NextResponse.json({ error: credError }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { title, slug, date, excerpt, content } = body;

  if (!title || !content || !date) {
    return NextResponse.json(
      { error: "title, date and content are required" },
      { status: 400 }
    );
  }

  const finalSlug =
    (slug || title.toLowerCase().replace(/\s+/g, "-")).trim();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title,
      slug: finalSlug,
      date,
      excerpt: excerpt ?? "",
      content,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { data },
    { status: 201, headers: { "cache-control": "no-store" } }
  );
}
