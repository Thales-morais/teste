'use client';

import { useState, useCallback } from 'react';
import { Lead, Diagnosis, WebsiteAnalysis, InstagramData } from '@/lib/leads/types';

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconSearch() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}
function IconLoader() {
  return (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
function IconCheck() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
}
function IconX() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
}
function IconDownload() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
}
function IconChevron({ open }: { open: boolean }) {
  return <svg className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
}
function IconInstagram() {
  return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
}
function IconGlobe() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
}
function IconStar() {
  return <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}
function IconMap() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
}
function IconPhone() {
  return <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z" /></svg>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BoolBadge({ value, label }: { value: boolean; label: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
      value ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
    }`}>
      {value ? <IconCheck /> : <IconX />}
      {label}
    </span>
  );
}

function ScoreBadge({ score, label }: { score: number; label?: string }) {
  const color =
    score >= 7 ? 'text-green-400 border-green-500/30 bg-green-500/10'
    : score >= 4 ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
    : 'text-red-400 border-red-500/30 bg-red-500/10';
  return (
    <div className={`inline-flex flex-col items-center border rounded-lg px-3 py-1.5 ${color}`}>
      <span className="text-xl font-bold leading-none">{score.toFixed(1)}</span>
      {label && <span className="text-[10px] mt-0.5 opacity-70">{label}</span>}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    alta: 'bg-red-500/20 text-red-400 border-red-500/30',
    media: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    baixa: 'bg-green-500/20 text-green-400 border-green-500/30',
  };
  const labels: Record<string, string> = { alta: 'ALTA', media: 'MÉDIA', baixa: 'BAIXA' };
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded border ${styles[priority] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'}`}>
      {labels[priority] || priority}
    </span>
  );
}

