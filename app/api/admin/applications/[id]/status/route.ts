import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * PATCH /api/admin/applications/[id]/status
 * Updates the status of a given application record. Requires the
 * SUPABASE_SERVICE_ROLE_KEY. The request body must include a `status`
 * property with the new status value (e.g. 'contacted', 'interview', 'hired', 'rejected').
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const url = process.env.SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: 'Missing SUPABASE credentials' }, { status: 500 });
  }
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { status } = await req.json();
  const { error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', params.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return new NextResponse(null, { status: 204, headers: { 'cache-control': 'no-store' } });
}