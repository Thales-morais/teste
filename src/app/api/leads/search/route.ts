import { NextRequest, NextResponse } from 'next/server';
import { searchPlaces } from '@/lib/leads/googlePlaces';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, city, maxResults = 10 } = body;

    if (!query || !city) {
      return NextResponse.json(
        { error: 'query e city são obrigatórios' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GOOGLE_PLACES_API_KEY não configurada' },
        { status: 500 }
      );
    }

    const leads = await searchPlaces(query, city, Math.min(maxResults, 20), apiKey);

    return NextResponse.json({ leads, total: leads.length });
  } catch (err) {
    const error = err as Error;
    console.error('[leads/search] Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao buscar leads' },
      { status: 500 }
    );
  }
}
