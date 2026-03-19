import { NextRequest, NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { Lead, ExportLead } from '@/lib/leads/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leads } = body as { leads: Lead[] };

    if (!leads || !Array.isArray(leads)) {
      return NextResponse.json({ error: 'leads array é obrigatório' }, { status: 400 });
    }

    const rows: ExportLead[] = leads.map((lead) => {
      const w = lead.websiteAnalysis;
      const ig = lead.instagramData;
      const d = lead.diagnosis;

      return {
        'Nome do Negócio': lead.name,
        'Endereço': lead.address,
        'Telefone': lead.phone || '',
        'Website': lead.website || '',
        'Avaliação Google': lead.rating ? `${lead.rating}/5` : 'N/A',
        'Nº Avaliações': lead.totalRatings || 0,
        'Categoria': lead.category || '',

        // Website
        'SSL (HTTPS)': w ? (w.hasSSL ? 'Sim' : 'Não') : 'N/A',
        'Responsivo Mobile': w ? (w.isMobileResponsive ? 'Sim' : 'Não') : 'N/A',
        'Meta Description': w ? (w.hasMetaDescription ? 'Sim' : 'Não') : 'N/A',
        'Tem WhatsApp': w ? (w.hasWhatsApp ? 'Sim' : 'Não') : 'N/A',
        'Tem Facebook': w ? (w.hasFacebook ? 'Sim' : 'Não') : 'N/A',
        'Tem Instagram': w ? (w.hasInstagram ? 'Sim' : 'Não') : 'N/A',
        'Handle Instagram': ig?.handle || w?.instagramHandle || '',
        'Google Analytics': w ? (w.hasGoogleAnalytics ? 'Sim' : 'Não') : 'N/A',
        'Loja Online': w ? (w.hasOnlineStore ? 'Sim' : 'Não') : 'N/A',

        // Instagram
        'Seguidores Instagram': ig?.followers ? ig.followers.toLocaleString('pt-BR') : 'N/A',
        'Posts Instagram': ig?.posts ? String(ig.posts) : 'N/A',

        // Scores
        'Pontuação Website': w ? `${w.score}/10` : 'N/A',
        'Pontuação Instagram': ig ? `${ig.score}/10` : 'N/A',
        'Pontuação Geral': d ? `${d.overallScore}/10` : 'N/A',
        'Prioridade': d ? formatPriority(d.priority) : 'N/A',

        // Diagnosis
        'Pontos Fortes': d?.strengths?.join(' | ') || '',
        'Problemas Identificados': d?.weaknesses?.join(' | ') || '',
        'Recomendações': d?.recommendations?.join(' | ') || '',
        'Nossa Solução': d?.ourSolution || '',
        'Impacto Estimado': d?.estimatedImpact || '',
        'Urgência': d?.urgencyReason || '',
      };
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);

    // Column widths
    ws['!cols'] = [
      { wch: 30 }, // Nome
      { wch: 40 }, // Endereço
      { wch: 18 }, // Telefone
      { wch: 35 }, // Website
      { wch: 14 }, // Avaliação
      { wch: 12 }, // Nº Avaliações
      { wch: 18 }, // Categoria
      { wch: 12 }, // SSL
      { wch: 16 }, // Mobile
      { wch: 16 }, // Meta Desc
      { wch: 14 }, // WhatsApp
      { wch: 14 }, // Facebook
      { wch: 14 }, // Instagram
      { wch: 20 }, // Handle IG
      { wch: 14 }, // Analytics
      { wch: 14 }, // Loja Online
      { wch: 18 }, // Seguidores
      { wch: 14 }, // Posts
      { wch: 16 }, // Pont. Website
      { wch: 18 }, // Pont. Instagram
      { wch: 14 }, // Pont. Geral
      { wch: 12 }, // Prioridade
      { wch: 50 }, // Pontos Fortes
      { wch: 60 }, // Problemas
      { wch: 70 }, // Recomendações
      { wch: 70 }, // Solução
      { wch: 50 }, // Impacto
      { wch: 50 }, // Urgência
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Leads');

    // Summary sheet
    const analyzedLeads = leads.filter((l) => l.status === 'done' && l.diagnosis);
    const summaryData = [
      { 'Métrica': 'Total de Leads', 'Valor': leads.length },
      { 'Métrica': 'Leads Analisados', 'Valor': analyzedLeads.length },
      { 'Métrica': 'Prioridade Alta', 'Valor': analyzedLeads.filter((l) => l.diagnosis?.priority === 'alta').length },
      { 'Métrica': 'Prioridade Média', 'Valor': analyzedLeads.filter((l) => l.diagnosis?.priority === 'media').length },
      { 'Métrica': 'Prioridade Baixa', 'Valor': analyzedLeads.filter((l) => l.diagnosis?.priority === 'baixa').length },
      { 'Métrica': 'Sem Website', 'Valor': leads.filter((l) => !l.website).length },
      { 'Métrica': 'Sem Instagram', 'Valor': analyzedLeads.filter((l) => !l.websiteAnalysis?.hasInstagram && !l.instagramData).length },
      { 'Métrica': 'Pontuação Média Geral', 'Valor': analyzedLeads.length > 0 ? (analyzedLeads.reduce((a, l) => a + (l.diagnosis?.overallScore || 0), 0) / analyzedLeads.length).toFixed(1) : 'N/A' },
      { 'Métrica': 'Data de Exportação', 'Valor': new Date().toLocaleString('pt-BR') },
    ];

    const wsSummary = XLSX.utils.json_to_sheet(summaryData);
    wsSummary['!cols'] = [{ wch: 25 }, { wch: 20 }];
    XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumo');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    const filename = `leads_${new Date().toISOString().split('T')[0]}.xlsx`;

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': String(buffer.length),
      },
    });
  } catch (err) {
    const error = err as Error;
    console.error('[leads/export] Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Erro ao gerar planilha' },
      { status: 500 }
    );
  }
}

function formatPriority(priority: string): string {
  const map: Record<string, string> = {
    alta: 'ALTA',
    media: 'MÉDIA',
    baixa: 'BAIXA',
  };
  return map[priority] || priority;
}
