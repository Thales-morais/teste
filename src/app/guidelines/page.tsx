"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

const logoRules = {
  do: [
    { text: "Use o logo em fundo escuro com gradiente completo", preview: "dark" },
    { text: "Use versão monocromática branca em fundos vibrantes", preview: "colored" },
    { text: "Mantenha área de respiro equivalente a 1× a altura do logo", preview: "spacing" },
    { text: "Use o símbolo isolado somente em contextos de ícone/favicon", preview: "icon" },
  ],
  dont: [
    { text: "Distorcer ou esticar o logo de qualquer forma" },
    { text: "Usar em fundos com baixo contraste" },
    { text: "Alterar cores fora da paleta oficial" },
    { text: "Adicionar sombras, contornos ou efeitos não previstos" },
    { text: "Usar o texto da marca sem o símbolo em comunicações formais" },
    { text: "Posicionar sobre imagens sem camada de proteção" },
  ],
};

const colorRules = {
  do: [
    "Use a cor primária (Purple) para elementos de destaque e CTAs principais",
    "Combine purple + blue em gradientes para peças digitais",
    "Use orange como acento em chamadas de ação secundárias",
    "Mantenha fundos escuros (#06060F) em peças digitais",
    "Use branco em 100% apenas para texto principal",
  ],
  dont: [
    "Não misture os três tons principais em igual peso na mesma peça",
    "Não use a paleta com fundos brancos nas comunicações principais",
    "Não use cores fora da paleta em elementos de identidade",
    "Não use Purple em textos longos — apenas em headings e CTAs",
  ],
};

const typographyRules = {
  do: [
    "Use Inter como fonte padrão para todos os projetos digitais",
    "Headings: peso 700–900. Body: peso 400–500",
    "Hierarquia clara: Display > Heading > Body > Caption",
    "Espaçamento entre linhas: 1.1–1.2 para títulos, 1.5–1.6 para corpo",
  ],
  dont: [
    "Não use fontes decorativas fora de contextos aprovados",
    "Não misture mais de 2 famílias tipográficas na mesma peça",
    "Não use texto com peso 300 ou abaixo na marca",
    "Não use ALL CAPS em textos longos — apenas em labels/overlines",
  ],
};

