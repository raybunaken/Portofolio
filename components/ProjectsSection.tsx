"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, Layers, Star } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { Project } from "@/lib/types";

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <section id="projects" className="py-24 relative bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 mb-3 text-xs font-semibold text-zinc-700">
              <Layers className="w-3.5 h-3.5" />
              <span>Selected Works ({projects.length} Projects)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
              Crafted with Precision
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-2 max-w-xl">
              Production web applications, full-stack architectures, fintech integrations, and open-source contributions.
            </p>
          </div>

          {/* Category Filter Pills: BoardUI High-Contrast Filter */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-zinc-950 text-white shadow-2xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-950 border border-zinc-200/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group glass-card glass-card-hover rounded-2xl overflow-hidden border border-zinc-200/90 flex flex-col justify-between"
            >
              {/* Cover Image & Badges */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-xs font-medium text-zinc-900 bg-white/95 backdrop-blur-md shadow-2xs border border-zinc-200/80">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-amber-800 bg-amber-50/95 backdrop-blur-md border border-amber-200/80">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Bottom Stats inside image */}
                {project.stats && project.stats.length > 0 && (
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2">
                    {project.stats.map((s, idx) => (
                      <div
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/10 text-white text-[11px]"
                      >
                        <span className="text-zinc-400 mr-1">{s.label}:</span>
                        <span className="font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-100 text-zinc-600 border border-zinc-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-zinc-950 group-hover:text-zinc-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Action Links */}
                <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between">
                  <Link
                    href={`/project/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        title={
                          project.demoUrl.includes("drive.google.com")
                            ? "View Document (PDF)"
                            : project.demoUrl.includes("journal") ||
                              project.demoUrl.includes("article") ||
                              project.demoUrl.includes("cibangsa")
                            ? "View Publication (Journal)"
                            : "Open Live Preview"
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
            <p className="text-zinc-500 text-sm">Belum ada project dalam kategori ini.</p>
          </div>
        )}
      </div>
    </section>
  );
}
