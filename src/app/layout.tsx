import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/molecules/Toast";

export const metadata: Metadata = {
  title: "Criatis — Design System",
  description:
    "Manual de marca e design system oficial da Criatis. Guia completo para designers e desenvolvedores.",
  keywords: ["design system", "marca", "branding", "criatis", "UI", "components", "Next.js"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
