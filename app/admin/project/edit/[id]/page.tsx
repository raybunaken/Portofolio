import React from "react";
import { notFound } from "next/navigation";
import ProjectEditor from "@/components/ProjectEditor";
import { getProjectBySlug } from "@/lib/db";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  return <ProjectEditor initialData={project} isEdit={true} />;
}
