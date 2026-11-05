"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Clock, Heart, ArrowUpRight, PenTool } from "lucide-react";
import { Article } from "@/lib/types";

interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  const [clapsMap, setClapsMap] = useState<Record<string, number>>(
    articles.reduce((acc, a) => ({ ...acc, [a.id]: a.claps || 0 }), {})
  );
  const [clappingId, setClappingId] = useState<string | null>(null);

  const handleClap = async (e: React.MouseEvent, articleId: string) => {
    e.preventDefault();
    e.stopPropagation();

    // Optimistic UI update
    setClapsMap((prev) => ({ ...prev, [articleId]: (prev[articleId] || 0) + 1 }));
    setClappingId(articleId);
    setTimeout(() => setClappingId(null), 400);

    try {
      await fetch(`/api/articles/${articleId}/clap`, { method: "POST" });
    } catch {
      // ignore
    }
  };

  return (
    <section id="articles" className="py-24 relative bg-zinc-50/70 border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-200/70 border border-zinc-300/80 mb-3 text-xs font-semibold text-zinc-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Writings & Case Studies</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight">
              Thoughts, Stories & Architecture
            </h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-2 max-w-xl">
              Deep-dives into web performance, architectural decisions, and modern full-stack development.
            </p>
          </div>

          <Link
            href="/admin"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-800 hover:text-zinc-950 bg-white hover:bg-zinc-100 px-3.5 py-2 rounded-xl border border-zinc-200 shadow-2xs transition-colors"
          >
            <PenTool className="w-3.5 h-3.5 text-zinc-700" />
            <span>Write New Story via CMS</span>
          </Link>
        </div>

        {/* BoardUI Rich Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group glass-card glass-card-hover rounded-2xl overflow-hidden border border-zinc-200/90 flex flex-col justify-between"
            >
              <div>
                {/* Visual Cover Banner with Overlay */}
                <div className="relative aspect-[16/9] w-full bg-zinc-900 overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-900 bg-white/95 backdrop-blur-md shadow-2xs border border-zinc-200/80">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-md border border-white/10">
                      <Clock className="w-3 h-3 text-zinc-400" />
                      <span>{article.readTime}</span>
                    </span>
                  </div>

                  {/* Bottom Date inside banner */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[11px] font-mono text-zinc-300 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-zinc-950 group-hover:text-zinc-600 transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-sm text-zinc-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono font-medium text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Claps & Arrow */}
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={(e) => handleClap(e, article.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      clappingId === article.id
                        ? "scale-115 bg-rose-50 text-rose-600 border border-rose-200"
                        : "bg-zinc-100 text-zinc-600 hover:bg-rose-50 hover:text-rose-600 border border-zinc-200/60"
                    }`}
                    title="Clap for this story"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        (clapsMap[article.id] || 0) > 0 ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                    <span>{clapsMap[article.id] || 0}</span>
                  </button>

                  <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-zinc-950 group-hover:text-white flex items-center justify-center text-zinc-600 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
