import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESUME_BUCKET =
  process.env.SUPABASE_RESUME_BUCKET || "resumes"; // <— bucket name here

function getSupabaseAdmin() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient(SUPABASE_URL, SERVICE_KEY, {
    auth: { persistSession: false },
  });
}

// POST /api/applications  (called from the job application form)
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const cover_letter = formData.get("cover_letter") as string | null;
    const job_slug = formData.get("job_slug") as string | null;
    const resumeFile = formData.get("resume") as File | null;

    if (!name || !email || !job_slug || !resumeFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Upload resume to storage
    const ext = resumeFile.name.split(".").pop() || "pdf";
    const path = `${job_slug}/${randomUUID()}.${ext}`;
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from(RESUME_BUCKET)
      .upload(path, buffer, {
        contentType: resumeFile.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) {
      // Common case: bucket doesn't exist
      if (uploadError.message?.includes("Bucket not found")) {
        return NextResponse.json(
          {
            error:
              `Storage bucket "${RESUME_BUCKET}" not found. ` +
              `Create this bucket in Supabase Storage or change SUPABASE_RESUME_BUCKET.`,
          },
          { status: 500 }
        );
      }
      throw uploadError;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(RESUME_BUCKET).getPublicUrl(path);

    // Insert into applications table
    const { data, error: insertError } = await supabase
      .from("applications")
      .insert({
        name,
        email,
        cover_letter,
        job_slug,
        resume_url: publicUrl,
        status: "new",
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Failed to submit application" },
      { status: 500 }
    );
  }
}
