import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MarkdownViewer from "@/components/MarkdownViewer";
import ArticleClapButton from "@/components/ArticleClapButton";
import ImageCarousel from "@/components/ImageCarousel";
import { getArticleBySlug, getArticles, getProfile } from "@/lib/db";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const [article, profile, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getProfile(),
    getArticles(),
  ]);

  if (!article) {
    notFound();
  }

  // Only recommend other articles (no projects mixed in)
  const otherArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/#articles"
              className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all stories</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200/80 mb-4">
              {article.category}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-zinc-950 tracking-tight leading-[1.2] mb-4">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-lg sm:text-xl font-serif text-zinc-600 font-light leading-relaxed mt-3">
                {article.excerpt}
              </p>
            )}

            {/* Author Profile Bar */}
            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-12 h-12 rounded-full object-cover ring-1 ring-zinc-200"
                />
                <div>
                  <div className="text-sm sm:text-base font-bold text-zinc-950 leading-tight">
                    {profile.name}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-zinc-400" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <ArticleClapButton articleId={article.id} initialClaps={article.claps || 0} />
            </div>
          </header>

          {/* Cover / Screenshot Carousel */}
          <div className="my-8 w-full">
            <ImageCarousel
              coverImage={article.coverImage}
              gallery={article.gallery}
              title={article.title}
            />
          </div>

          {/* Story Body */}
          <div className="mt-10 w-full">
            <MarkdownViewer content={article.content} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-zinc-200/80 flex flex-wrap gap-1.5 w-full">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors cursor-default"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Bio Box */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-center gap-5 w-full">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-zinc-200"
            />
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-zinc-950 text-base">Written by {profile.name}</h4>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1.5 leading-relaxed">{profile.bio}</p>
            </div>
          </div>

          {/* More Articles Section (Only Articles) */}
          {otherArticles.length > 0 && (
            <div className="mt-20 pt-12 border-t border-zinc-200/80 w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-950 tracking-tight">
                    More Stories
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                    Related writings and engineering perspectives
                  </p>
                </div>
                <Link
                  href="/#articles"
                  className="text-xs font-semibold text-zinc-700 hover:text-zinc-950 flex items-center gap-1 transition-colors"
                >
                  <span>All stories</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {otherArticles.map((item) => (
                  <Link
                    key={item.id}
                    href={`/article/${item.slug}`}
                    className="group glass-card rounded-2xl overflow-hidden border border-zinc-200/90 flex flex-col justify-between hover:border-zinc-300 transition-all"
                  >
                    <div>
                      {item.coverImage && (
                        <div className="aspect-[16/9] w-full bg-zinc-900 overflow-hidden relative">
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                          <span>{item.category}</span>
                          <span>{item.readTime}</span>
                        </div>
                        <h4 className="text-sm font-bold text-zinc-900 group-hover:text-zinc-950 line-clamp-2 leading-snug">
                          {item.title}
                        </h4>
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
