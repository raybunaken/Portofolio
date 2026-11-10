"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Shield, Menu, X, ArrowUpRight, FileText } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-zinc-200/80 shadow-xs py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo: Clean BoardUI Minimalist Typography */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold text-xl tracking-tight text-zinc-950 group-hover:text-zinc-600 transition-colors">
              dzaky<span className="text-zinc-400">.</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80">
              portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <Link
              href="/#projects"
              className="hover:text-zinc-950 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#articles"
              className="hover:text-zinc-950 transition-colors"
            >
              Articles & Case Studies
            </Link>
            <Link
              href="/#stack"
              className="hover:text-zinc-950 transition-colors"
            >
              Stack
            </Link>
            <Link
              href="/#contact"
              className="hover:text-zinc-950 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Actions: Resume, CMS Admin & Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://drive.google.com/file/d/1FMdt6bH_VMHjKaUQ3736MW0n2QSDb_CF/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/90 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>Resume</span>
            </a>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/90 transition-all"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-700" />
              <span>Admin CMS</span>
            </Link>

            <Link
              href="/#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-800 bg-zinc-100 border border-zinc-200"
            >
              CMS
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-zinc-700">
            <Link
              href="/#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-950"
            >
              Projects
            </Link>
            <Link
              href="/#articles"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-950"
            >
              Articles & Case Studies
            </Link>
            <Link
              href="/#stack"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-950"
            >
              Tech Stack
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-zinc-950"
            >
              Contact
            </Link>
            <div className="pt-4 border-t border-zinc-100 flex flex-col gap-3">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-zinc-800 bg-zinc-100 border border-zinc-200"
              >
                Admin CMS Studio
              </Link>
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 shadow-sm"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
