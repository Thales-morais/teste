"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Tag } from "@/components/atoms/Tag";
import { Avatar } from "@/components/atoms/Avatar";

const categories = ["Todos", "Átomos", "Moléculas", "Feedback"];

export default function ComponentsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [inputVal, setInputVal] = useState("");

  return (
    <main className="min-h-screen" style={{ background: "#06060F" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-white/[0.06]">
        <div className="container-nova">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-3">UI Kit</p>
            <h1 className="text-5xl font-black text-white mb-4">Componentes</h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Biblioteca de componentes reutilizáveis da Criatis. Prontos para usar em qualquer projeto.
            </p>
          </motion.div>

          {/* Category filter */}
          <div className="flex gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white"
                    : "text-white/40 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="px-6 py-16">
        <div className="container-nova space-y-16">

          {/* BUTTONS */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="01"
              title="Button"
              description="Botão com múltiplas variantes, tamanhos e estados. Suporta efeito magnético."
              code={`<Button variant="primary" magnetic>Get started</Button>\n<Button variant="secondary">Secundário</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="danger">Deletar</Button>`}
            >
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" magnetic>Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Perigo</Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
                <Button variant="primary" size="xl">XLarge</Button>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="primary" loading>Carregando...</Button>
                <Button variant="primary" disabled>Desabilitado</Button>
              </div>
            </ComponentSection>
          )}

          {/* BADGES */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="02"
              title="Badge"
              description="Indicadores de status, labels e contadores."
              code={`<Badge variant="default">Default</Badge>\n<Badge variant="success">Ativo</Badge>\n<Badge variant="warning">Pendente</Badge>\n<Badge variant="error">Erro</Badge>`}
            >
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Ativo</Badge>
                <Badge variant="warning">Pendente</Badge>
                <Badge variant="danger">Erro</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </ComponentSection>
          )}

          {/* INPUT */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="03"
              title="Input"
              description="Campo de texto com suporte a label, placeholder, estado de erro e sucesso."
              code={`<Input label="Nome" placeholder="Digite seu nome" />\n<Input label="Email" type="email" error="Email inválido" />`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Input
                  label="Nome completo"
                  placeholder="Digite seu nome"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="email@criatis.com"
                />
                <Input
                  label="Campo com erro"
                  placeholder="Inválido"
                  error="Este campo é obrigatório"
                />
                <Input
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </ComponentSection>
          )}

          {/* TAGS */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="04"
              title="Tag"
              description="Tags para categorias, filtros e labels de conteúdo."
              code={`<Tag>Design</Tag>\n<Tag active>Branding</Tag>\n<Tag>Motion</Tag>`}
            >
              <div className="flex flex-wrap gap-2">
                <Tag>Design</Tag>
                <Tag active>Branding</Tag>
                <Tag>Motion</Tag>
                <Tag>TypeScript</Tag>
                <Tag active>Next.js</Tag>
                <Tag>Figma</Tag>
              </div>
            </ComponentSection>
          )}

          {/* AVATARS */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="05"
              title="Avatar"
              description="Avatar com suporte a imagem, iniciais e indicador de status."
              code={`<Avatar name="Ana Silva" size="md" />\n<Avatar name="Bruno Costa" size="lg" online />`}
            >
              <div className="flex flex-wrap items-end gap-4">
                <Avatar name="Ana Silva" size="sm" />
                <Avatar name="Bruno Costa" size="md" />
                <Avatar name="Carlos Mota" size="lg" />
                <Avatar name="Diana Rocha" size="xl" />
              </div>
            </ComponentSection>
          )}

          {/* COLOR TOKENS */}
          {(activeCategory === "Todos" || activeCategory === "Átomos") && (
            <ComponentSection
              number="06"
              title="Tokens de Cor"
              description="Tokens CSS customizáveis para toda a paleta Criatis."
              code={`/* Primárias */\n--purple: #7C3AED\n--blue: #2563EB\n--orange: #F97316\n\n/* Backgrounds */\n--bg-primary: #06060F\n--bg-secondary: #0D0D1A`}
            >
              <div className="flex flex-wrap gap-2">
                {[
                  { hex: "#7C3AED", label: "Purple" },
                  { hex: "#2563EB", label: "Blue" },
                  { hex: "#F97316", label: "Orange" },
                  { hex: "#9D5FF0", label: "Purple L" },
                  { hex: "#22C55E", label: "Success" },
                  { hex: "#EF4444", label: "Error" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02]">
                    <div className="h-5 w-5 rounded-md" style={{ background: c.hex }} />
                    <span className="text-xs text-white/60 font-mono">{c.label}</span>
                  </div>
                ))}
              </div>
            </ComponentSection>
          )}

        </div>
      </div>

      <Footer />
    </main>
  );
}

function ComponentSection({
  number,
  title,
  description,
  code,
  children,
}: {
  number: string;
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}) {
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-mono text-purple-400/60">{number}</span>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/40 text-sm mb-6">{description}</p>

      <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
        {/* Preview */}
        <div className="p-8 bg-white/[0.01]">
          {children}
        </div>

        {/* Code toggle */}
        <div className="border-t border-white/[0.06]">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full px-6 py-3 flex items-center justify-between text-xs text-white/30 hover:text-white/60 hover:bg-white/[0.02] transition-all"
          >
            <span className="font-mono">{showCode ? "Ocultar código" : "Ver código"}</span>
            <span>{showCode ? "▲" : "▼"}</span>
          </button>
          {showCode && (
            <div className="border-t border-white/[0.06] bg-[#0D0D1A] px-6 py-4">
              <pre className="text-xs font-mono text-purple-300 overflow-x-auto whitespace-pre">{code}</pre>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
