import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/page-header";
import { SelfAssessmentProcess } from "@/components/sections/self-assessment-process";

export const metadata: Metadata = {
  title: "Self-Assessment (SAR)",
};

export const runtime = "nodejs";

const INTRO =
  "Programmes that fall outside a discipline-specific accreditation council are " +
  "reviewed through the HEC self-assessment cycle. Each such programme prepares a " +
  "Self-Assessment Report (SAR), which an independent Assessment Team evaluates " +
  "through the process below.";

export default async function SelfAssessmentSarPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality Assurance"
        title="Self-Assessment (SAR)"
        subtitle="The HEC self-assessment cycle for programmes outside a council's remit."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {INTRO}
        </p>

        <div className="mt-16 max-w-3xl">
          <SelfAssessmentProcess />
        </div>

        <div className="mt-10 max-w-3xl">
          <Link
            href="/quality-assurance/assessment-accreditation"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-navy"
          >
            View programme accreditation &amp; status tables{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
