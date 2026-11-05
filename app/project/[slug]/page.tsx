import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownViewer from "@/components/MarkdownViewer";
import ImageCarousel from "@/components/ImageCarousel";
import { getProjectBySlug, getProjects } from "@/lib/db";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  // Only recommend other projects (no articles mixed in)
  const otherProjects = allProjects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200/80">
                {project.category}
              </span>
              {project.year && (
                <span className="flex items-center gap-1 text-xs text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md border border-zinc-200/60 font-mono">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="text-xs text-zinc-500 font-mono px-2 py-0.5 rounded bg-zinc-50 border border-zinc-200/60">
                  {project.client}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-950 tracking-tight leading-tight mb-4">
              {project.title}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed font-normal">
              {project.summary}
            </p>

            {/* Action Buttons & Tags */}
            <div className="mt-6 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200/80 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Interactive Multi-Image Screenshot Carousel */}
          <div className="my-8 w-full">
            <ImageCarousel
              coverImage={project.coverImage}
              gallery={project.gallery}
              title={project.title}
            />
          </div>

          {/* Project Metrics (if any) */}
          {project.stats && project.stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 my-8">
              {project.stats.map((s, idx) => (
                <div key={idx} className="text-center p-2">
                  <div className="text-2xl font-bold text-zinc-950 font-mono tracking-tight">{s.value}</div>
                  <div className="text-xs text-zinc-500 font-medium mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Case Study Content */}
          <div className="mt-10 pt-6 border-t border-zinc-100 w-full">
            <MarkdownViewer content={project.content} />
          </div>

          {/* More Projects Section (Only Projects) */}
          {otherProjects.length > 0 && (
            <div className="mt-20 pt-12 border-t border-zinc-200/80 w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                    More Projects
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Other engineering systems and architectures
                  </p>
                </div>
                <Link
                  href="/#projects"
                  className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1 transition-colors"
                >
                  <span>All projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {otherProjects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/project/${p.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden border border-zinc-200/90 flex flex-col justify-between hover:border-zinc-300 transition-all"
                  >
                    <div>
                      {p.coverImage && (
                        <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative">
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="text-[11px] font-mono text-zinc-500 mb-1.5">
                          {p.category} {p.year ? `| ${p.year}` : ""}
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-950 line-clamp-2 leading-snug">
                          {p.title}
                        </h4>
                        <p className="text-xs text-zinc-500 line-clamp-2 mt-1.5">{p.summary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
