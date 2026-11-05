"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Save,
  SlidersHorizontal,
  Eye,
  Edit3,
  Heading1,
  Heading2,
  Quote,
  Code,
  List,
  Bold,
  Italic,
  X,
  Clock,
  Layers,
  Minus
} from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";
import CarouselManager from "@/components/CarouselManager";
import ImageCarousel from "@/components/ImageCarousel";
import { Article } from "@/lib/types";

interface ArticleEditorProps {
  initialData?: Article;
  isEdit?: boolean;
}

export default function ArticleEditor({ initialData, isEdit = false }: ArticleEditorProps) {
  const router = useRouter();

  // Story fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(
    initialData?.content ||
      `Start typing your story here just like in Medium...

Explain your architecture, engineering findings, or personal reflections naturally.

## Key Insights & Lessons
Break down the technical decisions or trade-offs you encountered.

\`\`\`python
# Example snippet
def evaluate_pipeline(data):
    return "Optimized and scalable"
\`\`\`

> "Simplicity is prerequisite for reliability." - Edsger W. Dijkstra

You can write freely, organize your paragraphs, and format text seamlessly.`
  );

  // Carousel & Cover images
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage ||
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
  );
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [showCarouselManager, setShowCarouselManager] = useState(false);

  // Metadata
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "AI Architecture");
  const [tags, setTags] = useState<string[]>(initialData?.tags || ["Explainable AI", "NLP", "Career"]);
  const [tagInput, setTagInput] = useState("");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");

  // Mode: "write" (Medium canvas), "preview" (Reader preview), "split"
  const [mode, setMode] = useState<"write" | "preview" | "split">("write");
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit && (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-"))) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmed = tagInput.trim().replace(/^,|,$/g, "");
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter((item) => item !== t));
  };

  const insertFormatting = (prefix: string, suffix: string = "") => {
    const textarea = document.getElementById("medium-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selected = text.substring(start, end);

    const replacement = `${prefix}${selected || "text"}${suffix}`;
    const newText = text.substring(0, start) + replacement + text.substring(end);
    setContent(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selected.length || 4));
    }, 10);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul cerita wajib diisi!");
      return;
    }

    setSaving(true);
    const key = localStorage.getItem("admin_key") || "";

    const payload: Partial<Article> = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      excerpt,
      category,
      tags,
      coverImage,
      gallery,
      readTime,
      content,
      published: true,
    };

    try {
      const url = isEdit ? `/api/articles/${initialData?.id}` : "/api/articles";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": key,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          router.push("/admin");
        }, 800);
      } else {
        alert(data.error || "Gagal menyimpan artikel");
      }
    } catch {
      alert("Terjadi kesalahan saat menyimpan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Aesthetic Medium-Style Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            title="Kembali ke Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span className="hidden sm:inline">Draft in Dzaky</span>
            <span className="text-zinc-300">•</span>
            <span className="text-emerald-600 font-medium">Auto-Saving Enabled</span>
          </div>
        </div>

        {/* View Mode & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setMode("write")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                mode === "write" ? "bg-white text-zinc-950 shadow-2xs font-semibold" : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Canvas</span>
            </button>
            <button
              onClick={() => setMode("split")}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                mode === "split" ? "bg-white text-zinc-950 shadow-2xs font-semibold" : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              <span>Split</span>
            </button>
            <button
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                mode === "preview" ? "bg-white text-zinc-950 shadow-2xs font-semibold" : "text-zinc-500 hover:text-zinc-950"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Reader Preview</span>
            </button>
          </div>

          <button
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/80 transition-all cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-800" />
            <span className="hidden sm:inline">Settings & Tags</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Publishing..." : isEdit ? "Update Story" : "Publish Story"}</span>
          </button>
        </div>
      </header>

      {/* Main Container - Expansive BoardUI Canvas (Full 7XL Width) */}
      <main className="flex-1 max-w-6xl xl:max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 relative">
        {/* Floating/Sticky Formatting Toolbar */}
        {mode !== "preview" && (
          <div className="sticky top-16 z-30 mb-8 max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full px-3 py-1.5 shadow-xl shadow-slate-900/5 flex items-center justify-between gap-1 text-slate-700">
            <button
              type="button"
              onClick={() => insertFormatting("**", "**")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("*", "*")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <button
              type="button"
              onClick={() => insertFormatting("# ")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("## ")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <button
              type="button"
              onClick={() => insertFormatting("> ")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Pull Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("```python\n", "\n```")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("- ")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertFormatting("\n\n---\n\n")}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors font-serif font-bold text-xs"
              title="Medium Divider (···)"
            >
              ···
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <button
              type="button"
              onClick={() => setShowCarouselManager(!showCarouselManager)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                showCarouselManager ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Carousel ({[coverImage, ...gallery].filter(Boolean).length})</span>
            </button>
          </div>
        )}

        {/* Carousel & Cover Management Box (Collapsible) */}
        {showCarouselManager && (
          <CarouselManager
            coverImage={coverImage}
            gallery={gallery}
            onCoverChange={setCoverImage}
            onGalleryChange={setGallery}
          />
        )}

        {/* ======================================================== */}
        {/* MEDIUM CANVASES: Free-Typing UI */}
        {/* ======================================================== */}
        {mode === "write" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Borderless Large Medium Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Title..."
              className="w-full text-3xl sm:text-5xl font-serif font-black text-[#111111] border-none outline-none placeholder:text-slate-300 leading-tight bg-transparent"
            />

            {/* Borderless Medium Subtitle */}
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Tell your story or summarize key insights..."
              className="w-full text-lg sm:text-xl text-slate-500 font-serif font-light border-none outline-none placeholder:text-slate-300 resize-none bg-transparent leading-relaxed"
            />

            {/* Inline Carousel Preview inside the canvas */}
            {coverImage && (
              <div className="pt-2">
                <ImageCarousel
                  coverImage={coverImage}
                  gallery={gallery}
                  title={title || "Cover Preview"}
                />
              </div>
            )}

            {/* Aesthetic Medium Body Textarea */}
            <div className="pt-4 border-t border-slate-100">
              <textarea
                id="medium-textarea"
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your story here... Tap the toolbar above to add headings, quotes, code, and lists."
                className="w-full text-[19px] sm:text-[21px] font-serif leading-[1.85] text-[#242424] border-none outline-none bg-transparent resize-y placeholder:text-slate-300"
              />
            </div>
          </div>
        )}

        {/* SPLIT VIEW (Canvas on left, Preview on right) */}
        {mode === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mx-4 sm:-mx-8">
            <div className="p-4 sm:p-6 border-r border-slate-100 space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Title..."
                className="w-full text-2xl font-serif font-bold text-slate-900 border-none outline-none bg-transparent"
              />
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Subtitle..."
                className="w-full text-sm text-slate-500 font-serif border-none outline-none bg-transparent resize-none"
              />
              <textarea
                id="medium-textarea"
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full text-base font-serif leading-relaxed border-t border-slate-100 pt-4 outline-none bg-transparent resize-y"
              />
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[800px]">
              <h1 className="text-3xl font-serif font-black text-[#111111] mb-4">{title || "Untitled"}</h1>
              {coverImage && (
                <div className="my-4">
                  <ImageCarousel coverImage={coverImage} gallery={gallery} title={title} />
                </div>
              )}
              <MarkdownViewer content={content} />
            </div>
          </div>
        )}

        {/* FULL READER PREVIEW */}
        {mode === "preview" && (
          <div className="animate-in fade-in duration-200">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200/80 mb-4">
              {category}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#111111] tracking-tight leading-tight">
              {title || "Untitled Story"}
            </h1>

            {excerpt && (
              <p className="text-xl sm:text-2xl font-serif text-slate-500 mt-4 leading-relaxed font-light">
                {excerpt}
              </p>
            )}

            <div className="my-8">
              <ImageCarousel
                coverImage={coverImage}
                gallery={gallery}
                title={title}
              />
            </div>

            <div className="mt-8">
              <MarkdownViewer content={content} />
            </div>
          </div>
        )}
      </main>

      {/* Slide-Over Settings & Tags Drawer */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Story Settings & Tags</h3>
                <button
                  onClick={() => setShowSettingsDrawer(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category / Topic
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="AI Architecture, Engineering, Data..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Reading Time
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="5 min read"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tags (Press Enter or comma)
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-zinc-100 text-zinc-800 border border-zinc-200/80"
                    >
                      <span>{t}</span>
                      <button type="button" onClick={() => handleRemoveTag(t)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="e.g. Next.js, Explainable AI, RevOps..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Custom URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="story-url-slug"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-600"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSettingsDrawer(false)}
                className="w-full py-3 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Close Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowSettingsDrawer(false);
                  handleSave();
                }}
                disabled={saving}
                className="w-full py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
              >
                {saving ? "Publishing..." : "Publish Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
