import React from "react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-zinc-200/80 py-10 text-zinc-500 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & copyright: BoardUI Clean Minimalist Mark */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-zinc-950">
              dzaky<span className="text-zinc-400">.</span>
            </span>
            <span className="text-zinc-400 text-xs">• © {year} Dzaky Rayssa Buntoro. All rights reserved.</span>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs font-medium text-zinc-600">
            <Link href="/#projects" className="hover:text-zinc-950 transition-colors">
              Projects
            </Link>
            <Link href="/#articles" className="hover:text-zinc-950 transition-colors">
              Writings
            </Link>
            <Link href="/#stack" className="hover:text-zinc-950 transition-colors">
              Tech Stack
            </Link>
            <Link href="/admin" className="hover:text-zinc-950 transition-colors">
              Admin CMS
            </Link>
          </div>

          <div className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
            <span>Next.js 16 • Tailwind v4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
