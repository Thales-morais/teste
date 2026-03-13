"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

const colors = [
  { name: "Purple", role: "Cor Primária", hex: "#7C3AED", rgb: "124, 58, 237", usage: "Botões primários, destaques, ícones principais" },
  { name: "Blue", role: "Cor Secundária", hex: "#2563EB", rgb: "37, 99, 235", usage: "Links, gradientes, elementos de suporte" },
  { name: "Orange", role: "Cor de Destaque", hex: "#F97316", rgb: "249, 115, 22", usage: "CTAs, alertas positivos, energia criativa" },
  { name: "Purple Light", role: "Variação Clara", hex: "#9D5FF0", rgb: "157, 95, 240", usage: "Hover states, variações mais suaves" },
  { name: "Blue Light", role: "Variação Clara", hex: "#3B82F6", rgb: "59, 130, 246", usage: "Ícones, badges informativos" },
  { name: "Orange Light", role: "Variação Clara", hex: "#FB923C", rgb: "251, 146, 60", usage: "Tags, labels, destaque suave" },
];

const neutrals = [
  { name: "Background", hex: "#06060F", usage: "Fundo principal" },
  { name: "Surface", hex: "#0D0D1A", usage: "Cards e superfícies" },
  { name: "Elevated", hex: "#1A1A2E", usage: "Modais, dropdowns" },
  { name: "White 100%", hex: "#FFFFFF", usage: "Texto primário" },
  { name: "White 65%", hex: "rgba(255,255,255,0.65)", usage: "Texto secundário" },
  { name: "White 35%", hex: "rgba(255,255,255,0.35)", usage: "Texto terciário / placeholders" },
];

const semantics = [
  { name: "Sucesso", hex: "#22C55E", usage: "Confirmações, estados positivos" },
  { name: "Atenção", hex: "#F59E0B", usage: "Avisos, alertas neutros" },
  { name: "Erro", hex: "#EF4444", usage: "Erros, ações destrutivas" },
  { name: "Info", hex: "#3B82F6", usage: "Informações, notificações" },
];

const typeScale = [
  { name: "Display XL", size: "72px / 4.5rem", weight: "900", sample: "Criatis", cls: "text-6xl font-black" },
  { name: "Display L", size: "60px / 3.75rem", weight: "800", sample: "Design System", cls: "text-5xl font-extrabold" },
  { name: "Heading XL", size: "48px / 3rem", weight: "700", sample: "Identidade Visual", cls: "text-4xl font-bold" },
  { name: "Heading L", size: "36px / 2.25rem", weight: "700", sample: "Manual de Marca", cls: "text-3xl font-bold" },
  { name: "Heading M", size: "28px / 1.75rem", weight: "600", sample: "Guia do Designer", cls: "text-2xl font-semibold" },
  { name: "Body L", size: "18px / 1.125rem", weight: "400", sample: "Este é o texto para parágrafos longos e descritivos.", cls: "text-lg" },
  { name: "Body M", size: "16px / 1rem", weight: "400", sample: "Texto padrão para interfaces e documentação.", cls: "text-base" },
  { name: "Body S", size: "14px / 0.875rem", weight: "400", sample: "Labels, captions e textos de suporte.", cls: "text-sm" },
  { name: "Caption", size: "12px / 0.75rem", weight: "500", sample: "TEXTO DE APOIO / OVERLINE", cls: "text-xs font-medium uppercase tracking-widest" },
];

const logoRules = [
  { ok: true, text: "Usar o logo em fundo escuro com gradiente completo" },
  { ok: true, text: "Usar versão monocromática branca em fundos coloridos" },
  { ok: true, text: "Manter área de respiro de ao menos 1× a altura do logo" },
  { ok: false, text: "Distorcer ou alterar proporções do logo" },
  { ok: false, text: "Usar em fundos que comprometam a leitura" },
  { ok: false, text: "Alterar cores fora da paleta oficial" },
  { ok: false, text: "Adicionar efeitos não previstos (sombra excessiva, brilho)" },
];

const voicePillars = [
  { title: "Criativo", desc: "Expressamos ideias de forma original, fora do convencional." },
  { title: "Direto", desc: "Comunicamos com clareza, sem rodeios desnecessários." },
  { title: "Confiante", desc: "Falamos com autoridade, baseados em resultado." },
  { title: "Humano", desc: "Próximos, acessíveis, sem jargão excessivo." },
];

