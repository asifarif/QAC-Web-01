import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Self-Assessment & Accreditation",
};

export default function SelfAssessmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality"
        title="Self-Assessment & Accreditation"
        subtitle="Programme self-assessment, accreditation support and HEC compliance."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Coming soon. This page will detail the self-assessment cycle and
          accreditation support for PEC, NCEAC and HEC.
        </p>
      </section>
    </>
  );
}
