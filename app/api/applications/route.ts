import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always disable caching because applications list should stay fresh
export const dynamic = 'force-dynamic';

/**
 * GET /api/applications
 * Returns a list of applications stored in the `applications` table. Requires
 * the SUPABASE_SERVICE_ROLE_KEY for server-side access. The response is
 * intentionally uncached so that the admin panel shows the latest data.
 */
export async function GET() {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing' },
      { status: 500 }
    );
  }
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(JSON.stringify({ data }), {
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });
}

/**
 * POST /api/applications
 * Accepts multipart/form-data containing the applicant’s name, email,
 * cover letter, resume file and job_slug. The resume will be uploaded
 * into the `resumes` storage bucket. The resulting public URL will be
 * stored alongside the application record. The new record is inserted
 * into the `applications` table with an initial status of "new".
 */
export async function POST(req: Request) {
  const url = process.env.SUPABASE_URL!;
  const anonKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !anonKey) {
    return NextResponse.json(
      { error: 'SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing' },
      { status: 500 }
    );
  }
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
  try {
    const formData = await req.formData();
    const name = formData.get('name') as string | null;
    const email = formData.get('email') as string | null;
    const coverLetter = formData.get('cover_letter') as string | null;
    const jobSlug = formData.get('job_slug') as string | null;
    const file = formData.get('resume') as unknown as File | null;
    if (!name || !email || !coverLetter || !jobSlug || !file) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // Upload the resume to storage. Generate a unique path using Date.now.
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const ext = file.name.split('.').pop() || 'pdf';
    const filePath = `${Date.now()}_${file.name}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('resumes')
      .upload(filePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        upsert: true,
      });
    if (storageError) {
      return NextResponse.json({ error: storageError.message }, { status: 500 });
    }
    // Get public URL of uploaded file
    const {
      data: { publicUrl },
    } = supabase.storage.from('resumes').getPublicUrl(storageData.path);
    // Insert application record
    const { error: insertError } = await supabase.from('applications').insert({
      name,
      email,
      cover_letter: coverLetter,
      resume_url: publicUrl,
      job_slug: jobSlug,
      status: 'new',
    });
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}