"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CreativeType } from "@/lib/gemini";

const tabs: { id: CreativeType; label: string; emoji: string; desc: string; aspect: string }[] = [
  { id: "post", label: "Posts", emoji: "📸", desc: "Feed do Instagram e Facebook (1:1)", aspect: "aspect-square" },
  { id: "story", label: "Stories", emoji: "📱", desc: "Stories e Reels verticais (9:16)", aspect: "aspect-[9/16]" },
  { id: "banner", label: "Banners", emoji: "🖼️", desc: "Banners digitais e hero (16:9)", aspect: "aspect-video" },
  { id: "presentation", label: "Apresentação", emoji: "🎯", desc: "Slides e apresentações (16:9)", aspect: "aspect-video" },
  { id: "ad", label: "Anúncios", emoji: "📣", desc: "Criativos para anúncios pagos", aspect: "aspect-square" },
  { id: "cover", label: "Covers", emoji: "🎨", desc: "Capas de redes sociais (16:9)", aspect: "aspect-video" },
];

interface GeneratedImage {
  id: string;
  type: CreativeType;
  dataUrl: string;
  prompt: string;
  label: string;
}

export default function KitBrandingPage() {
  const [activeTab, setActiveTab] = useState<CreativeType>("post");
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatingLabel, setGeneratingLabel] = useState("");

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const currentImages = images.filter((img) => img.type === activeTab);

  const generateImage = async (promptIndex: number, label: string) => {
    setLoading(true);
    setError(null);
    setGeneratingLabel(label);

    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeTab, promptIndex }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Erro ao gerar imagem");
      }

      setImages((prev) => [
        {
          id: `${activeTab}-${Date.now()}`,
          type: activeTab,
          dataUrl: data.image,
          prompt: data.prompt,
          label,
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
      setGeneratingLabel("");
    }
  };

  const downloadImage = (img: GeneratedImage) => {
    const a = document.createElement("a");
    a.href = img.dataUrl;
    a.download = `criatis-${img.type}-${Date.now()}.png`;
    a.click();
  };

  const templateVariants = [
    { label: "Modelo 1 — Minimalista", index: 0 },
    { label: "Modelo 2 — Dinâmico", index: 1 },
    { label: "Modelo 3 — Bold", index: 2 },
  ];

  return (
    <main className="min-h-screen" style={{ background: "#06060F" }}>
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-16 px-6 border-b border-white/[0.06]">
        <div className="container-nova">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">IA + Design</p>
              <span className="px-2 py-0.5 rounded-md bg-orange-500/15 border border-orange-500/20 text-orange-300 text-[0.6rem] font-medium">
                Powered by Gemini
              </span>
            </div>
            <h1 className="text-5xl font-black text-white mb-4">Kit de Criativos</h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Gere templates de posts, stories, banners e apresentações com a identidade Criatis
              usando inteligência artificial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-6 py-8 border-b border-white/[0.06] sticky top-16 z-10 backdrop-blur-xl bg-[#06060F]/90">
        <div className="container-nova">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-white/40 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-12">
        <div className="container-nova">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-1">
              {currentTab.emoji} {currentTab.label}
            </h2>
            <p className="text-white/40 text-sm">{currentTab.desc}</p>
          </div>

          {/* Generate buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {templateVariants.map((variant) => (
              <button
                key={variant.index}
                onClick={() => generateImage(variant.index, variant.label)}
                disabled={loading}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all border ${
                  loading
                    ? "opacity-50 cursor-not-allowed border-white/[0.06] text-white/30"
                    : "border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400/50"
                }`}
              >
                {loading && generatingLabel === variant.label ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-purple-400 border-t-transparent animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    {variant.label}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/[0.05] text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div className="mb-6">
              <div className={`rounded-2xl bg-white/[0.03] border border-white/[0.06] ${currentTab.aspect} w-full max-w-sm animate-pulse`} />
            </div>
          )}

          {/* Generated images */}
          <AnimatePresence>
            {currentImages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentImages.map((img) => (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className={`relative ${currentTab.aspect} overflow-hidden bg-[#0D0D1A]`}>
                      <img
                        src={img.dataUrl}
                        alt={img.label}
                        className="w-full h-full object-cover"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => downloadImage(img)}
                          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                        >
                          ↓ Download
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-white mb-1">{img.label}</p>
                      <p className="text-xs text-white/30 line-clamp-2">{img.prompt.slice(0, 100)}...</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : !loading ? (
              <div className="text-center py-24 border border-dashed border-white/[0.08] rounded-2xl">
                <p className="text-5xl mb-4">{currentTab.emoji}</p>
                <p className="text-white/30 text-sm mb-2">Nenhum criativo gerado ainda</p>
                <p className="text-white/20 text-xs">Clique em um dos modelos acima para gerar</p>
              </div>
            ) : null}
          </AnimatePresence>
        </div>
      </section>

      {/* Info section */}
      <section className="px-6 pb-20">
        <div className="container-nova">
          <div className="rounded-2xl border border-purple-500/15 bg-purple-500/[0.04] p-8">
            <div className="flex items-start gap-4">
              <span className="text-3xl">💡</span>
              <div>
                <h3 className="font-bold text-white mb-2">Como usar os criativos</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {[
                    { step: "1", text: "Escolha o formato (post, story, banner, etc.)" },
                    { step: "2", text: "Clique no modelo desejado para gerar com IA" },
                    { step: "3", text: "Faça download e edite no Figma ou Canva" },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-3">
                      <span className="h-6 w-6 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {s.step}
                      </span>
                      <p className="text-sm text-white/50">{s.text}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/25 mt-4">
                  Imagens geradas pelo modelo Gemini 2.0 Flash (Google AI) com prompts otimizados para a identidade Criatis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
