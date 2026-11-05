"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  BookOpen,
  Layers,
  User,
  LogOut,
  Sparkles,
  Check,
  AlertCircle,
  Eye,
  KeyRound
} from "lucide-react";
import { Project, Article, Profile } from "@/lib/types";

export default function AdminDashboard() {
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "articles" | "profile">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Check saved session on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("admin_key");
    if (savedKey) {
      verifyAndLoad(savedKey);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAndLoad = async (key: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: key }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_key", key);
        setPasscode(key);
        await loadAllData();
      } else {
        setAuthError(data.error || "Passcode salah");
        localStorage.removeItem("admin_key");
      }
    } catch {
      setAuthError("Gagal menghubungi server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");
    verifyAndLoad(passcode);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_key");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const loadAllData = async () => {
    try {
      const [projRes, artRes, profRes] = await Promise.all([
        fetch("/api/projects").then((r) => r.json()),
        fetch("/api/articles").then((r) => r.json()),
        fetch("/api/profile").then((r) => r.json()),
      ]);

      if (projRes.success) setProjects(projRes.data);
      if (artRes.success) setArticles(artRes.data);
      if (profRes.success) setProfile(profRes.data);
    } catch (err) {
      console.error("Error loading data", err);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (!confirm(`Hapus project "${title}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": passcode },
      });
      const data = await res.json();
      if (data.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(data.error || "Gagal menghapus project");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  const handleDeleteArticle = async (id: string, title: string) => {
    if (!confirm(`Hapus artikel "${title}"?`)) return;

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "DELETE",
        headers: { "x-admin-key": passcode },
      });
      const data = await res.json();
      if (data.success) {
        setArticles((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert(data.error || "Gagal menghapus artikel");
      }
    } catch {
      alert("Terjadi kesalahan saat menghapus");
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setSavingProfile(true);
    setProfileSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": passcode,
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.data);
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 3000);
      } else {
        alert(data.error || "Gagal menyimpan profile");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSavingProfile(false);
    }
  };

  // Login Screen if not authenticated
  if (!isAuthenticated && !loading) {
    return (
      <div className="min-h-screen bg-dot-grid flex items-center justify-center p-4">
        <div className="glass-card max-w-md w-full rounded-2xl p-8 border border-zinc-200/90 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-zinc-950 text-white flex items-center justify-center mx-auto mb-4 shadow-xs">
            <KeyRound className="w-6 h-6" />
          </div>

          <h2 className="text-2xl font-bold text-zinc-950 text-center tracking-tight">CMS Admin Studio</h2>
          <p className="text-xs text-zinc-500 text-center mt-1 mb-6">
            Upload & kelola project atau artikel tanpa menyentuh code.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Masukkan passcode (default: dzaky123)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm border border-zinc-950 shadow-xs transition-all cursor-pointer"
            >
              Masuk Dashboard
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-950">
              ← Kembali ke Portofolio Utama
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-zinc-500">Memuat data CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/60">
      {/* Top Navbar */}
      <header className="bg-white border-b border-zinc-200/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-950 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-zinc-950 leading-none">CMS Studio</h1>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Dynamic Content Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/60 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          <div className="glass-card rounded-xl p-5 border border-zinc-200/80 bg-white shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Total Projects
              </span>
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-bold text-zinc-950 mt-2">{projects.length}</div>
            <p className="text-[11px] text-zinc-400 mt-1">Tampil live di portofolio</p>
          </div>

          <div className="glass-card rounded-xl p-5 border border-zinc-200/80 bg-white shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Articles & Stories
              </span>
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-bold text-zinc-950 mt-2">{articles.length}</div>
            <p className="text-[11px] text-zinc-400 mt-1">Medium-style articles</p>
          </div>

          <div className="glass-card rounded-xl p-5 border border-zinc-200/80 bg-white shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Backend Status
              </span>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="text-base font-bold text-zinc-950 mt-2 flex items-center gap-1.5 font-mono">
              <span>Local Persistent JSON</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">Zero latency • Safe atomic writes</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-zinc-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "projects"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "articles"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Articles / Stories ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === "profile"
                ? "bg-zinc-950 text-white shadow-xs"
                : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200/80"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio Settings</span>
          </button>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === "projects" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Kelola Projects</h3>
                <p className="text-xs text-slate-500">
                  Tambah, edit deskripsi, live link, dan studi kasus proyek kamu.
                </p>
              </div>

              <Link
                href="/admin/project/new"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Project</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
              <div className="divide-y divide-zinc-100">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-16 h-12 rounded-lg object-cover border border-zinc-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-zinc-950 text-sm">{project.title}</h4>
                          {project.featured && (
                            <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/80">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                          {project.summary}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-mono font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60">
                            {project.category}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-mono">
                            {project.tags.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/project/${project.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                        title="Lihat halaman project"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/project/edit/${project.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200/60 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteProject(project.id, project.title)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <div className="p-12 text-center text-zinc-500 text-sm">
                    Belum ada project. Klik tombol di atas untuk menambah project baru!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Articles Management */}
        {activeTab === "articles" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-zinc-950">Medium-Style Stories</h3>
                <p className="text-xs text-zinc-500">
                  Tulis artikel atau tulisan teknologi dengan editor mirip Medium.
                </p>
              </div>

              <Link
                href="/admin/article/new"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-950 hover:bg-zinc-800 border border-zinc-950 shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Write New Story</span>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden">
              <div className="divide-y divide-zinc-100">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-zinc-950 text-sm">{article.title}</h4>
                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-zinc-400">
                        <span className="font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200/60 font-mono">
                          {article.category}
                        </span>
                        <span>{article.readTime}</span>
                        <span>{article.claps || 0} claps</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link
                        href={`/article/${article.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                        title="Baca artikel"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/article/edit/${article.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDeleteArticle(article.id, article.title)}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Hapus artikel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {articles.length === 0 && (
                  <div className="p-12 text-center text-slate-500 text-sm">
                    Belum ada artikel. Klik tombol di atas untuk menulis artikel pertama!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Profile Settings */}
        {activeTab === "profile" && profile && (
          <div className="max-w-3xl">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">Pengaturan Profile & Bio</h3>
              <p className="text-xs text-slate-500">
                Ubah informasi profil, avatar, headline, dan tautan sosial media kamu.
              </p>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    required
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Top Status Pill Badge
                </label>
                <input
                  type="text"
                  value={profile.statusBadge}
                  onChange={(e) => setProfile({ ...profile, statusBadge: e.target.value })}
                  placeholder="✨ 1000+ Hours of Code • Available for Hire"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Avatar Image URL
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar}
                    alt="avatar preview"
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <input
                    type="text"
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Bio Singkat</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profile.github}
                    onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profile.linkedin}
                    onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Twitter / X URL
                  </label>
                  <input
                    type="text"
                    value={profile.twitter || ""}
                    onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900"
                  />
                </div>
              </div>

              {profileSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Profile berhasil diperbarui dan tersimpan!</span>
                </div>
              )}

              <button
                type="submit"
                disabled={savingProfile}
                className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs border border-zinc-950 shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                {savingProfile ? "Menyimpan..." : "Simpan Perubahan Profile"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