export default function BrandPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <main className="min-h-screen" style={{ background: "#06060F" }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-36 pb-16 px-6 border-b border-white/[0.06]">
        <div className="container-nova">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Manual de Marca</p>
            <h1 className="text-5xl font-black text-white mb-4">Identidade da Criatis</h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Tudo que define visualmente a Criatis: logo, cores, tipografia, espaçamento e tom de voz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LOGO */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">01 — Logo</p>
            <h2 className="text-3xl font-bold text-white">O símbolo da marca</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {/* Logo dark */}
            <div className="rounded-2xl border border-white/[0.06] bg-[#06060F] p-10 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <span className="text-white font-black text-2xl">C</span>
                </div>
                <span className="text-3xl font-black text-white tracking-tight">Criatis</span>
              </div>
              <p className="text-xs text-white/30">Versão Principal — Fundo Escuro</p>
            </div>

            {/* Logo light */}
            <div className="rounded-2xl border border-white/[0.06] bg-white p-10 flex flex-col items-center justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-xl shadow-purple-500/30">
                  <span className="text-white font-black text-2xl">C</span>
                </div>
                <span className="text-3xl font-black text-gray-900 tracking-tight">Criatis</span>
              </div>
              <p className="text-xs text-gray-400">Versão Alternativa — Fundo Claro</p>
            </div>

            {/* Símbolo isolado */}
            <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#7C3AED] to-[#2563EB] p-10 flex flex-col items-center justify-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-black text-4xl">C</span>
              </div>
              <p className="text-xs text-white/70">Símbolo Isolado</p>
            </div>
          </div>

          {/* Logo rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {logoRules.map((rule, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02]">
                <span className={`mt-0.5 text-sm flex-shrink-0 ${rule.ok ? "text-emerald-400" : "text-red-400"}`}>
                  {rule.ok ? "✓" : "✗"}
                </span>
                <p className="text-sm text-white/60">{rule.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORES */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">02 — Cores</p>
            <h2 className="text-3xl font-bold text-white">Paleta oficial</h2>
            <p className="text-white/40 mt-2 text-sm">Clique em qualquer cor para copiar o hex.</p>
          </div>

          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Cores da Marca</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => copyHex(c.hex)}
                className="text-left rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all overflow-hidden group"
              >
                <div
                  className="h-20 w-full transition-all group-hover:scale-[1.02] origin-bottom"
                  style={{ background: c.hex }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white text-sm">{c.name}</span>
                    <span className="text-xs text-white/30">{copiedHex === c.hex ? "Copiado!" : c.hex}</span>
                  </div>
                  <p className="text-xs text-white/35 mb-1">rgb({c.rgb})</p>
                  <p className="text-xs text-purple-400">{c.role}</p>
                  <p className="text-xs text-white/30 mt-1">{c.usage}</p>
                </div>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Neutros</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {neutrals.map((c) => (
              <button
                key={c.name}
                onClick={() => copyHex(c.hex)}
                className="text-left rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] transition-all overflow-hidden"
              >
                <div
                  className="h-12 w-full"
                  style={{
                    background: c.hex,
                    border: c.hex === "#FFFFFF" ? "none" : undefined
                  }}
                />
                <div className="p-3">
                  <p className="text-xs font-medium text-white mb-0.5">{c.name}</p>
                  <p className="text-[0.6rem] text-white/30">{c.usage}</p>
                </div>
              </button>
            ))}
          </div>

          <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Semânticas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {semantics.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="h-8 w-8 rounded-lg flex-shrink-0" style={{ background: c.hex, boxShadow: `0 4px 12px ${c.hex}50` }} />
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-white/30">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOGRAFIA */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">03 — Tipografia</p>
            <h2 className="text-3xl font-bold text-white">Escala tipográfica</h2>
            <p className="text-white/40 mt-2 text-sm">Fonte principal: <span className="font-mono text-purple-400">Inter</span> · Sistema sans-serif</p>
          </div>

          <div className="space-y-2">
            {typeScale.map((t) => (
              <div key={t.name} className="flex items-center gap-6 px-6 py-4 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] transition-all">
                <div className="w-28 flex-shrink-0">
                  <p className="text-xs font-semibold text-white/50">{t.name}</p>
                  <p className="text-[0.6rem] text-white/25 font-mono">{t.size} · w{t.weight}</p>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className={`${t.cls} text-white truncate`}>{t.sample}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADIENTES */}
      <section className="px-6 py-20 border-b border-white/[0.06]">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">04 — Gradientes</p>
            <h2 className="text-3xl font-bold text-white">Gradientes oficiais</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Gradient Principal", css: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)", label: "Purple → Blue" },
              { name: "Gradient Criativo", css: "linear-gradient(135deg, #7C3AED 0%, #F97316 100%)", label: "Purple → Orange" },
              { name: "Gradient Energia", css: "linear-gradient(135deg, #2563EB 0%, #F97316 100%)", label: "Blue → Orange" },
            ].map((g) => (
              <div key={g.name} className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <div className="h-24" style={{ background: g.css }} />
                <div className="p-4 bg-white/[0.02]">
                  <p className="font-semibold text-white text-sm">{g.name}</p>
                  <p className="text-xs text-white/40 font-mono mt-1">{g.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOM DE VOZ */}
      <section className="px-6 py-20">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">05 — Tom de Voz</p>
            <h2 className="text-3xl font-bold text-white">Como a Criatis fala</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {voicePillars.map((v) => (
              <div key={v.title} className="rounded-2xl p-5 border border-purple-500/15 bg-purple-500/[0.04]">
                <p className="font-bold text-purple-300 mb-2">{v.title}</p>
                <p className="text-sm text-white/40 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl p-6 border border-emerald-500/15 bg-emerald-500/[0.03]">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">✓ Dizemos</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>&ldquo;Crie sem limites.&rdquo;</li>
                <li>&ldquo;Sua ideia merece o melhor design.&rdquo;</li>
                <li>&ldquo;Feito para quem pensa grande.&rdquo;</li>
              </ul>
            </div>
            <div className="rounded-2xl p-6 border border-red-500/15 bg-red-500/[0.03]">
              <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">✗ Evitamos</p>
              <ul className="space-y-2 text-sm text-white/60">
                <li>&ldquo;Soluções inovadoras e disruptivas…&rdquo;</li>
                <li>&ldquo;Nosso produto oferece um ecossistema…&rdquo;</li>
                <li>Jargões corporativos sem substância.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
