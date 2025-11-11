import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // In a real implementation, create lead and return Calendly link
  // Logging removed for production – handle analytics or debugging separately
  return NextResponse.json({ calendlyUrl: 'https://calendly.com/zenithview/demo' });
}