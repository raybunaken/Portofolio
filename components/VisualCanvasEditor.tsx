"use client";

import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
  useState,
} from "react";
import { Bold, Italic, Heading1, Heading2, Quote, Code } from "lucide-react";

export interface VisualCanvasEditorRef {
  toggleHeading: (level: 1 | 2 | 3) => void;
  toggleQuote: () => void;
  insertDivider: () => void;
  insertCodeBlock: (lang?: string) => void;
  toggleBold: () => void;
  toggleItalic: () => void;
  toggleList: (ordered?: boolean) => void;
  focus: () => void;
  getMarkdown: () => string;
}

interface VisualCanvasEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  onActiveTagChange?: (tag: string) => void;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatInline(text: string): string {
  let formatted = escapeHtml(text);

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
}

function inlineToMarkdown(node: Node): string {
  let text = "";
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      text += child.textContent || "";
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      const tag = el.tagName.toLowerCase();
      if (tag === "strong" || tag === "b") {
        text += `**${inlineToMarkdown(el)}**`;
      } else if (tag === "em" || tag === "i") {
        text += `*${inlineToMarkdown(el)}*`;
      } else if (tag === "del" || tag === "s") {
        text += `~~${inlineToMarkdown(el)}~~`;
      } else if (tag === "code") {
        text += `\`${el.textContent || ""}\``;
      } else if (tag === "a") {
        const href = el.getAttribute("href") || "";
        text += `[${inlineToMarkdown(el)}](${href})`;
      } else if (tag === "br") {
        text += "\n";
      } else {
        text += inlineToMarkdown(el);
      }
    }
  }
  return text;
}

function renderCodeBlockHtml(code: string, lang: string): string {
  const safeLang = escapeHtml(lang || "python");
  const safeCode = escapeHtml(code);
  return `<div class="canvas-code-card my-8 rounded-2xl overflow-hidden border border-slate-800 bg-[#0d1117] shadow-xl not-prose select-none" data-type="code-block" data-lang="${safeLang}" contenteditable="false"><div class="canvas-code-header bg-[#161b22] px-4 py-2.5 text-xs font-mono text-slate-400 border-b border-slate-800 flex items-center justify-between"><div class="flex items-center gap-2"><span class="flex items-center gap-1.5"><span class="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block"></span><span class="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block"></span><span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block"></span></span><span class="ml-2 font-semibold text-slate-300 font-mono">${safeLang}</span></div><span class="text-[11px] text-slate-500 font-mono">editable snippet</span></div><pre class="canvas-code-pre p-5 overflow-x-auto text-[14px] font-mono text-emerald-400 leading-relaxed m-0"><code contenteditable="true" spellcheck="false" class="outline-none block select-text">${safeCode}</code></pre></div>`;
}

function renderDividerHtml(): string {
  return `<div class="canvas-divider my-12 text-center select-none py-1" data-type="divider" contenteditable="false"><span class="canvas-divider-dots text-2xl sm:text-3xl font-serif text-slate-400 tracking-[1.3em] font-light inline-block pl-[1.3em]">···</span></div>`;
}

