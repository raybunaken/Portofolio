import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import TechStackSection from "@/components/TechStackSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { getProfile, getProjects, getArticles } from "@/lib/db";

export default async function HomePage() {
  const [profile, projects, articles] = await Promise.all([
    getProfile(),
    getProjects(),
    getArticles(),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfd]">
      <Navbar />
      <main className="flex-1">
        <Hero profile={profile} projects={projects} />
        <ProjectsSection projects={projects} />
        <ArticlesSection articles={articles} />
        <TechStackSection profile={profile} />
        <ContactSection profile={profile} />
      </main>
      <Footer />
    </div>
  );
}