const applications = [
  {
    title: "Redes Sociais",
    description: "Posts quadrados e stories com fundo escuro, gradiente sutil e logo no canto.",
    rules: ["Proporção 1:1 (post) ou 9:16 (story)", "Logo no canto superior esquerdo", "Fundo: #06060F ou gradiente escuro", "Tipografia branca com acentos em purple/orange"],
    color: "from-purple-600/10 to-transparent",
    border: "border-purple-500/20",
  },
  {
    title: "Apresentações",
    description: "Slides com layout limpo, fundo escuro e elementos de marca consistentes.",
    rules: ["Proporção 16:9 padrão", "Cover com gradiente principal", "Ícones e elementos em purple/blue", "Rodapé com logo e URL"],
    color: "from-blue-600/10 to-transparent",
    border: "border-blue-500/20",
  },
  {
    title: "Anúncios Digitais",
    description: "Banners e criativos com CTA claro e hierarquia visual forte.",
    rules: ["CTA em destaque com cor orange", "Máximo 3 elementos visuais principais", "Headline em Display L ou XL", "Sempre incluir logo Criatis"],
    color: "from-orange-600/10 to-transparent",
    border: "border-orange-500/20",
  },
  {
    title: "E-mail Marketing",
    description: "Templates limpos com header de marca e rodapé com links sociais.",
    rules: ["Header com logo em fundo escuro", "Body com fundo branco ou cinza claro", "Links em purple (#7C3AED)", "CTA como botão primário gradiente"],
    color: "from-emerald-600/10 to-transparent",
    border: "border-emerald-500/20",
  },
];

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen" style={{ background: "#06060F" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-white/[0.06]">
        <div className="container-nova">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">Regras</p>
            <h1 className="text-5xl font-black text-white mb-4">Diretrizes de Uso</h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Como usar corretamente os elementos da marca Criatis em qualquer contexto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LOGO RULES */}
      <RuleSection number="01" title="Logo" subtitle="Uso correto do logo da Criatis">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">✓ Fazer</p>
            <div className="space-y-3">
              {logoRules.do.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/60">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">✗ Não fazer</p>
            <div className="space-y-3">
              {logoRules.dont.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/15 bg-red-500/[0.03]">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <p className="text-sm text-white/60">{rule.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual examples */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "✓ Correto", bg: "#06060F", border: "border-emerald-500/30", logo: "gradient" },
            { label: "✓ Correto", bg: "#7C3AED", border: "border-emerald-500/30", logo: "white" },
            { label: "✗ Errado", bg: "#FFFFFF", border: "border-red-500/30", logo: "small", note: "Sem espaço" },
            { label: "✗ Errado", bg: "#F97316", border: "border-red-500/30", logo: "distorted", note: "Cor errada" },
          ].map((ex, i) => (
            <div key={i} className={`rounded-xl border ${ex.border} overflow-hidden`}>
              <div
                className="h-20 flex items-center justify-center"
                style={{ background: ex.bg }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-5 w-5 rounded-md flex items-center justify-center"
                    style={{
                      background: ex.logo === "white" ? "rgba(255,255,255,0.9)" : "linear-gradient(135deg, #7C3AED, #2563EB)",
                      transform: ex.logo === "distorted" ? "scaleX(1.5)" : "none",
                    }}
                  >
                    <span style={{ color: ex.logo === "white" ? "#7C3AED" : "white", fontSize: "10px", fontWeight: 900 }}>C</span>
                  </div>
                  <span style={{
                    color: ex.bg === "#FFFFFF" || ex.bg === "#F97316" ? "#1a1a1a" : "white",
                    fontWeight: 800,
                    fontSize: ex.logo === "small" ? "8px" : "12px"
                  }}>Criatis</span>
                </div>
              </div>
              <div className="px-3 py-2 bg-white/[0.02]">
                <p className="text-xs text-white/50">{ex.label}</p>
                {ex.note && <p className="text-xs text-red-400">{ex.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </RuleSection>

      {/* COLOR RULES */}
      <RuleSection number="02" title="Cores" subtitle="Uso da paleta oficial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">✓ Fazer</p>
            <div className="space-y-2">
              {colorRules.do.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/60">{rule}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">✗ Não fazer</p>
            <div className="space-y-2">
              {colorRules.dont.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/15 bg-red-500/[0.03]">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <p className="text-sm text-white/60">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RuleSection>

      {/* TYPOGRAPHY RULES */}
      <RuleSection number="03" title="Tipografia" subtitle="Uso correto da escala tipográfica">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">✓ Fazer</p>
            <div className="space-y-2">
              {typographyRules.do.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03]">
                  <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-sm text-white/60">{rule}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-4">✗ Não fazer</p>
            <div className="space-y-2">
              {typographyRules.dont.map((rule, i) => (
                <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl border border-red-500/15 bg-red-500/[0.03]">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                  <p className="text-sm text-white/60">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RuleSection>

      {/* APPLICATIONS */}
      <section className="px-6 py-20">
        <div className="container-nova">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">04 — Aplicações</p>
            <h2 className="text-3xl font-bold text-white">Guia por formato</h2>
            <p className="text-white/40 mt-2 text-sm">Regras específicas para cada tipo de peça.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((app, i) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-6 border ${app.border} bg-gradient-to-br ${app.color}`}
              >
                <h3 className="font-bold text-white text-lg mb-2">{app.title}</h3>
                <p className="text-sm text-white/40 mb-4">{app.description}</p>
                <ul className="space-y-2">
                  {app.rules.map((rule, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/55">
                      <span className="text-purple-400 mt-0.5">·</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function RuleSection({ number, title, subtitle, children }: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-20 border-b border-white/[0.06]">
      <div className="container-nova">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">{number} — {title}</p>
          <h2 className="text-3xl font-bold text-white">{subtitle}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}