export function markdownToHtml(md: string): string {
  if (!md || !md.trim()) return "<p><br></p>";

  const lines = md.split("\n");
  const htmlBlocks: string[] = [];
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];
  let codeLang = "python";
  let listItems: string[] = [];
  let isOrdered = false;

  const flushList = () => {
    if (listItems.length === 0) return;
    const tag = isOrdered ? "ol" : "ul";
    const itemsHtml = listItems
      .map((item) => `<li>${formatInline(item)}</li>`)
      .join("");
    htmlBlocks.push(`<${tag}>${itemsHtml}</${tag}>`);
    listItems = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block fences
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        const code = codeBlockLines.join("\n");
        htmlBlocks.push(renderCodeBlockHtml(code, codeLang));
        codeBlockLines = [];
        inCodeBlock = false;
        codeLang = "python";
      } else {
        flushList();
        inCodeBlock = true;
        codeLang = trimmed.replace("```", "").trim() || "python";
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Dividers: ---, ***, ___
    if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
      flushList();
      htmlBlocks.push(renderDividerHtml());
      continue;
    }

    // Bullet lists
    if (line.match(/^[-*]\s+(.*)/)) {
      const item = line.replace(/^[-*]\s+/, "");
      if (isOrdered) flushList();
      isOrdered = false;
      listItems.push(item);
      continue;
    }

    // Numbered lists
    if (line.match(/^\d+\.\s+(.*)/)) {
      const item = line.replace(/^\d+\.\s+/, "");
      if (!isOrdered) flushList();
      isOrdered = true;
      listItems.push(item);
      continue;
    }

    flushList();

    if (!trimmed) {
      continue;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      htmlBlocks.push(`<h1>${formatInline(trimmed.replace(/^#\s+/, ""))}</h1>`);
    } else if (trimmed.startsWith("## ")) {
      htmlBlocks.push(`<h2>${formatInline(trimmed.replace(/^##\s+/, ""))}</h2>`);
    } else if (trimmed.startsWith("### ")) {
      htmlBlocks.push(`<h3>${formatInline(trimmed.replace(/^###\s+/, ""))}</h3>`);
    } else if (trimmed.startsWith("> ")) {
      htmlBlocks.push(`<blockquote>${formatInline(trimmed.replace(/^>\s*/, ""))}</blockquote>`);
    } else {
      htmlBlocks.push(`<p>${formatInline(line)}</p>`);
    }
  }

  flushList();

  if (inCodeBlock && codeBlockLines.length > 0) {
    htmlBlocks.push(renderCodeBlockHtml(codeBlockLines.join("\n"), codeLang));
  }

  return htmlBlocks.length ? htmlBlocks.join("") : "<p><br></p>";
}

export function htmlToMarkdown(root: HTMLElement): string {
  const blocks: string[] = [];
  const children = Array.from(root.childNodes);

  for (const node of children) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) blocks.push(text);
      continue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const el = node as HTMLElement;
    const dataType = el.getAttribute("data-type");

    if (dataType === "divider" || el.tagName === "HR") {
      blocks.push("---");
      continue;
    }

    if (dataType === "code-block") {
      const lang = el.getAttribute("data-lang") || "python";
      const code =
        el.querySelector("code")?.textContent ??
        el.querySelector("pre")?.textContent ??
        "";
      blocks.push(`\`\`\`${lang}\n${code.replace(/\r\n/g, "\n").trimEnd()}\n\`\`\``);
      continue;
    }

    const tag = el.tagName.toLowerCase();

    if (tag === "h1") {
      const text = inlineToMarkdown(el).trim();
      if (text) blocks.push(`# ${text}`);
      continue;
    }

    if (tag === "h2") {
      const text = inlineToMarkdown(el).trim();
      if (text) blocks.push(`## ${text}`);
      continue;
    }

    if (tag === "h3") {
      const text = inlineToMarkdown(el).trim();
      if (text) blocks.push(`### ${text}`);
      continue;
    }

    if (tag === "blockquote") {
      const text = inlineToMarkdown(el).trim();
      if (text) blocks.push(`> ${text}`);
      continue;
    }

    if (tag === "pre") {
      const code = el.querySelector("code")?.textContent ?? el.textContent ?? "";
      blocks.push(`\`\`\`\n${code.replace(/\r\n/g, "\n").trimEnd()}\n\`\`\``);
      continue;
    }

    if (tag === "ul") {
      const lis = Array.from(el.querySelectorAll(":scope > li"));
      const items = lis.map((li) => `- ${inlineToMarkdown(li).trim()}`).join("\n");
      if (items) blocks.push(items);
      continue;
    }

    if (tag === "ol") {
      const lis = Array.from(el.querySelectorAll(":scope > li"));
      const items = lis
        .map((li, idx) => `${idx + 1}. ${inlineToMarkdown(li).trim()}`)
        .join("\n");
      if (items) blocks.push(items);
      continue;
    }

    if (tag === "p" || tag === "div") {
      const innerText = inlineToMarkdown(el).trim();
      if (innerText) {
        blocks.push(innerText);
      }
      continue;
    }
  }

  return blocks.join("\n\n");
}

