import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "RIPE",
};

// Nested under Assessment & Accreditation (/self-assessment). Placeholder for
// MVP — full RIPE content will be provided later. Intentionally not in the top nav.
export default function RipePage() {
  return (
    <>
      <PageHeader
        eyebrow="Assessment & Accreditation"
        title="RIPE"
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">Content coming soon.</p>
      </section>
    </>
  );
}
