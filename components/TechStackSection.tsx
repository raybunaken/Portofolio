"use client";

import React from "react";
import { Cpu, Terminal, Database, Cloud, Palette, Award, ArrowUpRight, FolderOpen } from "lucide-react";
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

        {/* Verified Certifications & Credentials Grid */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 mb-3 text-xs font-semibold text-zinc-800">
                <Award className="w-3.5 h-3.5 text-zinc-700" />
                <span>Verified Credentials</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
                Certifications & Specializations
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                Official certificates from PwC, Deloitte, BCG, Dicoding, and Google with direct Drive verification.
              </p>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1uKGvF30uoCoSe8vA7UP3oXcdq2jf2i3O?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/90 transition-all self-start sm:self-auto shrink-0"
            >
              <FolderOpen className="w-3.5 h-3.5 text-zinc-600" />
              <span>Open Portfolio Drive Folder</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Generative AI Engineering with LLMs",
                issuer: "Dicoding",
                credentialId: "ID: L4PQ9NNJ4PO1",
                url: "https://www.dicoding.com/certificates/L4PQ9NNJ4PO1",
                domain: "AI & LLM",
              },
              {
                title: "Technology Consulting Simulation",
                issuer: "PwC US",
                credentialId: "Forage Verified",
                url: "https://drive.google.com/file/d/1iLKXStlxklki1ypq7VSeDzhzTAnGXC7J/view?usp=sharing",
                domain: "Consulting",
              },
              {
                title: "Data Analytics Job Simulation",
                issuer: "Deloitte Australia",
                credentialId: "Forage Verified",
                url: "https://drive.google.com/file/d/1AwMVarYh6L2yULNq9eOiv5r8fTWuLyj9/view?usp=sharing",
                domain: "Data Analytics",
              },
              {
                title: "Data for Decision Makers",
                issuer: "BCG",
                credentialId: "Forage Verified",
                url: "https://drive.google.com/file/d/1RPIk2-mqhAFsBuT9nm_ego7yekXaOssL/view?usp=sharing",
                domain: "Business Strategy",
              },
              {
                title: "Google Data Analytics Professional",
                issuer: "Coursera",
                credentialId: "Professional Certificate",
                url: "https://drive.google.com/file/d/1f_cwgezPhBUerFPIva36EuexhH_qhAPi/view?usp=sharing",
                domain: "Analytics & SQL",
              },
              {
                title: "Test of English Proficiency (TOEP 775)",
                issuer: "UMS Language Center",
                credentialId: "Score: 775 / Advanced",
                url: "https://drive.google.com/file/d/1oSQyxCtBNfIBojJ7iFz4gkKfx5d-mYpW/view?usp=sharing",
                domain: "English TOEP",
              },
            ].map((cert, cIdx) => (
              <a
                key={cIdx}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                className="group glass-card rounded-xl p-4 border border-zinc-200/90 hover:border-zinc-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                    <span className="font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200/60">
                      {cert.issuer}
                    </span>
                    <span>{cert.domain}</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors leading-snug">
                    {cert.title}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-zinc-500">{cert.credentialId}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-zinc-900 group-hover:underline">
                    <span>View PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                  </span>
                </div>
              </a>
            ))}
          </div>
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
