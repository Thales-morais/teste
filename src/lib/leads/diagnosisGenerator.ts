import Anthropic from '@anthropic-ai/sdk';
import { Diagnosis, WebsiteAnalysis, InstagramData } from './types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateDiagnosis(
  businessName: string,
  category: string,
  websiteAnalysis: WebsiteAnalysis | undefined,
  instagramData: InstagramData | undefined
): Promise<Diagnosis> {
  const websiteSummary = websiteAnalysis
    ? `
ANÁLISE DO WEBSITE:
- URL com SSL (HTTPS): ${websiteAnalysis.hasSSL ? 'Sim' : 'Não'}
- Responsivo para mobile: ${websiteAnalysis.isMobileResponsive ? 'Sim' : 'Não'}
- Tem meta description (SEO): ${websiteAnalysis.hasMetaDescription ? 'Sim' : 'Não'}
- Tem botão WhatsApp: ${websiteAnalysis.hasWhatsApp ? 'Sim' : 'Não'}
- Link para Instagram: ${websiteAnalysis.hasInstagram ? 'Sim' : 'Não'}
- Link para Facebook: ${websiteAnalysis.hasFacebook ? 'Sim' : 'Não'}
- Google Analytics instalado: ${websiteAnalysis.hasGoogleAnalytics ? 'Sim' : 'Não'}
- Chat ao vivo: ${websiteAnalysis.hasLiveChat ? 'Sim' : 'Não'}
- Loja online: ${websiteAnalysis.hasOnlineStore ? 'Sim' : 'Não'}
- Plataforma WordPress: ${websiteAnalysis.isWordPress ? 'Sim' : 'Não'}
- Pontuação website: ${websiteAnalysis.score}/10
- Problemas detectados: ${websiteAnalysis.issues.join('; ') || 'Nenhum'}
`
    : 'WEBSITE: Sem website cadastrado ou não foi possível analisar.';

  const instagramSummary = instagramData
    ? `
ANÁLISE DO INSTAGRAM (@${instagramData.handle}):
- Seguidores: ${instagramData.followers.toLocaleString('pt-BR')}
- Seguindo: ${instagramData.following.toLocaleString('pt-BR')}
- Posts: ${instagramData.posts}
- Bio: ${instagramData.bio || 'Sem bio'}
- Conta verificada: ${instagramData.isVerified ? 'Sim' : 'Não'}
- Conta comercial: ${instagramData.isBusinessAccount ? 'Sim' : 'Não'}
- Pontuação: ${instagramData.score}/10
- Problemas detectados: ${instagramData.issues.join('; ') || 'Nenhum'}
`
    : 'INSTAGRAM: Sem presença no Instagram detectada.';

  const prompt = `Você é um especialista em marketing digital e presença online para pequenas e médias empresas brasileiras.

Analise a presença digital do seguinte negócio e gere um diagnóstico completo:

NEGÓCIO: ${businessName}
CATEGORIA: ${category}

${websiteSummary}
${instagramSummary}

Com base nesses dados, gere um diagnóstico OBJETIVO e PRÁTICO no seguinte formato JSON:

{
  "overallScore": (número de 0 a 10 representando a saúde digital geral),
  "priority": ("baixa", "media" ou "alta" — urgência para contato),
  "strengths": [lista de 2-4 pontos positivos encontrados],
  "weaknesses": [lista de 3-5 problemas principais identificados, sendo direto e específico],
  "recommendations": [lista de 4-6 ações concretas e priorizadas que o negócio deveria fazer],
  "ourSolution": "parágrafo de 2-3 frases descrevendo como nossa agência/empresa pode resolver os problemas identificados, sendo específico para este negócio",
  "estimatedImpact": "frase curta descrevendo o impacto estimado das melhorias (ex: 'Potencial de aumentar em 40% os contatos via site em 60 dias')",
  "urgencyReason": "frase explicando por que o negócio deveria agir agora (ex: concorrentes, sazonalidade, oportunidade específica)"
}

Seja direto, específico para o negócio analisado, e foque em problemas reais que impactam diretamente as vendas e captação de clientes. Use linguagem clara e brasileira.`;

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 2000,
    thinking: { type: 'adaptive' },
    messages: [{ role: 'user', content: prompt }],
  });

  const message = await stream.finalMessage();

  let jsonText = '';
  for (const block of message.content) {
    if (block.type === 'text') {
      jsonText = block.text;
      break;
    }
  }

  // Extract JSON from response
  const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Claude retornou resposta sem JSON válido');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  return {
    overallScore: Math.min(10, Math.max(0, Number(parsed.overallScore) || 5)),
    priority: ['baixa', 'media', 'alta'].includes(parsed.priority) ? parsed.priority : 'media',
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 4) : [],
    weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.slice(0, 5) : [],
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 6) : [],
    ourSolution: String(parsed.ourSolution || ''),
    estimatedImpact: String(parsed.estimatedImpact || ''),
    urgencyReason: String(parsed.urgencyReason || ''),
  };
}
