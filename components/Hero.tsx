"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  BrainCircuit,
  Terminal,
  Activity,
  BarChart3,
  GitCommit,
  Radio,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, KaggleIcon } from "@/components/BrandIcons";
import { Profile, Project } from "@/lib/types";

interface HeroProps {
  profile: Profile;
  projects?: Project[];
}

export default function Hero({ profile, projects = [] }: HeroProps) {
  return (
    <section className="relative min-h-[960px] lg:min-h-[1020px] xl:min-h-[1060px] w-full pt-28 pb-20 overflow-hidden bg-dot-grid flex items-center justify-center">
      {/* BoardUI Clean Radial Gradient Top Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_70%)] pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 8 SURROUNDING DATA CARDS (BOARDUI HIGH-DENSITY DASHBOARD HUD) */}
      {/* ========================================================= */}

      {/* CARD 1: Upper-Left -> Dzaky Developer HUD & Telemetry */}
      <div className="hidden lg:block absolute left-2 xl:left-8 2xl:left-14 top-[11%] xl:top-[12%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-1">
        <div className="w-72 glass-card rounded-2xl p-4 shadow-xs border border-zinc-200/90 -rotate-2 hover:rotate-0 transition-transform bg-white/95 backdrop-blur-md">
          {/* Profile header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-12 h-12 rounded-xl object-cover ring-1 ring-zinc-200"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-zinc-950 text-sm truncate">{profile.name}</h3>
              <p className="text-[11px] text-zinc-500 font-medium truncate">{profile.role}</p>
            </div>
          </div>

          {/* BoardUI Activity Heat-Strip Widget */}
          <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70 mb-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1.5">
              <span className="flex items-center gap-1">
                <GitCommit className="w-3 h-3 text-zinc-400" />
                <span>Sprint Commits</span>
              </span>
              <span className="text-emerald-700 font-semibold">99.2% SLA</span>
            </div>
            {/* 14-day commit activity block visualization */}
            <div className="grid grid-cols-7 gap-1">
              {[8, 12, 15, 6, 18, 14, 20, 9, 16, 22, 11, 19, 25, 17].map((count, idx) => (
                <div
                  key={idx}
                  title={`${count} commits`}
                  className={`h-3 rounded-xs transition-colors ${
                    count > 20
                      ? "bg-zinc-900"
                      : count > 15
                      ? "bg-emerald-600"
                      : count > 10
                      ? "bg-emerald-500"
                      : "bg-emerald-400/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Social and Action */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-600 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-600 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              {profile.kaggle && (
                <a
                  href={profile.kaggle}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-600 transition-colors"
                  title="Kaggle Profile"
                >
                  <KaggleIcon className="w-3.5 h-3.5" />
                </a>
              )}
              <a
                href={`mailto:${profile.email}`}
                className="w-7 h-7 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white flex items-center justify-center text-zinc-600 transition-colors"
                title="Email"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>

            <Link
              href="/project/skillsy-ai-career-analytics"
              className="px-2.5 py-1 rounded-lg bg-zinc-950 text-white font-medium text-[11px] hover:bg-zinc-800 transition-all flex items-center gap-1"
            >
              <span>Skillsy AI</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* CARD 2: Middle-Left -> SIGAP Platform (Bank Indonesia Hackathon Top 480) */}
      <div className="hidden lg:block absolute -left-6 xl:left-2 2xl:left-6 top-[39%] xl:top-[37%] z-10 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-2">
        <Link
          href="/project/sigap-bank-indonesia-hackathon"
          className="block w-76 rounded-2xl p-4 shadow-xs text-zinc-900 bg-white border border-zinc-200/90 -rotate-5 hover:rotate-0 transition-transform group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200/80">
              BI Hackathon 2026
            </span>
            <span className="text-[10px] text-zinc-950 font-bold bg-zinc-100 px-2 py-0.5 rounded-md">
              Top 480 National
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-950 group-hover:text-zinc-600 transition-colors">
            SIGAP: Skill-Gap Analytics
          </h4>
          <p className="text-[11px] text-zinc-500 mb-3 line-clamp-1">
            Labor market demand clustering and curriculum matching
          </p>

          {/* BoardUI Horizontal Bar List Component */}
          <div className="space-y-2 p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-1">
                <span>Competency Match</span>
                <span className="font-semibold text-zinc-900">94.2%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <div className="w-[94.2%] h-full rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-1">
                <span>NLP Pipeline Precision</span>
                <span className="font-semibold text-zinc-900">89.5%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <div className="w-[89.5%] h-full rounded-full bg-zinc-800" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-1">
                <span>Clustering Latency</span>
                <span className="font-semibold text-zinc-900">&lt;240ms</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <div className="w-[78%] h-full rounded-full bg-zinc-600" />
              </div>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>Team Lead / National Semifinal</span>
            <span className="text-zinc-900 font-semibold group-hover:underline">Case Study &rarr;</span>
          </div>
        </Link>
      </div>

      {/* CARD 3: Lower-Left -> Mortgage Intelligence Hub & Area Chart Sparkline */}
      <div className="hidden lg:block absolute left-2 xl:left-8 2xl:left-14 bottom-[5%] xl:bottom-[6%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-3">
        <Link
          href="/project/mortgage-intelligence-hub"
          className="block w-80 glass-card rounded-2xl p-4 shadow-xs border border-zinc-200/90 rotate-2 hover:rotate-0 transition-transform group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
              99 Group (Rumah123)
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
              Production Pipeline
            </span>
          </div>

          <h4 className="text-sm font-bold text-zinc-950 group-hover:text-zinc-600 transition-colors">
            Mortgage Intelligence Hub
          </h4>

          {/* BoardUI Metric and SVG Area Sparkline Card */}
          <div className="my-2.5 p-3 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <div className="flex items-baseline justify-between mb-1">
              <div>
                <span className="text-2xl font-bold text-zinc-950 font-mono">~80%</span>
                <span className="text-[10px] text-zinc-500 font-medium ml-1.5">Error Reduction</span>
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-zinc-200">
                -80.4%
              </span>
            </div>

            {/* SVG Area Chart Sparkline */}
            <div className="w-full h-12 relative mt-1">
              <svg viewBox="0 0 240 60" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18181b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#18181b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,15 Q30,12 60,25 T120,38 T180,48 T240,54 L240,60 L0,60 Z"
                  fill="url(#sparklineGrad)"
                />
                <path
                  d="M0,15 Q30,12 60,25 T120,38 T180,48 T240,54"
                  fill="none"
                  stroke="#18181b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="240" cy="54" r="3" fill="#18181b" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-1 pt-1 border-t border-zinc-200/50">
              <span>Week 1 (Spreadsheets)</span>
              <span>Week 8 (Hub SSOT)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-zinc-500 font-medium">8,000+ Records Clustered</span>
            <span className="font-semibold text-zinc-950 group-hover:underline">View Pipeline &rarr;</span>
          </div>
        </Link>
      </div>

      {/* CARD 4: Bottom-Center -> RevOps & Telephony 3CX Audio Waveform Widget */}
      <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 bottom-[1.5%] xl:bottom-[2.5%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-1">
        <Link
          href="/project/revops-telephony-pipeline-automation"
          className="block w-96 glass-card rounded-2xl p-4 shadow-xs border border-zinc-200/90 group hover:border-zinc-300 transition-all bg-white/95"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-zinc-600 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>Sales Operations Telemetry</span>
            </span>
            <span className="text-[10px] font-mono font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
              3CX PBX Active
            </span>
          </div>

          {/* BoardUI Audio Waveform and CDR Frequency Bars */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70 mb-2">
            <div className="flex items-center justify-between text-[11px] mb-2 font-mono">
              <span className="text-zinc-800 font-semibold">Real-Time CDR Ingestion</span>
              <span className="text-emerald-700 font-semibold">240ms Latency</span>
            </div>

            {/* Waveform Equalizer Bars */}
            <div className="flex items-end gap-1 h-8 px-1">
              {[40, 65, 80, 50, 95, 70, 85, 60, 100, 75, 90, 55, 70, 85, 45, 60, 75, 90, 65, 50].map(
                (h, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-xs transition-all ${
                      idx % 3 === 0 ? "bg-zinc-900" : idx % 2 === 0 ? "bg-zinc-600" : "bg-zinc-400"
                    }`}
                  />
                )
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-zinc-600 font-mono">
            <span>12,450+ Call Records Audited</span>
            <span className="font-semibold text-zinc-950 group-hover:underline">Inspect Architecture &rarr;</span>
          </div>
        </Link>
      </div>

      {/* CARD 5: Upper-Right -> Skillsy AI (Alibaba Cloud AI Catalyst Cohort) */}
      <div className="hidden lg:block absolute right-2 xl:right-8 2xl:right-14 top-[11%] xl:top-[12%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-2">
        <Link
          href="/project/skillsy-ai-career-analytics"
          className="block w-76 glass-card rounded-2xl overflow-hidden shadow-xs border border-zinc-200/90 rotate-3 hover:rotate-0 transition-transform group cursor-pointer"
        >
          <div className="relative h-28 bg-zinc-950 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
              alt="Skillsy Preview"
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            <div className="absolute top-2.5 right-2.5">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-900/90 text-amber-300 border border-white/15 backdrop-blur-md">
                Alibaba Cloud AI
              </span>
            </div>
            <div className="absolute bottom-2.5 left-3.5 right-3.5 text-white">
              <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-300">
                Founder & Lead Dev
              </span>
              <h4 className="text-xs font-bold truncate">Skillsy (skillsy.my.id)</h4>
            </div>
          </div>

          {/* BoardUI Circular Radial Progress / Score Ring */}
          <div className="p-3.5 bg-white">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
                <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-zinc-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-zinc-950"
                    strokeDasharray="94.6, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-[10px] font-bold font-mono text-zinc-950">94.6%</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-zinc-950">Explainable Skill Score</p>
                <p className="text-[10px] text-zinc-500 truncate">Knowledge Base vs Black-Box</p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="text-zinc-500 text-[11px] font-mono">Cohort Top 480</span>
              <span className="font-semibold text-zinc-950 group-hover:underline flex items-center gap-1 text-[11px]">
                <span>Case Study</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* CARD 6: Middle-Right -> Indo-RoBERTa Aspect Sentiment Combo Chart */}
      <div className="hidden lg:block absolute -right-2 xl:right-6 2xl:right-10 top-[39%] xl:top-[37%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-3">
        <Link
          href="/project/aspect-based-sentiment-analysis"
          className="block w-72 glass-card rounded-2xl p-4 shadow-xs border border-zinc-200/90 -rotate-2 hover:rotate-0 transition-transform group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-950">Indo-RoBERTa ABSA</span>
            <span className="text-[10px] font-mono font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
              PyTorch NLP
            </span>
          </div>

          {/* BoardUI Categorical Sentiment Breakdown Bar */}
          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/70 mb-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-1.5">
              <span>Sentiment Distribution</span>
              <span className="font-semibold text-zinc-900">&gt;90% Time Saved</span>
            </div>

            {/* Segmented multi-color progress bar */}
            <div className="w-full h-2 rounded-full overflow-hidden flex bg-zinc-200">
              <div style={{ width: "82%" }} className="h-full bg-emerald-500" title="82% Positive" />
              <div style={{ width: "14%" }} className="h-full bg-zinc-500" title="14% Neutral" />
              <div style={{ width: "4%" }} className="h-full bg-rose-500" title="4% Negative" />
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 mt-1.5">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> 82% Pos
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 inline-block" /> 14% Neu
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" /> 4% Neg
              </span>
            </div>
          </div>

          <div className="p-2 bg-white rounded-lg border border-zinc-200/70 text-[10px] text-zinc-700 font-mono">
            [INFERENCE] 18ms | 8,000+ reviews
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>Selenium + Transformers</span>
            <span className="text-zinc-950 font-semibold group-hover:underline">Benchmarks &rarr;</span>
          </div>
        </Link>
      </div>

      {/* CARD 7: Lower-Right -> Sinta 4 Macroeconomic Scatter Trendline */}
      <div className="hidden lg:block absolute right-2 xl:right-8 2xl:right-14 bottom-[5%] xl:bottom-[6%] z-20 transition-all duration-300 hover:scale-105 hover:z-30 animate-float-1">
        <Link
          href="/project/macroeconomic-market-shift-analysis"
          className="block w-80 glass-card rounded-2xl p-4 shadow-xs border border-zinc-200/90 rotate-2 hover:rotate-0 transition-transform group cursor-pointer"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-zinc-950 text-white flex items-center justify-center font-bold text-xs">
                S4
              </div>
              <span className="text-xs font-bold text-zinc-950">Sinta 4 Journal</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
              Peer Reviewed
            </span>
          </div>

          <h4 className="text-xs font-bold text-zinc-950">Macroeconomic Market Shift Modeling</h4>
          <p className="text-[11px] text-zinc-500 line-clamp-1 mb-2">
            Fed interest rates transmission on tech equity valuations
          </p>

          {/* BoardUI Regression Scatter Plot Visualization */}
          <div className="p-2.5 bg-zinc-50 rounded-xl border border-zinc-200/70">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-1">
              <span>Quantitative Correlation</span>
              <span className="font-semibold text-zinc-900">R2 = 0.78</span>
            </div>

            {/* Regression SVG visualizer */}
            <div className="w-full h-10 relative">
              <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
                {/* Scatter Points */}
                <circle cx="20" cy="32" r="2" fill="#71717a" opacity="0.6" />
                <circle cx="45" cy="28" r="2" fill="#71717a" opacity="0.6" />
                <circle cx="70" cy="24" r="2.5" fill="#18181b" />
                <circle cx="95" cy="22" r="2" fill="#71717a" opacity="0.6" />
                <circle cx="120" cy="18" r="2.5" fill="#18181b" />
                <circle cx="150" cy="14" r="2" fill="#71717a" opacity="0.6" />
                <circle cx="180" cy="9" r="2.5" fill="#18181b" />
                {/* Linear Regression Trendline */}
                <line x1="10" y1="35" x2="190" y2="7" stroke="#18181b" strokeWidth="2" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Python Statsmodels</span>
            <span className="font-semibold text-zinc-950 group-hover:underline">Read Research &rarr;</span>
          </div>
        </Link>
      </div>

      {/* ========================================================= */}
      {/* CENTER HERO CONTENT (SURROUNDED ON ALL SIDES BY THE DATA CARDS) */}
      {/* ========================================================= */}
      <div className="relative z-30 max-w-2xl lg:max-w-3xl mx-auto px-4 text-center my-auto">
        {/* Big Bold Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.08] mb-6">
          AI Engineering & <br className="hidden sm:inline" />
          <span>
            Revenue Operations<span className="text-zinc-400">.</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mb-10 max-w-xl mx-auto">
          {profile.headline ||
            "Building explainable AI scoring systems, applied NLP pipelines, and data-driven revenue operations architectures that scale from zero to one."}
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#projects"
            className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <span>Explore 8 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#articles"
            className="px-6 py-3 rounded-xl text-sm font-medium text-zinc-800 bg-white hover:bg-zinc-50 border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-all cursor-pointer active:scale-[0.98]"
          >
            <span>Case Studies & Articles</span>
          </Link>

          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/90 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98]"
            >
              <FileText className="w-4 h-4 text-zinc-600" />
              <span>Resume (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE / TABLET DISPLAY: Grid of 8 Projects (shown below hero) */}
      {/* ========================================================= */}
      <div className="lg:hidden w-full max-w-lg mx-auto px-4 mt-12 space-y-4 z-20">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-200">
            Featured 8 Production Projects
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.slice(0, 8).map((proj, idx) => (
            <Link
              key={proj.id}
              href={`/project/${proj.slug}`}
              className="glass-card rounded-xl p-3.5 border border-zinc-200/80 flex items-center gap-3 hover:border-zinc-300 transition-colors"
            >
              <img
                src={proj.coverImage}
                alt={proj.title}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono font-medium text-zinc-500 block">
                  Project {idx + 1}
                </span>
                <h4 className="text-xs font-bold text-zinc-950 truncate">{proj.title}</h4>
                <p className="text-[11px] text-zinc-500 truncate">{proj.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
