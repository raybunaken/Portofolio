import fs from "fs/promises";
import path from "path";
import { PortfolioDatabase, Project, Article, Profile } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portfolio-db.json");

export const initialProjects: Project[] = [
  {
    id: "proj-1",
    slug: "yapp-creator-platform",
    title: "Yapp - All-in-One Creator & Monetization Platform",
    summary: "A modern creator hub enabling digital downloads, tips via QRIS, live overlay alerts, and micro-storefronts with zero-fee onboarding.",
    content: `# Yapp - The Next-Gen Monetization Hub for Digital Creators

Yapp was engineered to solve one fundamental friction in the Southeast Asian creator economy: fragmented payment methods and complicated storefront setup.

## The Challenge
Creators were juggling multiple tools: link-in-bio services, manual WhatsApp bank transfers, separate tip jars, and third-party digital product delivery platforms.

## The Solution
We unified everything into a single, cohesive dashboard:
- **Instant QRIS & E-Wallet integration** for seamless checkout in seconds.
- **Dynamic digital product downloads** with encrypted time-limited links.
- **Customizable Creator Storefronts** with personalized themes, biolinks, and live tip feeds.

### Key Architecture Decisions
1. **Next.js App Router** with Partial Prerendering for sub-50ms landing page loads.
2. **PostgreSQL & Redis** caching for instant live alert streaming.
3. **Tailwind CSS & Framer Motion** for fluid, buttery-smooth interactions.

\`\`\`typescript
export async function createCreatorInvoice(creatorId: string, amount: number) {
  const invoice = await paymentGateway.createStaticQR({
    merchantId: creatorId,
    amount,
    currency: "IDR",
    expiryMinutes: 15,
  });
  return invoice;
}
\`\`\`

## Results & Impact
Over 1,200 active creators joined within the first 6 weeks of release, handling more than IDR 450,000,000 in creator tips and digital template sales with 99.98% uptime.`,
    category: "Full-Stack",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS", "QRIS API", "Prisma"],
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://example.com/demo-yapp",
    githubUrl: "https://github.com/dzakybuntoro/yapp-platform",
    featured: true,
    client: "Fintech & Creator Startup",
    year: "2025",
    stats: [
      { label: "Active Creators", value: "1,200+" },
      { label: "Volume", value: "Rp 450M+" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-2",
    slug: "notion-template-hub",
    title: "Notion Master Studio - Digital Product Storefront",
    summary: "High-converting digital template marketplace with instant checkout, PDF invoice generator, and automated Notion workspace duplication.",
    content: `# Notion Master Studio - Monetizing Digital Productivity

Notion Master Studio was built to allow digital creators to package, protect, and sell Notion workspaces and digital assets with automated delivery.

## Key Features
- Dynamic Notion workspace duplication via Notion Official API.
- Instant checkout supporting QRIS, Credit Cards, and E-Wallets.
- Live preview modals with interactive template sandboxes.`,
    category: "Full-Stack",
    tags: ["Next.js", "Stripe / Midtrans", "Tailwind CSS", "PostgreSQL"],
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://notiontemplates.example.com",
    githubUrl: "https://github.com/dzakybuntoro/notion-storefront",
    featured: true,
    client: "Digital Products Studio",
    year: "2025",
    stats: [
      { label: "Unit Price", value: "IDR 199,000" },
      { label: "Templates Sold", value: "3,800+" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-3",
    slug: "pulse-ai-workspace",
    title: "PulseAI - Autonomous Workflow & Voice Assistant Dashboard",
    summary: "AI-powered collaborative workspace combining conversational LLM pipelines, audio transcription, and interactive task canvas.",
    content: `# PulseAI - Autonomous Agent & Voice Interaction Canvas

PulseAI bridges the gap between natural language prompts and executable multi-step operations.

## Overview
PulseAI allows teams to connect their knowledge bases, trigger complex background workflows, and interact using natural voice prompts with real-time audio visualization.

## Highlights
- **Realtime WebRTC Audio Streaming** with under 180ms latency.
- **Interactive Markdown & Artifact Canvas** to preview code, graphs, and wireframes on the fly.
- **Vector search retrieval** powered by pgvector for contextual document querying.`,
    category: "AI & ML",
    tags: ["React 19", "FastAPI", "WebRTC", "OpenAI API", "WebSockets"],
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://pulseai.example.com",
    githubUrl: "https://github.com/dzakybuntoro/pulse-ai",
    featured: true,
    client: "AI Venture Lab",
    year: "2025",
    stats: [
      { label: "Latency", value: "<180ms" },
      { label: "Accuracy", value: "98.7%" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-4",
    slug: "charity-connect-hub",
    title: "CharityConnect - Transparent Crowdfunding Platform",
    summary: "Empowering non-profit campaigns with real-time donation progress bars, audited disbursement logs, and zero-fee donor tipping.",
    content: `# CharityConnect - Trust & Transparency in Social Crowdfunding

CharityConnect was developed to rebuild donor trust through verifiable transaction ledgers and real-time impact updates for causes such as Orphan Care, Disaster Relief, and Community Education.

## Architecture
- Built on Next.js App Router for dynamic campaign landing pages.
- Real-time donation counter via Server-Sent Events (SSE).
- Integrated QRIS payment with automated donor receipt generation.`,
    category: "Full-Stack",
    tags: ["Next.js", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    coverImage: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://charityconnect.example.com",
    githubUrl: "https://github.com/dzakybuntoro/charity-connect",
    featured: true,
    client: "Social Impact Non-Profit",
    year: "2024",
    stats: [
      { label: "Donations", value: "Rp 850M" },
      { label: "Campaigns", value: "64+" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-5",
    slug: "qris-paylink-gateway",
    title: "QRIS Paylink Gateway & Real-time Tipping Engine",
    summary: "High-throughput fintech microservice enabling sub-second dynamic QR code generation, instant webhook alerts, and automated settlement.",
    content: `# QRIS Paylink Gateway - Real-Time Fintech Engine

A robust payment microservice handling thousands of concurrent creator tips and micro-transactions across all Indonesian banks and e-wallets.

## Highlights
- Sub-500ms dynamic QRIS string synthesis and SVG rendering.
- Resilient webhook delivery with exponential backoff and replay defense.
- Direct integration with BCA, Mandiri, GoPay, OVO, and ShopeePay.`,
    category: "Fintech",
    tags: ["Node.js", "TypeScript", "Redis", "Docker", "REST API"],
    coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://paylink.example.com",
    githubUrl: "https://github.com/dzakybuntoro/qris-paylink",
    featured: true,
    client: "Fintech Core Infrastructure",
    year: "2025",
    stats: [
      { label: "Transactions", value: "50k+/mo" },
      { label: "Success Rate", value: "99.98%" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-6",
    slug: "zenith-design-system",
    title: "Zenith Design System & Component Studio",
    summary: "Accessible, enterprise-grade UI library with 45+ atomic components, dark mode tokens, and automated Storybook documentation.",
    content: `# Zenith - Design System Architecture for High-Velocity Teams

Zenith is a multi-brand design system built from the ground up to solve inconsistency across 6 enterprise web products.

## Engineering Principles
- **Radix UI Primitives** for full WAI-ARIA compliant accessibility.
- **Zero Runtime CSS Tokens** using Tailwind CSS v4 design tokens.
- **Strict TypeScript types** preventing invalid prop compositions.`,
    category: "Frontend",
    tags: ["TypeScript", "Radix UI", "Tailwind v4", "Storybook", "NPM"],
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://zenith-ui.example.com",
    githubUrl: "https://github.com/dzakybuntoro/zenith-ui",
    featured: true,
    client: "Open Source Project",
    year: "2024",
    stats: [
      { label: "Components", value: "45+" },
      { label: "Downloads", value: "15k+" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-7",
    slug: "nova-commerce-engine",
    title: "Nova Commerce - Headless Storefront & Sub-30ms Search",
    summary: "High-performance headless e-commerce storefront with instant faceted search, edge caching, and 100/100 Google Lighthouse scores.",
    content: `# Nova Commerce - The Sub-30ms Headless E-Commerce Experience

Built for high-traffic retail brands needing instantaneous product discovery and smooth mobile checkout.

## Key Technical Achievements
- Instant search index sync using Algolia and edge worker caching.
- 100/100 Performance on Google Lighthouse across all Core Web Vitals.
- Optimistic shopping bag state with zero layout shifts.`,
    category: "Full-Stack",
    tags: ["Next.js 16", "Algolia", "Tailwind CSS", "Shopify API"],
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://novacommerce.example.com",
    githubUrl: "https://github.com/dzakybuntoro/nova-commerce",
    featured: true,
    client: "Retail Enterprise",
    year: "2025",
    stats: [
      { label: "Lighthouse", value: "100/100" },
      { label: "TTFB", value: "28ms" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "proj-8",
    slug: "zen-markdown-cms",
    title: "ZenCMS - Headless Medium-Style Publishing Engine",
    summary: "Lightweight, distraction-free writing studio featuring live preview, auto-saving drafts, and media asset manager.",
    content: `# ZenCMS - Modern Content Management for Modern Creators

ZenCMS was created for developers and writers who want the elegant, focused writing flow of Medium without the paywalls or database overhead.

## Key Features
- **Medium-inspired inline editing** with instantaneous markdown parsing.
- **Atomic file persistence** and offline-first storage safety.
- **Optimized responsive images** with auto-generated Blurhash placeholders.`,
    category: "Full-Stack",
    tags: ["Next.js 16", "React 19", "Markdown", "Tailwind CSS"],
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    demoUrl: "https://zencms.example.com",
    githubUrl: "https://github.com/dzakybuntoro/zencms",
    featured: true,
    client: "Personal Project",
    year: "2025",
    stats: [
      { label: "Bundle Size", value: "42kb" },
      { label: "Active Writers", value: "850+" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const initialProfile: Profile = {
  name: "Dzaky Rayssa Buntoro",
  role: "Full-Stack Engineer & Product Builder",
  headline: "Building high-performance web applications, creator platforms & scalable cloud architectures.",
  bio: "Passionate software engineer focused on crafting pixel-perfect interfaces, robust API ecosystems, and intuitive digital experiences. Dedicated to writing clean, maintainable code and solving real-world challenges through technology.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  statusBadge: "✨ 1000+ Hours of Code • Available for Hire",
  location: "Jakarta, Indonesia",
  email: "dzakybuntoro@example.com",
  github: "https://github.com/dzakybuntoro",
  linkedin: "https://linkedin.com/in/dzakybuntoro",
  twitter: "https://x.com/dzakybuntoro",
  instagram: "https://instagram.com/dzakybuntoro",
  resumeUrl: "#",
  stats: [
    { label: "Production Apps", value: "18+" },
    { label: "GitHub Commits", value: "3,100+" },
    { label: "Code Reviews Done", value: "240+" },
    { label: "Client Satisfaction", value: "100%" }
  ],
  featuredTech: [
    { name: "Next.js 16", category: "Framework" },
    { name: "React 19", category: "Frontend" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS v4", category: "Styling" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "SQLite", category: "Database" },
    { name: "Prisma / Drizzle", category: "ORM" },
    { name: "Docker", category: "DevOps" },
    { name: "QRIS & Fintech API", category: "API" }
  ]
};

export const initialArticles: Article[] = [
  {
    id: "art-1",
    slug: "architecting-nextjs-fullstack-cms",
    title: "How I Built a Medium-Style Dynamic CMS with Zero External Database Configuration",
    excerpt: "A deep dive into building an ultra-fast, local-first portfolio architecture using Next.js App Router, atomic file persistence, and Tailwind CSS.",
    content: `# How I Built a Medium-Style Dynamic CMS with Zero External Database Configuration

When building a personal portfolio, developers often face a classic dilemma:
- **Hardcoding everything in code**: Fast to start, but painful whenever you want to post a new project or article late at night.
- **Setting up Postgres / MongoDB / Supabase**: High overhead, requiring environment variables, migrations, monthly hosting limits, and external dependencies.

Today, we explore an elegant middle ground: **a local-first atomic persistence layer** combined with Next.js App Router.

## 1. Why Medium's UX is the Gold Standard for Writing
Medium succeeded because of its **frictionless canvas**:
1. You click, you type.
2. Headings and lists format naturally.
3. Live previews render exactly how readers will experience it.

We replicated this in our portfolio using lightweight React state and instant markdown compilation.

## 2. Safe Atomic File Persistence
Instead of raw file writes that can corrupt during concurrent requests, we write to an atomic buffer and swap descriptors safely.

\`\`\`typescript
import fs from 'fs/promises';

export async function saveDatabase(data: PortfolioDatabase) {
  const tempPath = \`\${DB_FILE}.tmp\`;
  await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempPath, DB_FILE);
}
\`\`\`

## 3. The Result
We get lightning-fast local development, zero cost cloud deployment, and a full CMS dashboard where we can upload projects and write case studies on the go!`,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Web Dev", "Architecture", "CMS"],
    category: "Engineering",
    readTime: "5 min read",
    published: true,
    claps: 142,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "art-2",
    slug: "tailwind-v4-performance-guide",
    title: "Mastering Modern CSS: From Heavy Frameworks to Fluid Tailwind Micro-Interactions",
    excerpt: "Explaining how subtle dot-grids, glassmorphism cards, and spring-physics hover animations create that irresistible SaaS landing page look.",
    content: `# Mastering Modern CSS: From Heavy Frameworks to Fluid Tailwind Micro-Interactions

Notice how apps like Linear, Raycast, and Yapp feel distinctly premium? It is rarely about flashy 3D effects; it is about **micro-details**.

## 1. The Subtle Dot Grid
A pure white canvas can feel flat and unfinished. A delicate 20px radial dot grid gives visual depth:

\`\`\`css
.dot-grid {
  background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
  background-size: 20px 20px;
}
\`\`\`

## 2. Layered Shadows Over Heavy Borders
Instead of stark 1px black borders, modern UI uses subtle borders combined with multi-stop box shadows:

\`\`\`css
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 25px -5px rgba(0, 0, 0, 0.04);
\`\`\`

## 3. Pill Badges and High-Contrast CTAs
Notice how the primary button in Yapp jumps out. It pairs high-saturation indigo with rounded-full geometry, immediately guiding user focus.`,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["CSS", "Design Systems", "UI/UX", "Tailwind"],
    category: "Design",
    readTime: "4 min read",
    published: true,
    claps: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const initialDatabase: PortfolioDatabase = {
  profile: initialProfile,
  projects: initialProjects,
  articles: initialArticles
};

async function ensureDbExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, JSON.stringify(initialDatabase, null, 2), "utf-8");
  }
}

export async function getDatabase(): Promise<PortfolioDatabase> {
  await ensureDbExists();
  const raw = await fs.readFile(DB_FILE, "utf-8");
  try {
    return JSON.parse(raw) as PortfolioDatabase;
  } catch {
    return initialDatabase;
  }
}

export async function saveDatabase(data: PortfolioDatabase): Promise<void> {
  await ensureDbExists();
  const tempFile = path.join(DATA_DIR, `db-${Date.now()}.tmp`);
  await fs.writeFile(tempFile, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempFile, DB_FILE);
}

export async function getProjects(): Promise<Project[]> {
  const db = await getDatabase();
  return db.projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const db = await getDatabase();
  return db.projects.find((p) => p.slug === slug || p.id === slug) || null;
}

export async function saveProject(project: Partial<Project> & { title: string }): Promise<Project> {
  const db = await getDatabase();
  const now = new Date().toISOString();
  
  if (project.id) {
    const index = db.projects.findIndex((p) => p.id === project.id);
    if (index !== -1) {
      const updated: Project = {
        ...db.projects[index],
        ...project,
        updatedAt: now,
      } as Project;
      db.projects[index] = updated;
      await saveDatabase(db);
      return updated;
    }
  }

  const id = `proj-${Date.now()}`;
  const slug = project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newProject: Project = {
    id,
    slug,
    title: project.title,
    summary: project.summary || "",
    content: project.content || "",
    category: project.category || "Full-Stack",
    tags: project.tags || ["Next.js", "TypeScript"],
    coverImage: project.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    gallery: project.gallery || [],
    demoUrl: project.demoUrl || "",
    githubUrl: project.githubUrl || "",
    featured: project.featured ?? true,
    client: project.client || "",
    year: project.year || new Date().getFullYear().toString(),
    stats: project.stats || [],
    createdAt: now,
    updatedAt: now,
  };

  db.projects.unshift(newProject);
  await saveDatabase(db);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLength = db.projects.length;
  db.projects = db.projects.filter((p) => p.id !== id);
  if (db.projects.length !== initialLength) {
    await saveDatabase(db);
    return true;
  }
  return false;
}

export async function getArticles(): Promise<Article[]> {
  const db = await getDatabase();
  return db.articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const db = await getDatabase();
  return db.articles.find((a) => a.slug === slug || a.id === slug) || null;
}

export async function saveArticle(article: Partial<Article> & { title: string }): Promise<Article> {
  const db = await getDatabase();
  const now = new Date().toISOString();

  if (article.id) {
    const index = db.articles.findIndex((a) => a.id === article.id);
    if (index !== -1) {
      const updated: Article = {
        ...db.articles[index],
        ...article,
        updatedAt: now,
      } as Article;
      db.articles[index] = updated;
      await saveDatabase(db);
      return updated;
    }
  }

  const id = `art-${Date.now()}`;
  const slug = article.slug || article.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const newArticle: Article = {
    id,
    slug,
    title: article.title,
    excerpt: article.excerpt || "",
    content: article.content || "",
    coverImage: article.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    gallery: article.gallery || [],
    tags: article.tags || ["Tech", "Engineering"],
    category: article.category || "Engineering",
    readTime: article.readTime || "4 min read",
    published: article.published ?? true,
    claps: article.claps || 0,
    createdAt: now,
    updatedAt: now,
  };

  db.articles.unshift(newArticle);
  await saveDatabase(db);
  return newArticle;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const db = await getDatabase();
  const initialLength = db.articles.length;
  db.articles = db.articles.filter((a) => a.id !== id);
  if (db.articles.length !== initialLength) {
    await saveDatabase(db);
    return true;
  }
  return false;
}

export async function incrementArticleClap(id: string): Promise<number> {
  const db = await getDatabase();
  const article = db.articles.find((a) => a.id === id || a.slug === id);
  if (article) {
    article.claps = (article.claps || 0) + 1;
    await saveDatabase(db);
    return article.claps;
  }
  return 0;
}

export async function getProfile(): Promise<Profile> {
  const db = await getDatabase();
  return db.profile;
}

export async function updateProfile(updates: Partial<Profile>): Promise<Profile> {
  const db = await getDatabase();
  db.profile = {
    ...db.profile,
    ...updates,
  };
  await saveDatabase(db);
  return db.profile;
}
