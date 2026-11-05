export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string; // Markdown case study
  category: string; // e.g. "AI & Startup", "Data & RevOps", "Full-Stack"
  tags: string[]; // e.g. ["Python", "FastAPI", "Alibaba Cloud"]
  coverImage: string;
  gallery?: string[]; // Carousel images / screenshots
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  client?: string;
  year?: string;
  stats?: { label: string; value: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown / Medium text
  coverImage: string;
  gallery?: string[]; // Carousel images for article
  tags: string[];
  category: string;
  readTime: string;
  published: boolean;
  claps: number;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  avatar: string;
  statusBadge: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
  instagram?: string;
  resumeUrl?: string;
  stats: { label: string; value: string }[];
  featuredTech: { name: string; category: string; icon?: string }[];
}

export interface PortfolioDatabase {
  profile: Profile;
  projects: Project[];
  articles: Article[];
}
