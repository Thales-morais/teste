import { NextRequest, NextResponse } from 'next/server';
import { analyzeWebsite } from '@/lib/leads/websiteAnalyzer';
import { analyzeInstagram } from '@/lib/leads/instagramAnalyzer';
import { generateDiagnosis } from '@/lib/leads/diagnosisGenerator';
import { WebsiteAnalysis, InstagramData } from '@/lib/leads/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { website, businessName, instagramHandle, category } = body;

    if (!businessName) {
      return NextResponse.json(
        { error: 'businessName é obrigatório' },
        { status: 400 }
      );
    }

    // Run website and Instagram analysis in parallel
    const [websiteAnalysis, instagramFromSite] = await Promise.all([
      website ? analyzeWebsite(website) : Promise.resolve(undefined as WebsiteAnalysis | undefined),
      Promise.resolve(undefined as InstagramData | undefined),
    ]);

    // Determine Instagram handle: from request param or from website analysis
    const igHandle =
      instagramHandle ||
      websiteAnalysis?.instagramHandle ||
      '';

    // Analyze Instagram if we have a handle
    let instagramData: InstagramData | undefined = instagramFromSite;
    if (igHandle && !instagramData) {
      instagramData = await analyzeInstagram(igHandle);
    }

    // Generate AI diagnosis
    const diagnosis = await generateDiagnosis(
      businessName,
      category || 'Negócio Local',
      websiteAnalysis,
      instagramData
    );

    return NextResponse.json({
      websiteAnalysis,
      instagramData,
      diagnosis,
    });
  } catch (err) {
    const error = err as Error;
    console.error('[leads/analyze] Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao analisar lead' },
      { status: 500 }
    );
  }
}
