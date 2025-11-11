import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
// optional email
// import { Resend } from "resend";

const Body = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
  message: z.string().min(5),
  service: z.string().min(1),
  budget: z.string().min(1),
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role
);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = Body.parse(json);

    const { error } = await supabase.from("leads").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
      company: data.company ?? null,
      message: data.message,
      source: data.service, // stored as 'source'
      budget: data.budget,
      status: 'new',
      // created_at default now()
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("POST /api/contact error:", err?.message || err);
    return NextResponse.json({ ok: false, error: String(err?.message ?? err) }, { status: 400 });
  }
}
