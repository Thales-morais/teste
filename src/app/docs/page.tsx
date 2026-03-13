"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Icons } from "@/components/atoms/Icon";
import { staggerContainer, staggerItem } from "@/animations/variants";

const sections = [
  {
    href: "/docs/colors",
    title: "Cores",
    description: "Sistema de cores Criatis — backgrounds, acentos, texto e tokens semânticos.",
    icon: <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB]" />,
    tag: "Tokens",
  },
  {
    href: "/docs/typography",
    title: "Tipografia",
    description: "Escala tipográfica, famílias, pesos e estilos display da Criatis.",
    icon: <span className="text-white font-bold text-lg leading-none">Aa</span>,
    tag: "Tokens",
  },
  {
    href: "/docs/components",
    title: "Componentes",
    description: "Demos e uso de todos os átomos, moléculas e organismos.",
    icon: <Icons.Layers className="h-5 w-5 text-[#7C3AED]" />,
    tag: "Components",
  },
  {
    href: "/docs/animations",
    title: "Animações",
    description: "Variants, hooks e exemplos de uso com Framer Motion e GSAP.",
    icon: <Icons.Zap className="h-5 w-5 text-[#F97316]" />,
    tag: "Motion",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#06060F" }}>
      {/* Header */}
      <div className="border-b border-white/[0.06] bg-[#0D0D1A]">
        <div className="container-nova py-6 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#2563EB] flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-black text-xs">C</span>
            </div>
            <span className="font-bold text-lg text-white">
              Criatis
            </span>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-sm text-white/50">Docs</span>
          </a>

          <a
            href="/"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            ← Voltar ao início
          </a>
        </div>
      </div>

      <div className="container-nova py-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="label-overline">Documentação Técnica</span>
          <h1 className="heading-xl text-5xl md:text-6xl text-white mt-3 mb-4">
            Criatis Design System
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            Tudo que você precisa para desenvolver com o design system Criatis.
            Tokens, componentes, animações e padrões.
          </p>
        </motion.div>

        {/* Sections grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {sections.map((section) => (
            <motion.a
              key={section.title}
              href={section.href}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "group relative rounded-2xl p-6 cursor-pointer",
                "bg-white/[0.03] hover:bg-white/[0.06]",
                "border border-white/[0.06] hover:border-white/[0.12]",
                "transition-colors duration-300",
                "overflow-hidden"
              )}
            >
              {/* Top line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-base font-semibold text-white">{section.title}</h2>
                    <span className="text-[0.65rem] px-2 py-0.5 rounded-md bg-[#7C3AED]/15 text-[#9D5FF0] font-medium border border-[#7C3AED]/20">
                      {section.tag}
                    </span>
                  </div>
                  <p className="text-sm text-white/45 leading-relaxed">{section.description}</p>
                </div>
                <Icons.ChevronRight className="h-4 w-4 text-white/25 group-hover:text-white/60 shrink-0 mt-0.5 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Quick start */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
        >
          <h3 className="text-base font-semibold text-white mb-3">Quick Start</h3>
          <pre className="text-sm font-mono text-[#9D5FF0] bg-[#0D0D1A] rounded-xl p-4 overflow-x-auto">
            <code>{`# Instalar dependências
npm install framer-motion gsap embla-carousel-react
npm install @radix-ui/react-dialog @radix-ui/react-accordion

# Importar estilos
import '@criatis/styles/globals.css'

# Usar um componente
import { Button } from '@criatis/components'
<Button variant="primary" magnetic>Começar</Button>`}</code>
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
