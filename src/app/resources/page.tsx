import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Resources",
};

// NOTE: In a later MVP this page becomes the searchable document library
// (policies, SAR templates, guidelines, reports) and, subsequently, the source
// corpus for the RAG-powered assistant. For MVP 0 it is a static placeholder.
export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Resources"
        subtitle="Policies, templates, guidelines and reports for quality assurance."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Coming soon. This page will become a searchable document library for
          quality-assurance resources.
        </p>
      </section>
    </>
  );
}
