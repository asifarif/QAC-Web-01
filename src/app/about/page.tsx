import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "About QA&C",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About QA&C"
        subtitle="Who we are and what the Directorate does at HITEC University."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Coming soon. This page will introduce the Directorate&apos;s mandate,
          team and objectives.
        </p>
      </section>
    </>
  );
}