const VisualCanvasEditor = forwardRef<VisualCanvasEditorRef, VisualCanvasEditorProps>(
  (
    {
      value,
      onChange,
      placeholder = "Write your story here... Tap H1, H2, Quote, or type '# ' to format visually.",
      className = "",
      minHeight = "450px",
      onActiveTagChange,
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalUpdate = useRef(false);
    const lastEmittedValue = useRef(value);
    const [bubblePos, setBubblePos] = useState<{ top: number; left: number } | null>(null);
    const [activeTag, setActiveTag] = useState<string>("p");

    // Initial load and external value synchronization
    useEffect(() => {
      if (!editorRef.current) return;
      if (isInternalUpdate.current) {
        isInternalUpdate.current = false;
        return;
      }
      // If external value changed noticeably, parse to HTML
      if (value !== lastEmittedValue.current) {
        editorRef.current.innerHTML = markdownToHtml(value);
        lastEmittedValue.current = value;
      }
    }, [value]);

    // Initial mount hydration
    useEffect(() => {
      if (editorRef.current && !editorRef.current.innerHTML.trim()) {
        editorRef.current.innerHTML = markdownToHtml(value);
        lastEmittedValue.current = value;
      }
    }, []);

    const emitChange = useCallback(() => {
      if (!editorRef.current) return;
      const md = htmlToMarkdown(editorRef.current);
      lastEmittedValue.current = md;
      isInternalUpdate.current = true;
      onChange(md);
    }, [onChange]);

    // Locate active top-level block inside editor safely
    const getActiveBlock = useCallback((): HTMLElement | null => {
      if (!editorRef.current) return null;
      const sel = window.getSelection();
      if (!sel || !sel.rangeCount) return null;

      let node: Node | null = sel.getRangeAt(0).startContainer;
      if (node === editorRef.current) {
        return (editorRef.current.firstElementChild as HTMLElement) || null;
      }
      while (node && node.parentNode && node.parentNode !== editorRef.current) {
        node = node.parentNode;
      }
      if (node && node.parentNode === editorRef.current && node.nodeType === Node.ELEMENT_NODE) {
        return node as HTMLElement;
      }
      return null;
    }, []);

    // Update active tag detection for toolbar highlight and parent notify
    const updateActiveTag = useCallback(() => {
      const active = getActiveBlock();
      const tag = active ? active.tagName.toLowerCase() : "p";
      setActiveTag(tag);
      if (onActiveTagChange) {
        onActiveTagChange(tag);
      }
    }, [getActiveBlock, onActiveTagChange]);

    // Update floating selection bubble position
    const updateFloatingBubble = useCallback(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !editorRef.current) {
        setBubblePos(null);
        return;
      }

      if (!editorRef.current.contains(sel.anchorNode)) {
        setBubblePos(null);
        return;
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      if (rect.width > 0) {
        setBubblePos({
          top: Math.max(0, rect.top - editorRect.top - 48),
          left: rect.left - editorRect.left + rect.width / 2,
        });
      } else {
        setBubblePos(null);
      }
    }, []);

    const handleSelectionChange = useCallback(() => {
      updateActiveTag();
      updateFloatingBubble();
    }, [updateActiveTag, updateFloatingBubble]);

    // Set cursor to end of given element
    const moveCursorToEnd = (element: HTMLElement) => {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(element);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    };

    // Replace block with a new tag (e.g. H1, H2, Blockquote, P)
    const replaceBlockTag = (targetTag: "h1" | "h2" | "h3" | "blockquote" | "p") => {
      if (!editorRef.current) return;
      const active = getActiveBlock();
      if (!active) {
        const newEl = document.createElement(targetTag);
        newEl.innerHTML = "<br>";
        editorRef.current.appendChild(newEl);
        moveCursorToEnd(newEl);
        emitChange();
        updateActiveTag();
        return;
      }

      // If active block is already the target tag, toggle back to paragraph
      const currentTag = active.tagName.toLowerCase();
      const nextTag = currentTag === targetTag ? "p" : targetTag;
      const replacement = document.createElement(nextTag);
      replacement.innerHTML = active.innerHTML || "<br>";

      active.replaceWith(replacement);
      moveCursorToEnd(replacement);
      emitChange();
      updateActiveTag();
    };

    // Imperative ref methods for toolbar actions
    useImperativeHandle(ref, () => ({
      toggleHeading: (level: 1 | 2 | 3) => {
        const tag = level === 1 ? "h1" : level === 2 ? "h2" : "h3";
        replaceBlockTag(tag);
      },
      toggleQuote: () => {
        replaceBlockTag("blockquote");
      },
      insertDivider: () => {
        if (!editorRef.current) return;
        const active = getActiveBlock();
        const divider = document.createElement("div");
        divider.className = "canvas-divider my-12 text-center select-none py-1";
        divider.setAttribute("data-type", "divider");
        divider.setAttribute("contenteditable", "false");
        divider.innerHTML = `<span class="canvas-divider-dots text-2xl sm:text-3xl font-serif text-slate-400 tracking-[1.3em] font-light inline-block pl-[1.3em]">···</span>`;

        const nextP = document.createElement("p");
        nextP.innerHTML = "<br>";

        if (active) {
          if (!active.textContent?.trim()) {
            active.replaceWith(divider);
          } else {
            active.after(divider);
          }
        } else {
          editorRef.current.appendChild(divider);
        }

        divider.after(nextP);
        moveCursorToEnd(nextP);
        emitChange();
        updateActiveTag();
      },
      insertCodeBlock: (lang = "python") => {
        if (!editorRef.current) return;
        const active = getActiveBlock();
        const codeCard = document.createElement("div");
        codeCard.innerHTML = renderCodeBlockHtml("# Write code snippet here...", lang);
        const cardNode = codeCard.firstElementChild as HTMLElement;

        const nextP = document.createElement("p");
        nextP.innerHTML = "<br>";

        if (active) {
          if (!active.textContent?.trim()) {
            active.replaceWith(cardNode);
          } else {
            active.after(cardNode);
          }
        } else {
          editorRef.current.appendChild(cardNode);
        }

        cardNode.after(nextP);
        const codeElement = cardNode.querySelector("code");
        if (codeElement) {
          moveCursorToEnd(codeElement);
        } else {
          moveCursorToEnd(nextP);
        }
        emitChange();
        updateActiveTag();
      },
      toggleBold: () => {
        document.execCommand("bold", false);
        emitChange();
      },
      toggleItalic: () => {
        document.execCommand("italic", false);
        emitChange();
      },
      toggleList: () => {
        document.execCommand("insertUnorderedList", false);
        emitChange();
      },
      focus: () => {
        editorRef.current?.focus();
      },
      getMarkdown: () => {
        if (!editorRef.current) return value;
        return htmlToMarkdown(editorRef.current);
      },
    }));

    // Smart Markdown keyboard shortcuts on typing
    const handleInput = () => {
      if (!editorRef.current) return;

      const active = getActiveBlock();
      if (active && active.tagName.toLowerCase() === "p") {
        const text = active.textContent || "";

        // Transform '# ' to H1
        if (text.startsWith("# ")) {
          const contentText = text.replace(/^#\s+/, "");
          const h1 = document.createElement("h1");
          h1.innerHTML = contentText ? formatInline(contentText) : "<br>";
          active.replaceWith(h1);
          moveCursorToEnd(h1);
          emitChange();
          updateActiveTag();
          return;
        }

        // Transform '## ' to H2
        if (text.startsWith("## ")) {
          const contentText = text.replace(/^##\s+/, "");
          const h2 = document.createElement("h2");
          h2.innerHTML = contentText ? formatInline(contentText) : "<br>";
          active.replaceWith(h2);
          moveCursorToEnd(h2);
          emitChange();
          updateActiveTag();
          return;
        }

        // Transform '### ' to H3
        if (text.startsWith("### ")) {
          const contentText = text.replace(/^###\s+/, "");
          const h3 = document.createElement("h3");
          h3.innerHTML = contentText ? formatInline(contentText) : "<br>";
          active.replaceWith(h3);
          moveCursorToEnd(h3);
          emitChange();
          updateActiveTag();
          return;
        }

        // Transform '> ' to Quote
        if (text.startsWith("> ")) {
          const contentText = text.replace(/^>\s+/, "");
          const bq = document.createElement("blockquote");
          bq.innerHTML = contentText ? formatInline(contentText) : "<br>";
          active.replaceWith(bq);
          moveCursorToEnd(bq);
          emitChange();
          updateActiveTag();
          return;
        }

        // Transform '---' to Divider
        if (text === "---") {
          const divider = document.createElement("div");
          divider.className = "canvas-divider my-12 text-center select-none py-1";
          divider.setAttribute("data-type", "divider");
          divider.setAttribute("contenteditable", "false");
          divider.innerHTML = `<span class="canvas-divider-dots text-2xl sm:text-3xl font-serif text-slate-400 tracking-[1.3em] font-light inline-block pl-[1.3em]">···</span>`;
          const nextP = document.createElement("p");
          nextP.innerHTML = "<br>";
          active.replaceWith(divider);
          divider.after(nextP);
          moveCursorToEnd(nextP);
          emitChange();
          updateActiveTag();
          return;
        }

        // Transform '```' to Code Block
        if (text.startsWith("```")) {
          const lang = text.replace("```", "").trim() || "python";
          const codeCard = document.createElement("div");
          codeCard.innerHTML = renderCodeBlockHtml("# Type your code snippet...", lang);
          const cardNode = codeCard.firstElementChild as HTMLElement;
          const nextP = document.createElement("p");
          nextP.innerHTML = "<br>";
          active.replaceWith(cardNode);
          cardNode.after(nextP);
          const codeEl = cardNode.querySelector("code");
          if (codeEl) moveCursorToEnd(codeEl);
          emitChange();
          updateActiveTag();
          return;
        }
      }

      emitChange();
      updateActiveTag();
    };

    // Keyboard behavior (Enter in H1/H2 creates paragraph, Backspace on divider deletes it)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        const active = getActiveBlock();
        if (active) {
          const tag = active.tagName.toLowerCase();
          // If in heading or quote, pressing Enter creates a clean paragraph below it
          if (tag === "h1" || tag === "h2" || tag === "h3" || tag === "blockquote") {
            const sel = window.getSelection();
            if (sel && sel.isCollapsed) {
              e.preventDefault();
              const nextP = document.createElement("p");
              nextP.innerHTML = "<br>";
              active.after(nextP);
              moveCursorToEnd(nextP);
              emitChange();
              updateActiveTag();
              return;
            }
          }
        }
      }

      // Allow backspace to remove a divider cleanly
      if (e.key === "Backspace") {
        const active = getActiveBlock();
        if (active && active.previousElementSibling) {
          const prev = active.previousElementSibling as HTMLElement;
          if (
            prev.getAttribute("data-type") === "divider" &&
            (!active.textContent || !active.textContent.trim())
          ) {
            e.preventDefault();
            prev.remove();
            emitChange();
            updateActiveTag();
            return;
          }
        }
      }
    };

    return (
      <div className="relative w-full">
        {/* Floating Mini-Toolbar on Selection (Medium / Notion Style) */}
        {bubblePos && (
          <div
            style={{ top: bubblePos.top, left: bubblePos.left }}
            className="absolute -translate-x-1/2 -top-12 z-40 flex items-center gap-0.5 px-2 py-1 rounded-xl bg-zinc-950 text-white shadow-2xl border border-zinc-800 transition-all select-none"
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                document.execCommand("bold", false);
                emitChange();
              }}
              className="p-1 hover:bg-zinc-800 rounded text-xs text-zinc-300 hover:text-white transition-colors"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                document.execCommand("italic", false);
                emitChange();
              }}
              className="p-1 hover:bg-zinc-800 rounded text-xs text-zinc-300 hover:text-white transition-colors"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-3.5 bg-zinc-800 mx-0.5" />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                replaceBlockTag("h1");
              }}
              className={`px-1.5 py-0.5 rounded text-xs font-serif font-bold transition-colors ${
                activeTag === "h1" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              title="Heading 1"
            >
              H1
            </button>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                replaceBlockTag("h2");
              }}
              className={`px-1.5 py-0.5 rounded text-xs font-serif font-bold transition-colors ${
                activeTag === "h2" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              title="Heading 2"
            >
              H2
            </button>
            <span className="w-px h-3.5 bg-zinc-800 mx-0.5" />
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                replaceBlockTag("blockquote");
              }}
              className={`p-1 rounded text-xs transition-colors ${
                activeTag === "blockquote" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:text-white hover:bg-zinc-800"
              }`}
              title="Pull Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onKeyUp={handleSelectionChange}
          onMouseUp={handleSelectionChange}
          data-placeholder={placeholder}
          style={{ minHeight }}
          className={`visual-medium-canvas w-full outline-none focus:outline-none bg-transparent ${className}`}
        />
      </div>
    );
  }
);

VisualCanvasEditor.displayName = "VisualCanvasEditor";

export default VisualCanvasEditor;