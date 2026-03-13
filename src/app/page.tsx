"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

const sections = [
  {
    href: "/brand",
    title: "Marca",
    description: "Logo, paleta de cores, tipografia, espaçamento e tom de voz da Criatis.",
    emoji: "🎨",
    tag: "Identidade",
    color: "from-purple-600/20 to-purple-800/5",
    border: "border-purple-500/20 hover:border-purple-400/40",
    tagColor: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  },
  {
    href: "/components",
    title: "Componentes",
    description: "Biblioteca de componentes reutilizáveis: botões, cards, inputs, modais e mais.",
    emoji: "⚙️",
    tag: "UI Kit",
    color: "from-blue-600/20 to-blue-800/5",
    border: "border-blue-500/20 hover:border-blue-400/40",
    tagColor: "bg-blue-500/15 text-blue-300 border-blue-500/20",
  },
  {
    href: "/guidelines",
    title: "Diretrizes",
    description: "Regras de uso da marca, Do's & Don'ts, aplicações corretas e incorretas.",
    emoji: "📐",
    tag: "Regras",
    color: "from-emerald-600/20 to-emerald-800/5",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    tagColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  },
  {
    href: "/kit-branding",
    title: "Kit de Criativos",
    description: "Templates de posts, stories, banners e apresentações gerados com IA.",
    emoji: "✨",
    tag: "IA + Design",
    color: "from-orange-600/20 to-orange-800/5",
    border: "border-orange-500/20 hover:border-orange-400/40",
    tagColor: "bg-orange-500/15 text-orange-300 border-orange-500/20",
  },
  {
    href: "/docs",
    title: "Documentação",
    description: "Guia técnico para desenvolvedores: tokens, instalação e integração.",
    emoji: "📖",
    tag: "Dev",
    color: "from-slate-600/20 to-slate-800/5",
    border: "border-slate-500/20 hover:border-slate-400/40",
    tagColor: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  },
];

const principles = [
  { title: "Consistência", desc: "Toda peça da Criatis fala a mesma língua visual.", icon: "⬡" },
  { title: "Criatividade", desc: "Ousados sem perder clareza e propósito.", icon: "◈" },
  { title: "Clareza", desc: "Design limpo que comunica com precisão.", icon: "◎" },
  { title: "Escala", desc: "Componentes que funcionam do stories ao outdoor.", icon: "⊞" },
];

const colorPalette = [
  { name: "Purple", hex: "#7C3AED", var: "--purple" },
  { name: "Blue", hex: "#2563EB", var: "--blue" },
  { name: "Orange", hex: "#F97316", var: "--orange" },
  { name: "Background", hex: "#06060F", var: "--bg" },
  { name: "White", hex: "#FFFFFF", var: "--white" },
];

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#06060F" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* BG glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(ellipse, #7C3AED 0%, #2563EB 50%, transparent 70%)" }} />

        <div className="container-nova relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/10 text-purple-300 text-xs font-medium mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              Design System Oficial · v1.0
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              O guia de marca
              <br />
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#2563EB] to-[#F97316] bg-clip-text text-transparent">
                da Criatis
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10">
              Manual completo de identidade visual e design system para designers e
              desenvolvedores criarem LPs, sites, criativos, posts e apresentações
              com consistência e qualidade.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="/brand"
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#2563EB] hover:opacity-90 transition-opacity shadow-xl shadow-purple-500/25">
                Explorar a Marca
              </a>
              <a href="/kit-branding"
                className="px-6 py-3 rounded-xl font-semibold text-white/80 border border-white/10 hover:border-white/20 hover:text-white hover:bg-white/[0.04] transition-all">
                Kit de Criativos ✨
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sections grid */}
      <section className="px-6 pb-24">
        <div className="container-nova">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((s, i) => (
              <motion.a
                key={s.title}
                href={s.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`group relative rounded-2xl p-6 border bg-gradient-to-br ${s.color} ${s.border} transition-all duration-300 overflow-hidden cursor-pointer`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{s.emoji}</span>
                  <span className={`text-[0.65rem] px-2 py-0.5 rounded-md font-medium border ${s.tagColor}`}>
                    {s.tag}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
                <p className="text-sm text-white/45 leading-relaxed">{s.description}</p>
                <div className="mt-4 text-xs text-white/25 group-hover:text-white/50 transition-colors flex items-center gap-1">
                  Acessar <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Princípios */}
      <section className="px-6 pb-24">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">Princípios</p>
            <h2 className="text-3xl font-bold text-white">O que guia a Criatis</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="rounded-2xl p-5 border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="text-2xl text-purple-400 mb-3 font-mono">{p.icon}</div>
                <h3 className="font-bold text-white mb-1">{p.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Paleta de cores preview */}
      <section className="px-6 pb-32">
        <div className="container-nova">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">Paleta</p>
            <h2 className="text-3xl font-bold text-white">Cores da marca</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {colorPalette.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div
                  className="h-8 w-8 rounded-lg shadow-lg flex-shrink-0"
                  style={{
                    background: c.hex,
                    boxShadow: c.hex !== "#06060F" ? `0 4px 16px ${c.hex}40` : "none",
                    border: c.hex === "#FFFFFF" ? "1px solid rgba(255,255,255,0.1)" : "none"
                  }}
                />
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-white/35 font-mono">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <a href="/brand" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
              Ver paleta completa →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