function DiagnosisPanel({ diagnosis }: { diagnosis: Diagnosis }) {
  return (
    <div className="space-y-4 p-4 bg-[#0A0A0A] rounded-xl border border-white/5">
      <div className="flex items-center gap-3 flex-wrap">
        <ScoreBadge score={diagnosis.overallScore} label="SCORE GERAL" />
        <PriorityBadge priority={diagnosis.priority} />
        <span className="text-xs text-white/40 flex-1">Prioridade de contato</span>
      </div>

      {diagnosis.urgencyReason && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 text-sm text-blue-300">
          <span className="font-semibold text-blue-400">Urgência: </span>{diagnosis.urgencyReason}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {diagnosis.strengths.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-green-400 mb-1.5 uppercase tracking-wide">Pontos Fortes</p>
            <ul className="space-y-1">
              {diagnosis.strengths.map((s, i) => (
                <li key={i} className="text-xs text-white/60 flex gap-1.5">
                  <span className="text-green-500 mt-0.5">✓</span>{s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {diagnosis.weaknesses.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-red-400 mb-1.5 uppercase tracking-wide">Problemas</p>
            <ul className="space-y-1">
              {diagnosis.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-white/60 flex gap-1.5">
                  <span className="text-red-500 mt-0.5">✗</span>{w}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {diagnosis.recommendations.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#0066FF] mb-1.5 uppercase tracking-wide">Recomendações</p>
          <ol className="space-y-1">
            {diagnosis.recommendations.map((r, i) => (
              <li key={i} className="text-xs text-white/60 flex gap-2">
                <span className="text-[#0066FF] font-bold shrink-0">{i + 1}.</span>{r}
              </li>
            ))}
          </ol>
        </div>
      )}

      {diagnosis.ourSolution && (
        <div className="bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-lg p-3">
          <p className="text-xs font-semibold text-[#338AFF] mb-1 uppercase tracking-wide">Nossa Solução</p>
          <p className="text-xs text-white/70">{diagnosis.ourSolution}</p>
        </div>
      )}

      {diagnosis.estimatedImpact && (
        <div className="text-xs text-white/40 italic">
          <span className="text-white/60 font-medium">Impacto estimado: </span>{diagnosis.estimatedImpact}
        </div>
      )}
    </div>
  );
}

function WebsitePanel({ analysis }: { analysis: WebsiteAnalysis }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wide">Website</p>
        <ScoreBadge score={analysis.score} />
      </div>
      <div className="flex flex-wrap gap-1.5">
        <BoolBadge value={analysis.hasSSL} label="SSL" />
        <BoolBadge value={analysis.isMobileResponsive} label="Mobile" />
        <BoolBadge value={analysis.hasMetaDescription} label="SEO" />
        <BoolBadge value={analysis.hasWhatsApp} label="WhatsApp" />
        <BoolBadge value={analysis.hasInstagram} label="Instagram" />
        <BoolBadge value={analysis.hasFacebook} label="Facebook" />
        <BoolBadge value={analysis.hasGoogleAnalytics} label="Analytics" />
        <BoolBadge value={analysis.hasOnlineStore} label="E-commerce" />
      </div>
      {analysis.instagramHandle && (
        <p className="text-xs text-white/40">
          Instagram encontrado: <span className="text-[#00D4FF]">@{analysis.instagramHandle}</span>
        </p>
      )}
    </div>
  );
}

function InstagramPanel({ data }: { data: InstagramData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/50 uppercase tracking-wide flex items-center gap-1.5">
          <IconInstagram /> @{data.handle}
        </p>
        <ScoreBadge score={data.score} />
      </div>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-base font-bold text-white">{formatCount(data.followers)}</p>
          <p className="text-[10px] text-white/40">seguidores</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-base font-bold text-white">{formatCount(data.posts)}</p>
          <p className="text-[10px] text-white/40">posts</p>
        </div>
        <div className="bg-white/5 rounded-lg p-2">
          <p className="text-base font-bold text-white">{formatCount(data.following)}</p>
          <p className="text-[10px] text-white/40">seguindo</p>
        </div>
      </div>
      {data.bio && <p className="text-xs text-white/50 italic">"{data.bio}"</p>}
      <div className="flex gap-1.5 flex-wrap">
        {data.isVerified && <BoolBadge value={true} label="Verificado" />}
        <BoolBadge value={data.isBusinessAccount} label="Conta Comercial" />
      </div>
    </div>
  );
}

function LeadCard({ lead, onAnalyze }: { lead: Lead; onAnalyze: (lead: Lead) => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#141414] border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/10 transition-colors">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm truncate">{lead.name}</h3>
            <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{lead.category}</span>
            {lead.diagnosis && <PriorityBadge priority={lead.diagnosis.priority} />}
          </div>
          <div className="mt-1 space-y-0.5">
            {lead.address && (
              <p className="text-xs text-white/40 flex items-center gap-1.5 truncate">
                <IconMap />{lead.address}
              </p>
            )}
            {lead.phone && (
              <p className="text-xs text-white/40 flex items-center gap-1.5">
                <IconPhone />{lead.phone}
              </p>
            )}
            {lead.website && (
              <p className="text-xs text-[#338AFF]/70 flex items-center gap-1.5 truncate">
                <IconGlobe />
                <a href={lead.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#338AFF] truncate" onClick={(e) => e.stopPropagation()}>
                  {lead.website.replace(/^https?:\/\//, '')}
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {lead.rating > 0 && (
            <span className="flex items-center gap-1 text-yellow-400 text-xs">
              <IconStar />{lead.rating.toFixed(1)}
              <span className="text-white/30">({lead.totalRatings})</span>
            </span>
          )}
          {lead.diagnosis && <ScoreBadge score={lead.diagnosis.overallScore} />}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-3 flex items-center gap-2">
        {lead.status === 'pending' && (
          <button
            onClick={() => onAnalyze(lead)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-[#0066FF] hover:bg-[#338AFF] text-white rounded-lg transition-colors font-medium"
          >
            <IconSearch /> Analisar Lead
          </button>
        )}
        {lead.status === 'analyzing' && (
          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white/5 text-white/50 rounded-lg">
            <IconLoader /> Analisando...
          </span>
        )}
        {lead.status === 'done' && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-lg transition-colors"
          >
            Ver diagnóstico <IconChevron open={expanded} />
          </button>
        )}
        {lead.status === 'error' && (
          <span className="text-xs text-red-400 flex items-center gap-1.5">
            <IconX /> {lead.errorMessage || 'Erro ao analisar'}
            <button onClick={() => onAnalyze(lead)} className="ml-2 underline text-white/50 hover:text-white">Tentar novamente</button>
          </span>
        )}
      </div>

      {/* Expanded analysis */}
      {expanded && lead.status === 'done' && (
        <div className="border-t border-white/5 p-4 space-y-4">
          {lead.websiteAnalysis && !lead.websiteAnalysis.issues.includes('Sem website cadastrado') && (
            <WebsitePanel analysis={lead.websiteAnalysis} />
          )}
          {lead.instagramData && !lead.instagramData.issues.includes('Sem perfil no Instagram') && (
            <InstagramPanel data={lead.instagramData} />
          )}
          {lead.diagnosis && <DiagnosisPanel diagnosis={lead.diagnosis} />}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LeadsPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [maxResults, setMaxResults] = useState(10);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');
  const [searchDone, setSearchDone] = useState(false);
  const [analyzeAll, setAnalyzeAll] = useState(false);

  const handleSearch = async () => {
    if (!query.trim() || !city.trim()) {
      setError('Preencha o nicho e a cidade');
      return;
    }
    setIsSearching(true);
    setError('');
    setLeads([]);
    setSearchDone(false);

    try {
      const res = await fetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim(), city: city.trim(), maxResults }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na busca');
      setLeads(data.leads);
      setSearchDone(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSearching(false);
    }
  };

  const analyzeLead = useCallback(async (lead: Lead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: 'analyzing' } : l))
    );

    try {
      const res = await fetch('/api/leads/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website: lead.website,
          businessName: lead.name,
          category: lead.category,
          instagramHandle: '',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro na análise');

      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id
            ? {
                ...l,
                status: 'done',
                websiteAnalysis: data.websiteAnalysis,
                instagramData: data.instagramData,
                diagnosis: data.diagnosis,
              }
            : l
        )
      );
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === lead.id
            ? { ...l, status: 'error', errorMessage: (err as Error).message }
            : l
        )
      );
    }
  }, []);

  const handleAnalyzeAll = async () => {
    const pending = leads.filter((l) => l.status === 'pending');
    setAnalyzeAll(true);
    for (const lead of pending) {
      await analyzeLead(lead);
    }
    setAnalyzeAll(false);
  };

  const handleExport = async () => {
    if (leads.length === 0) return;
    setIsExporting(true);
    try {
      const res = await fetch('/api/leads/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leads }),
      });
      if (!res.ok) throw new Error('Erro ao exportar');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads_${city}_${query}_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsExporting(false);
    }
  };

  const analyzedCount = leads.filter((l) => l.status === 'done').length;
  const pendingCount = leads.filter((l) => l.status === 'pending').length;
  const highPriority = leads.filter((l) => l.diagnosis?.priority === 'alta').length;

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center shrink-0">
              <IconSearch />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Prospecção Ativa de Leads</h1>
              <p className="text-xs text-white/40">Busca no Google, analisa website e Instagram, gera diagnóstico com IA</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

        {/* Search Form */}
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">Buscar Leads</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className="block text-xs text-white/40 mb-1.5">Nicho / Segmento</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="ex: restaurante, salão de beleza, academia"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Cidade / Região</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="ex: São Paulo - SP"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Máx. Resultados</label>
              <select
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors"
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>{n} leads</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#338AFF] hover:to-[#0066FF] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-all"
            >
              {isSearching ? <IconLoader /> : <IconSearch />}
              {isSearching ? 'Buscando...' : 'Buscar Leads'}
            </button>

            {leads.length > 0 && (
              <>
                {pendingCount > 0 && !analyzeAll && (
                  <button
                    onClick={handleAnalyzeAll}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/10"
                  >
                    Analisar Todos ({pendingCount})
                  </button>
                )}
                {analyzeAll && (
                  <span className="flex items-center gap-2 text-sm text-white/50">
                    <IconLoader /> Analisando leads...
                  </span>
                )}
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 text-sm font-medium rounded-lg transition-colors border border-green-500/20 disabled:opacity-50 ml-auto"
                >
                  {isExporting ? <IconLoader /> : <IconDownload />}
                  Exportar Excel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        {searchDone && leads.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Leads Encontrados', value: leads.length, color: 'text-white' },
              { label: 'Analisados', value: `${analyzedCount}/${leads.length}`, color: 'text-[#00D4FF]' },
              { label: 'Alta Prioridade', value: highPriority, color: 'text-red-400' },
              {
                label: 'Média Geral',
                value: analyzedCount > 0
                  ? (leads.filter(l => l.diagnosis).reduce((a, l) => a + (l.diagnosis?.overallScore || 0), 0) / analyzedCount).toFixed(1) + '/10'
                  : 'N/A',
                color: 'text-yellow-400',
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#141414] border border-white/[0.06] rounded-xl p-4">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-white/40 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Results */}
        {searchDone && leads.length === 0 && (
          <div className="text-center py-16 text-white/30">
            <p className="text-lg">Nenhum lead encontrado</p>
            <p className="text-sm mt-1">Tente um nicho ou cidade diferente</p>
          </div>
        )}

        {leads.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-white/30 uppercase tracking-wider font-semibold">
              {leads.length} leads encontrados
            </p>
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onAnalyze={analyzeLead} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!searchDone && leads.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#141414] border border-white/5 flex items-center justify-center">
              <IconSearch />
            </div>
            <p className="text-white/30 text-sm">Digite um nicho e cidade para começar a prospectar</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {['Restaurante', 'Salão de Beleza', 'Academia', 'Clínica', 'Pet Shop', 'Imobiliária'].map((sugg) => (
                <button
                  key={sugg}
                  onClick={() => setQuery(sugg)}
                  className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/50 rounded-full transition-colors border border-white/5"
                >
                  {sugg}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}
