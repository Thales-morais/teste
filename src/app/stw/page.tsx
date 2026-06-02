"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type FormState = {
  nome: string;
  cnpj: string;
  whatsapp: string;
  email: string;
};

const initialForm: FormState = {
  nome: "",
  cnpj: "",
  whatsapp: "",
  email: "",
};

function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function maskPhone(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export default function STWLandingPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [accepted, setAccepted] = useState({
    lgpd: false,
    titular: false,
    contato: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    form.nome.trim().length > 2 &&
    form.cnpj.replace(/\D/g, "").length === 14 &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    accepted.lgpd &&
    accepted.titular;

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[#04060B] text-white overflow-x-hidden">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full opacity-30 blur-[140px]"
          style={{ background: "radial-gradient(ellipse, #0066FF 0%, #00D4FF 40%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 md:px-10 lg:px-16 pt-6 pb-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center shadow-[0_0_24px_rgba(0,102,255,0.45)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L3 7v6c0 5 3.5 9.5 9 11 5.5-1.5 9-6 9-11V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold tracking-tight text-white text-lg">STW Brasil</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">Inteligência Corporativa</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-2 text-xs text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Atendimento ativo · LGPD compliant
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-10 lg:px-16 pt-10 md:pt-20 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-medium mb-7"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            ALERTA: Dados públicos podem estar sendo usados contra você
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
          >
            A maioria dos empresários{" "}
            <span className="text-white/40">não sabe</span>
            <br />
            o que está{" "}
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#338AFF] to-[#0066FF] bg-clip-text text-transparent">
              publicamente exposto
            </span>{" "}
            sobre eles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base md:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Assista ao vídeo abaixo e descubra o que aparece sobre a sua empresa,
            <span className="text-white"> antes que outra pessoa use isso contra você.</span>
          </motion.p>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0066FF] via-[#00D4FF] to-[#0066FF] opacity-40 blur-2xl" />
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#0A0E16] shadow-2xl">
              {/* Video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-transparent to-[#00D4FF]/10" />
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <button
                  type="button"
                  className="group relative flex flex-col items-center gap-4"
                  onClick={() => {
                    const f = document.getElementById("formulario");
                    f?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <span className="relative flex items-center justify-center h-20 w-20 md:h-24 md:w-24 rounded-full bg-white text-[#0066FF] shadow-[0_0_40px_rgba(0,102,255,0.55)] transition-transform duration-300 group-hover:scale-110">
                    <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-30" />
                    <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-10 md:w-10 ml-1" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                  <span className="text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors">
                    Assistir vídeo de vendas
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* CTA principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <a
              href="#formulario"
              className="group inline-flex items-center justify-center gap-3 px-7 md:px-10 py-5 rounded-2xl font-bold text-base md:text-lg text-white bg-gradient-to-r from-[#0066FF] via-[#0080FF] to-[#00D4FF] shadow-[0_0_50px_rgba(0,102,255,0.55)] hover:shadow-[0_0_70px_rgba(0,102,255,0.75)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              QUERO MEU RELATÓRIO DE EXPOSIÇÃO CORPORATIVA GRATUITO
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <p className="mt-4 text-xs text-white/40">
              100% gratuito · Sem cartão de crédito · Entrega em até 24h
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sales letter */}
      <section className="relative z-10 px-6 md:px-10 lg:px-16 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-8 md:p-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00D4FF]/25 bg-[#00D4FF]/10 text-[#00D4FF] text-[11px] font-semibold tracking-wider uppercase mb-6">
              Carta de vendas
            </div>

            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
              Você sabe exatamente o que está disponível sobre a sua empresa em fontes públicas?
            </h2>

            <div className="space-y-5 text-base md:text-lg text-white/70 leading-relaxed">
              <p>
                Concorrentes, ex-sócios, ex-funcionários, golpistas e até mesmo ações judiciais começam pela mesma porta:
                <strong className="text-white"> a informação pública que está exposta sobre você e sua empresa.</strong>
              </p>
              <p>
                Endereços, vínculos societários, processos, registros, e-mails vazados, dados de diretores,
                relações comerciais — tudo isso compõe um <em className="text-[#00D4FF] not-italic font-semibold">retrato corporativo</em> que
                qualquer pessoa, com as ferramentas certas, pode consultar em minutos.
              </p>
              <p>
                A diferença é que <strong className="text-white">você ainda não consultou</strong>.
              </p>
              <p>
                O <strong className="text-white">Relatório de Exposição Corporativa</strong> da STW Brasil mostra,
                em um único documento, o que terceiros já podem encontrar sobre o seu CNPJ —
                e onde estão os seus maiores pontos de vulnerabilidade.
              </p>
            </div>

            {/* Bullets */}
            <div className="mt-10 grid sm:grid-cols-2 gap-3">
              {[
                "Vínculos societários expostos",
                "Processos e ações públicas",
                "E-mails e credenciais vazadas",
                "Dados de diretores e sócios",
                "Relações comerciais visíveis",
                "Pontos críticos de exposição",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-white/85">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.04]">
              <p className="text-sm md:text-base text-amber-100/90 leading-relaxed">
                <strong className="text-amber-300">Importante:</strong> o relatório é produzido exclusivamente a partir de
                <strong> fontes públicas e abertas</strong>, sem acesso a bases restritas. Você verá exatamente
                o que <em>qualquer pessoa</em> pode ver sobre a sua empresa — antes que use contra você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="formulario" className="relative z-10 px-6 md:px-10 lg:px-16 py-16 md:py-24 scroll-mt-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-300 text-[11px] font-semibold tracking-wider uppercase mb-5">
              Formulário gratuito
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Receba seu relatório em <span className="text-[#00D4FF]">até 24 horas</span>
            </h2>
            <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto">
              Preencha o formulário abaixo e receba seu Relatório de Exposição Corporativa gratuitamente
              em até 24 horas no seu WhatsApp.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#0066FF]/40 via-[#00D4FF]/40 to-[#0066FF]/40 blur-2xl opacity-60" />

            <div className="relative rounded-3xl border border-white/[0.1] bg-[#0A0E16]/90 backdrop-blur-xl p-7 md:p-10 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]">
                    <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Solicitação recebida!</h3>
                  <p className="text-white/65 leading-relaxed max-w-md mx-auto">
                    Em até <strong className="text-white">24 horas</strong> você receberá o seu
                    Relatório de Exposição Corporativa diretamente no WhatsApp informado.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Field
                    label="Nome"
                    placeholder="Seu nome completo"
                    value={form.nome}
                    onChange={(v) => update("nome", v)}
                    autoComplete="name"
                  />
                  <Field
                    label="CNPJ"
                    placeholder="00.000.000/0000-00"
                    value={form.cnpj}
                    onChange={(v) => update("cnpj", maskCNPJ(v))}
                    inputMode="numeric"
                  />
                  <Field
                    label="WhatsApp"
                    placeholder="(00) 00000-0000"
                    value={form.whatsapp}
                    onChange={(v) => update("whatsapp", maskPhone(v))}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    placeholder="voce@empresa.com.br"
                    value={form.email}
                    onChange={(v) => update("email", v)}
                    autoComplete="email"
                  />

                  {/* LGPD Consent */}
                  <div className="space-y-3 pt-2">
                    <Consent
                      checked={accepted.lgpd}
                      onChange={(v) => setAccepted((p) => ({ ...p, lgpd: v }))}
                      label="Autorizo a STWBrasil a tratar meus dados pessoais e realizar a busca de dados vinculados ao meu CPF ou CNPJ exclusivamente em fontes públicas e abertas, sem acesso a bases restritas ou privilegiadas, de acordo com a Política de Privacidade e a LGPD."
                      required
                    />
                    <Consent
                      checked={accepted.titular}
                      onChange={(v) => setAccepted((p) => ({ ...p, titular: v }))}
                      label="Declaro ser o titular, responsável legal ou detentor do CPF e/ou CNPJ informados nesta página, estando ciente de que a busca será realizada sobre esses dados."
                      required
                    />
                    <Consent
                      checked={accepted.contato}
                      onChange={(v) => setAccepted((p) => ({ ...p, contato: v }))}
                      label="Autorizo a STWBrasil a utilizar meus dados de contato para envio de informações, ofertas e comunicações sobre seus serviços."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canSubmit || submitting}
                    className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-base md:text-lg text-white bg-gradient-to-r from-[#0066FF] via-[#0080FF] to-[#00D4FF] shadow-[0_0_40px_rgba(0,102,255,0.55)] hover:shadow-[0_0_60px_rgba(0,102,255,0.75)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none hover:-translate-y-0.5 disabled:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        ENVIAR
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/40 pt-1">
                    Seus dados são tratados em conformidade com a LGPD.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-10 lg:px-16 pt-10 pb-10 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#00D4FF] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2L3 7v6c0 5 3.5 9.5 9 11 5.5-1.5 9-6 9-11V7l-9-5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-sm font-bold">STW Brasil</span>
          </div>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} STW Brasil · Política de Privacidade · LGPD
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Subcomponents ---------- */

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
};

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
}: FieldProps) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-white/80 mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required
        className="w-full h-12 px-4 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-white/25 outline-none transition-all duration-300 focus:border-[#0066FF]/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#0066FF]/25 hover:border-white/20"
      />
    </label>
  );
}

type ConsentProps = {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  required?: boolean;
};

function Consent({ checked, onChange, label, required }: ConsentProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span className="relative flex-shrink-0 mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
          className="peer sr-only"
        />
        <span className="block h-5 w-5 rounded-md border-2 border-white/20 bg-white/5 transition-all duration-200 peer-checked:bg-gradient-to-br peer-checked:from-[#0066FF] peer-checked:to-[#00D4FF] peer-checked:border-transparent group-hover:border-white/40" />
        <svg
          viewBox="0 0 24 24"
          className="absolute top-0.5 left-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span className="text-xs md:text-sm text-white/55 leading-relaxed group-hover:text-white/70 transition-colors">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </span>
    </label>
  );
}
