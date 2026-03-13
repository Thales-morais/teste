import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/molecules/Toast";

export const metadata: Metadata = {
  title: "NOVA — Design System",
  description:
    "A complete design system inspired by Apple. Built with Next.js, Framer Motion, and GSAP.",
  keywords: ["design system", "UI", "components", "animations", "TypeScript", "Next.js"],
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
