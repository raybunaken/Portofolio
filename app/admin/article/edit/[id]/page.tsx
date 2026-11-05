import React from "react";
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/ArticleEditor";
import { getArticleBySlug } from "@/lib/db";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getArticleBySlug(id);

  if (!article) {
    notFound();
  }

  return <ArticleEditor initialData={article} isEdit={true} />;
}
