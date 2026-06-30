import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Activities",
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Activities"
        subtitle="Workshops, audits, surveys and engagements from the Directorate."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Coming soon. This page will list the Directorate&apos;s activities and
          events.
        </p>
      </section>
    </>
  );
}
