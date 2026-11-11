"use client";

import React, { useState, useRef } from "react";
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
  Star,
  Layers,
  Minus
} from "lucide-react";
import MarkdownViewer from "@/components/MarkdownViewer";
import CarouselManager from "@/components/CarouselManager";
import ImageCarousel from "@/components/ImageCarousel";
import VisualCanvasEditor, { VisualCanvasEditorRef } from "@/components/VisualCanvasEditor";
import { Project } from "@/lib/types";

interface ProjectEditorProps {
  initialData?: Project;
  isEdit?: boolean;
}

export default function ProjectEditor({ initialData, isEdit = false }: ProjectEditorProps) {
  const router = useRouter();

  // Basic project fields
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(
    initialData?.content ||
      `# Project Architecture & Overview

Explain the problem, architecture decisions, and business impact here.

## The Challenge
Describe what problems the team or users faced.

## The Engineering Solution
- Next.js App Router for sub-50ms TTFB
- High performance state management
- Responsive Tailwind design system

\`\`\`typescript
export async function handleDataPipeline() {
  // scalable logic
}
\`\`\`

## Results & Impact
Shipped to production with zero regressions.`
  );

  // Cover & Carousel Gallery
  const [coverImage, setCoverImage] = useState(
    initialData?.coverImage ||
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  );
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [showCarouselManager, setShowCarouselManager] = useState(false);

  // Metadata
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [category, setCategory] = useState(initialData?.category || "Full-Stack");
  const [tags, setTags] = useState<string[]>(
    initialData?.tags || ["Next.js", "TypeScript", "Tailwind CSS"]
  );
  const [tagInput, setTagInput] = useState("");
  const [demoUrl, setDemoUrl] = useState(initialData?.demoUrl || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.githubUrl || "");
  const [featured, setFeatured] = useState(initialData?.featured ?? true);
  const [client, setClient] = useState(initialData?.client || "");
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear().toString());

  const [stat1Label, setStat1Label] = useState(initialData?.stats?.[0]?.label || "Active Users");
  const [stat1Value, setStat1Value] = useState(initialData?.stats?.[0]?.value || "1,200+");
  const [stat2Label, setStat2Label] = useState(initialData?.stats?.[1]?.label || "Performance");
  const [stat2Value, setStat2Value] = useState(initialData?.stats?.[1]?.value || "99.9%");

  // Mode: "write" | "preview" | "split"
  const [mode, setMode] = useState<"write" | "preview" | "split">("write");
  const [canvasView, setCanvasView] = useState<"visual" | "markdown">("visual");
  const [activeTag, setActiveTag] = useState<string>("p");
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [saving, setSaving] = useState(false);

  const visualCanvasRef = useRef<VisualCanvasEditorRef>(null);

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
    const textarea = document.getElementById("project-medium-textarea") as HTMLTextAreaElement;
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

  // Visual Toolbar Handlers (Directly transform canvas visually)
  const handleToolbarBold = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleBold();
    } else {
      insertFormatting("**", "**");
    }
  };

  const handleToolbarItalic = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleItalic();
    } else {
      insertFormatting("*", "*");
    }
  };

  const handleToolbarH1 = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleHeading(1);
    } else {
      insertFormatting("# ");
    }
  };

  const handleToolbarH2 = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleHeading(2);
    } else {
      insertFormatting("## ");
    }
  };

  const handleToolbarQuote = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleQuote();
    } else {
      insertFormatting("> ");
    }
  };

  const handleToolbarCode = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.insertCodeBlock("typescript");
    } else {
      insertFormatting("```typescript\n", "\n```");
    }
  };

  const handleToolbarList = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.toggleList();
    } else {
      insertFormatting("- ");
    }
  };

  const handleToolbarDivider = () => {
    if (canvasView === "visual" && visualCanvasRef.current) {
      visualCanvasRef.current.insertDivider();
    } else {
      insertFormatting("\n\n---\n\n");
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("Judul project wajib diisi!");
      return;
    }

    setSaving(true);
    const key = localStorage.getItem("admin_key") || "";

    const finalContent =
      canvasView === "visual" && visualCanvasRef.current
        ? visualCanvasRef.current.getMarkdown()
        : content;

    const payload: Partial<Project> = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary,
      category,
      tags,
      coverImage,
      gallery,
      demoUrl,
      githubUrl,
      featured,
      client,
      year,
      stats: [
        ...(stat1Label && stat1Value ? [{ label: stat1Label, value: stat1Value }] : []),
        ...(stat2Label && stat2Value ? [{ label: stat2Label, value: stat2Value }] : []),
      ],
      content: finalContent,
    };

    try {
      const url = isEdit ? `/api/projects/${initialData?.id}` : "/api/projects";
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
        alert(data.error || "Gagal menyimpan project");
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
            <span className="hidden sm:inline">Project in Dzaky Portfolio</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-950 font-bold">Medium-Style Canvas</span>
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
            <span className="hidden sm:inline">Metadata & Links</span>
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? "Saving..." : isEdit ? "Update Project" : "Publish Project"}</span>
          </button>
        </div>
      </header>

      {/* Main Container - Expansive BoardUI Canvas (Full 7XL Width) */}
      <main className="flex-1 max-w-6xl xl:max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 relative">
        {/* Floating/Sticky Formatting Toolbar */}
        {mode !== "preview" && (
          <div className="sticky top-16 z-30 mb-8 max-w-lg mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-full px-3 py-1.5 shadow-xl shadow-slate-900/5 flex items-center justify-between gap-1 text-slate-700 select-none">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarBold}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarItalic}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarH1}
              className={`p-1.5 rounded-full transition-colors ${
                activeTag === "h1" ? "bg-zinc-950 text-white shadow-xs" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="H1 Heading"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarH2}
              className={`p-1.5 rounded-full transition-colors ${
                activeTag === "h2" ? "bg-zinc-950 text-white shadow-xs" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="H2 Subheading"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <span className="w-px h-4 bg-slate-200" />
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarQuote}
              className={`p-1.5 rounded-full transition-colors ${
                activeTag === "blockquote" ? "bg-zinc-950 text-white shadow-xs" : "hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="Pull Quote"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarCode}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Code Block"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarList}
              className="p-1.5 rounded-full hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleToolbarDivider}
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

        {/* Carousel & Cover Manager (Collapsible) */}
        {showCarouselManager && (
          <CarouselManager
            coverImage={coverImage}
            gallery={gallery}
            onCoverChange={setCoverImage}
            onGalleryChange={setGallery}
          />
        )}

        {/* WRITE MODE: Pure Medium Aesthetic Writing Sheet */}
        {mode === "write" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Borderless Large Medium Title */}
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Project Title..."
              className="w-full text-3xl sm:text-5xl font-serif font-black text-[#111111] border-none outline-none placeholder:text-slate-300 leading-tight bg-transparent"
            />

            {/* Borderless Medium Summary */}
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="A short punchy one-liner summarizing the project's core value..."
              className="w-full text-lg sm:text-xl text-slate-500 font-serif font-light border-none outline-none placeholder:text-slate-300 resize-none bg-transparent leading-relaxed"
            />

            {/* Live Carousel Preview inside Canvas */}
            {coverImage && (
              <div className="pt-2">
                <ImageCarousel
                  coverImage={coverImage}
                  gallery={gallery}
                  title={title || "Cover Preview"}
                />
              </div>
            )}

            {/* Aesthetic Medium Body Canvas / Editor */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100/60">
                <span className="text-xs font-semibold text-zinc-400">
                  {canvasView === "visual"
                    ? "Interactive Visual Canvas (WYSIWYG)"
                    : "Markdown Source Code"}
                </span>
                <div className="flex items-center bg-zinc-100 p-0.5 rounded-lg text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setCanvasView("visual")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      canvasView === "visual"
                        ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    Visual Canvas
                  </button>
                  <button
                    type="button"
                    onClick={() => setCanvasView("markdown")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      canvasView === "markdown"
                        ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    Source Markdown
                  </button>
                </div>
              </div>

              {canvasView === "visual" ? (
                <VisualCanvasEditor
                  ref={visualCanvasRef}
                  value={content}
                  onChange={setContent}
                  onActiveTagChange={setActiveTag}
                  placeholder="Write your case study here... Break down technical decisions, architecture, and impact."
                />
              ) : (
                <textarea
                  id="project-medium-textarea"
                  rows={20}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your case study here... Break down technical decisions, architecture, and impact."
                  className="w-full text-sm font-mono leading-relaxed text-[#242424] border-none outline-none bg-transparent resize-y placeholder:text-slate-300 p-2"
                />
              )}
            </div>
          </div>
        )}

        {/* SPLIT VIEW */}
        {mode === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mx-4 sm:-mx-8">
            <div className="p-4 sm:p-6 border-r border-slate-100 space-y-4">
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Project Title..."
                className="w-full text-2xl font-serif font-bold text-slate-900 border-none outline-none bg-transparent"
              />
              <textarea
                rows={2}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary..."
                className="w-full text-sm text-slate-500 font-serif border-none outline-none bg-transparent resize-none"
              />
              <div className="border-t border-slate-100 pt-4">
                <VisualCanvasEditor
                  ref={visualCanvasRef}
                  value={content}
                  onChange={setContent}
                  onActiveTagChange={setActiveTag}
                  placeholder="Type case study content..."
                  minHeight="350px"
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto max-h-[800px]">
              <h1 className="text-3xl font-serif font-black text-[#111111] mb-4">{title || "Untitled Project"}</h1>
              {coverImage && (
                <div className="my-4">
                  <ImageCarousel coverImage={coverImage} gallery={gallery} title={title} />
                </div>
              )}
              <MarkdownViewer content={content} />
            </div>
          </div>
        )}

        {/* PREVIEW MODE */}
        {mode === "preview" && (
          <div className="animate-in fade-in duration-200">
            <div className="inline-block px-3 py-1 rounded-md text-xs font-semibold text-zinc-800 bg-zinc-100 border border-zinc-200/80 mb-4">
              {category}
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#111111] tracking-tight leading-tight">
              {title || "Untitled Project"}
            </h1>

            {summary && (
              <p className="text-xl sm:text-2xl font-serif text-slate-500 mt-4 leading-relaxed font-light">
                {summary}
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

      {/* Slide-Over Settings & Links Drawer */}
      {showSettingsDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-900 text-lg">Project Details & Links</h3>
                <button
                  onClick={() => setShowSettingsDrawer(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Featured toggle */}
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Tampilkan di Hero 360° Surrounding Cards</span>
              </label>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                >
                  <option value="AI & Startup">AI & Startup</option>
                  <option value="Data & RevOps">Data & RevOps</option>
                  <option value="Full-Stack">Full-Stack</option>
                  <option value="AI & NLP">AI & NLP</option>
                  <option value="Research & AI">Research & AI</option>
                  <option value="Quantitative Analytics">Quantitative Analytics</option>
                  <option value="Frontend">Frontend / UI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Tags (Press Enter)
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
                  placeholder="e.g. Python, FastAPI, Alibaba Cloud..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Live Demo URL</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">GitHub URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Client / Perusahaan</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="99 Group / Lab"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tahun</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2026"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Custom Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="project-slug"
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
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all cursor-pointer"
              >
                {saving ? "Saving..." : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
