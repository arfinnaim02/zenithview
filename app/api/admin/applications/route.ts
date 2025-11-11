import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/applications
 * Fetches all application records for the admin dashboard. Requires the
 * SUPABASE_SERVICE_ROLE_KEY so that full access (including updating status)
 * can be performed server-side. Results are ordered by most recent first.
 */
export async function GET() {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Missing SUPABASE credentials' }, { status: 500 });
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