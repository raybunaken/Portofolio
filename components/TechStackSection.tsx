"use client";

import React from "react";
import { Cpu, Terminal, Database, Cloud, Palette } from "lucide-react";
import { Profile } from "@/lib/types";

interface TechStackSectionProps {
  profile: Profile;
}

export default function TechStackSection({ profile }: TechStackSectionProps) {
  const categories = [
    {
      title: "Frontend & UI",
      icon: Palette,
      skills: ["React 19", "Next.js 16", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Radix UI"],
    },
    {
      title: "Backend & Systems",
      icon: Terminal,
      skills: ["Node.js", "Express / Fastify", "RESTful APIs", "GraphQL", "WebSockets", "Server Actions"],
    },
    {
      title: "Databases & Storage",
      icon: Database,
      skills: ["PostgreSQL", "SQLite", "Prisma ORM", "Drizzle ORM", "Redis", "Supabase"],
    },
    {
      title: "DevOps & Tooling",
      icon: Cloud,
      skills: ["Git & GitHub", "Docker", "Vercel / Railway", "CI/CD Actions", "Linux / Bash", "Turbopack"],
    },
  ];

  return (
    <section id="stack" className="py-24 relative bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 mb-3 text-xs font-semibold text-zinc-800">
            <Cpu className="w-3.5 h-3.5" />
            <span>Modern Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
            Tools & Technologies
          </h2>
          <p className="text-zinc-500 text-sm sm:text-base mt-2">
            The modern technologies, frameworks, and tools I use to build production-grade web applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-zinc-200/90 hover:border-zinc-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-900 mb-5">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="font-bold text-zinc-950 text-base mb-4">{cat.title}</h3>

                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border border-zinc-200/60 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Stats Bar: BoardUI Deep Neutral Bar */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-zinc-950 text-white shadow-sm border border-zinc-900">
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="text-center py-2">
              <div className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
