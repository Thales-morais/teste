"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Tag } from "@/components/atoms/Tag";
import { Input } from "@/components/atoms/Input";
import { Avatar, AvatarGroup } from "@/components/atoms/Avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/molecules/Card";
import { Modal } from "@/components/molecules/Modal";
import { Tooltip } from "@/components/molecules/Tooltip";
import { Accordion } from "@/components/molecules/Accordion";
import { Icons } from "@/components/atoms/Icon";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-6 pb-3 border-b border-white/[0.06]">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

export default function ComponentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("all");

  return (
    <div className="min-h-screen bg-[#000000]">
      <div className="border-b border-white/[0.06] bg-[#0A0A0A]">
        <div className="container-nova py-5 flex items-center gap-3 text-sm text-white/40">
          <a href="/docs" className="hover:text-white transition-colors">Docs</a>
          <span>/</span>
          <span className="text-white">Components</span>
        </div>
      </div>

      <div className="container-nova py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="label-overline">Component Library</span>
          <h1 className="heading-xl text-4xl text-white mt-3 mb-3">Components</h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            Live demos of all NOVA components. Built with accessibility and animation in mind.
          </p>
        </motion.div>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/40 mb-3 font-mono">variant</p>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-3 font-mono">size</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">XLarge</Button>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-3 font-mono">states</p>
              <div className="flex flex-wrap gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button magnetic icon={<Icons.ArrowRight />} iconPosition="right">
                  Magnetic
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success" dot>Active</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Error</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="primary" size="lg">Large Badge</Badge>
          </div>
        </Section>

        {/* Tags */}
        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            {["All", "Design", "Motion", "Components", "Tokens"].map((tag) => (
              <Tag
                key={tag}
                active={activeTag === tag.toLowerCase()}
                onClick={() => setActiveTag(tag.toLowerCase())}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <Input label="Email" placeholder="you@example.com" type="email" />
            <Input label="Password" placeholder="••••••••" type="password" />
            <Input label="Search" placeholder="Search..." icon={<Icons.Globe className="h-4 w-4" />} />
            <Input
              label="Error state"
              placeholder="Invalid input"
              error="This field is required"
              defaultValue="bad value"
            />
          </div>
        </Section>

        {/* Avatars */}
        <Section title="Avatars">
          <div className="space-y-6">
            <div>
              <p className="text-xs text-white/40 mb-3 font-mono">sizes</p>
              <div className="flex items-center gap-3">
                <Avatar name="Sarah Chen" size="xs" />
                <Avatar name="Marcus Webb" size="sm" />
                <Avatar name="Elena R" size="md" />
                <Avatar name="James Park" size="lg" />
                <Avatar name="Nova User" size="xl" online={true} />
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-3 font-mono">avatar group</p>
              <AvatarGroup
                avatars={[
                  { name: "Sarah Chen" },
                  { name: "Marcus Webb" },
                  { name: "Elena Rodriguez" },
                  { name: "James Park" },
                  { name: "Nova User" },
                  { name: "Alex Kim" },
                ]}
                max={4}
              />
            </div>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card glow>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
                <CardDescription>With glassmorphism background and glow on hover.</CardDescription>
              </CardHeader>
            </Card>
            <Card tilt glow>
              <CardHeader>
                <div className="h-8 w-8 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/30 flex items-center justify-center mb-3">
                  <Icons.Zap className="h-4 w-4 text-[#0066FF]" />
                </div>
                <CardTitle>3D Tilt Card</CardTitle>
                <CardDescription>Hover me for 3D perspective tilt effect.</CardDescription>
              </CardHeader>
            </Card>
            <Card glass={false} glow>
              <CardHeader>
                <CardTitle>Solid Card</CardTitle>
                <CardDescription>Solid dark background variant.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Badge variant="primary" size="sm">Featured</Badge>
                <Button variant="ghost" size="sm" className="ml-auto">View</Button>
              </CardFooter>
            </Card>
          </div>
        </Section>

        {/* Tooltip */}
        <Section title="Tooltip">
          <div className="flex flex-wrap gap-4">
            <Tooltip content="Top tooltip" placement="top">
              <Button variant="secondary" size="sm">Hover (top)</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" placement="bottom">
              <Button variant="secondary" size="sm">Hover (bottom)</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" placement="right">
              <Button variant="secondary" size="sm">Hover (right)</Button>
            </Tooltip>
          </div>
        </Section>

        {/* Modal */}
        <Section title="Modal">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Modal
          </Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="NOVA Modal"
            description="A beautifully animated modal with backdrop blur and spring animation."
          >
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              This modal uses Framer Motion for entrance/exit animations and supports
              keyboard navigation (Escape to close).
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>
        </Section>

        {/* Accordion */}
        <Section title="Accordion">
          <div className="max-w-2xl">
            <Accordion
              allowMultiple
              items={[
                {
                  id: "1",
                  question: "What makes NOVA different?",
                  answer: "NOVA combines world-class animation primitives, accessible Radix UI components, and a comprehensive token system into a cohesive design system inspired by Apple's attention to detail.",
                },
                {
                  id: "2",
                  question: "How are animations implemented?",
                  answer: "Framer Motion handles UI component animations (hover, enter/exit states), while GSAP ScrollTrigger powers complex scroll-driven sequences. Both work together seamlessly.",
                },
                {
                  id: "3",
                  question: "Is NOVA production-ready?",
                  answer: "Yes. NOVA is TypeScript-first, tree-shakeable, and optimized for performance. All components follow accessibility best practices.",
                },
              ]}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
