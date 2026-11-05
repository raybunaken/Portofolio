"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderContent = () => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeLanguage = "";
    let listItems: string[] = [];
    let isOrderedList = false;

    const flushList = (key: string) => {
      if (listItems.length === 0) return;
      if (isOrderedList) {
        elements.push(
          <ol key={key} className="list-decimal pl-7 my-6 space-y-2.5 text-[18px] sm:text-[19px] leading-[1.8] text-[#292929] font-serif">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key} className="list-disc pl-7 my-6 space-y-2.5 text-[18px] sm:text-[19px] leading-[1.8] text-[#292929] font-serif">
            {listItems.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
      }
      listItems = [];
    };

    const formatInline = (text: string): string => {
      let formatted = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Bold: **text**
      formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#111111]">$1</strong>');
      // Italic: *text* or _text_
      formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
      formatted = formatted.replace(/_([^_]+)_/g, '<em class="italic">$1</em>');
      // Strikethrough: ~~text~~
      formatted = formatted.replace(/~~(.*?)~~/g, '<del class="line-through text-slate-400">$1</del>');
      // Inline code: `code`
      formatted = formatted.replace(
        /`([^`]+)`/g,
        '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-[0.88em] border border-slate-200/80">$1</code>'
      );
      // Links: [text](url)
      formatted = formatted.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-zinc-950 underline underline-offset-4 decoration-zinc-400 hover:decoration-zinc-950 font-medium transition-colors">$1</a>'
      );

      return formatted;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Code blocks
      if (trimmed.startsWith("```")) {
        if (inCodeBlock) {
          const codeString = codeBlockContent.join("\n");
          const blockIdx = i;
          elements.push(
            <div key={`code-${i}`} className="my-8 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl not-prose">
              <div className="bg-[#161b22] px-4 py-2.5 text-xs font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </span>
                  <span className="ml-2 font-semibold text-slate-300">{codeLanguage || "code"}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(codeString, blockIdx)}
                  className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Copy code"
                >
                  {copiedIndex === blockIdx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-5 overflow-x-auto text-[14px] font-mono text-emerald-400 leading-relaxed">
                <code>{codeString}</code>
              </pre>
            </div>
          );
          codeBlockContent = [];
          inCodeBlock = false;
          codeLanguage = "";
        } else {
          flushList(`list-before-code-${i}`);
          inCodeBlock = true;
          codeLanguage = trimmed.replace("```", "").trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        continue;
      }

      // 1. HORIZONTAL DIVIDER / THEMATIC BREAK: ---, ***, or ___
      // Medium's signature aesthetic: · · · centered three dots with wide tracking
      if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
        flushList(`list-before-hr-${i}`);
        elements.push(
          <div key={`hr-${i}`} className="my-14 text-center select-none" aria-hidden="true">
            <span className="text-2xl sm:text-3xl font-serif text-slate-400 tracking-[1.3em] font-light inline-block pl-[1.3em]">
              ···
            </span>
          </div>
        );
        continue;
      }

      // Check lists: bullet
      if (line.match(/^[-*]\s+(.*)/)) {
        const item = line.replace(/^[-*]\s+/, "");
        isOrderedList = false;
        listItems.push(item);
        continue;
      }

      // Check lists: numbered
      if (line.match(/^\d+\.\s+(.*)/)) {
        const item = line.replace(/^\d+\.\s+/, "");
        isOrderedList = true;
        listItems.push(item);
        continue;
      }

      // If we got here, flush any pending lists
      flushList(`list-${i}`);

      // Blank line
      if (!trimmed) {
        continue;
      }

      // Headings
      if (trimmed.startsWith("# ")) {
        elements.push(
          <h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-serif font-black text-[#111111] tracking-tight mt-12 mb-5 leading-[1.25]">
            {trimmed.replace("# ", "")}
          </h1>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-serif font-bold text-[#111111] tracking-tight mt-10 mb-4 leading-[1.3]">
            {trimmed.replace("## ", "")}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-serif font-bold text-[#1a1a1a] tracking-tight mt-8 mb-3 leading-[1.35]">
            {trimmed.replace("### ", "")}
          </h3>
        );
      } else if (trimmed.startsWith("> ")) {
        // Medium pull quote style
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-10 pl-6 border-l-4 border-zinc-950 py-1 text-xl sm:text-2xl font-serif italic text-zinc-900 leading-relaxed"
          >
            <span dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace("> ", "")) }} />
          </blockquote>
        );
      } else if (trimmed.startsWith("![")) {
        // Image: ![alt](url)
        const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
        if (match) {
          const [, alt, src] = match;
          elements.push(
            <figure key={`img-${i}`} className="my-10 rounded-2xl overflow-hidden border border-slate-200/80 shadow-md">
              <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[550px]" />
              {alt && <figcaption className="text-center text-xs text-slate-500 py-2.5 bg-slate-50/80 font-serif italic">{alt}</figcaption>}
            </figure>
          );
        }
      } else {
        // Standard Medium Paragraph: 20px, 1.8 line height, beautiful serif editorial feel
        elements.push(
          <p
            key={`p-${i}`}
            className="text-[19px] sm:text-[21px] leading-[1.85] text-[#292929] font-serif my-6 font-normal tracking-[-0.003em]"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      }
    }

    // Flush any trailing list
    flushList("trailing-list");

    return elements;
  };

  return <div className="w-full prose-editorial">{renderContent()}</div>;
}
