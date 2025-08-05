// src/app/api/role-based/route.ts

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { roleBasedPrompting } from '@/ai/flows/role-based-prompting';


export async function POST(req: Request) {
  try {
    const { prompt, temperature, role } = await req.json();

    const result = await roleBasedPrompting(prompt, temperature, role);

    return new Response(
      JSON.stringify({ rephrasedResponse: result }), // Make sure this key matches frontend expectations
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

