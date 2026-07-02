import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Quality Assurance",
};

export const runtime = "nodejs";

const INTRO =
  "Quality at HITEC University is assured on two complementary tracks. " +
  "Programmes under a discipline-specific council are accredited by that body — " +
  "the Pakistan Engineering Council (PEC) for engineering, the National Computing " +
  "Education Accreditation Council (NCEAC) for computing and the National Business " +
  "Education Accreditation Council (NBEAC) for business — while other programmes " +
  "are reviewed through the HEC self-assessment (SAR) cycle. RIPE further supports " +
  "the review of research and intellectual property.";

const sections = [
  {
    title: "Assessment & Accreditation",
    href: "/quality-assurance/assessment-accreditation",
    description:
      "Programme accreditation status across the PEC, NCEAC and NBEAC councils.",
  },
  {
    title: "Self-Assessment (SAR)",
    href: "/quality-assurance/sar",
    description:
      "The HEC self-assessment cycle and review process for non-council programmes.",
  },
  {
    title: "RIPE",
    href: "/quality-assurance/ripe",
    description:
      "Review of research and intellectual property supporting quality assurance.",
  },
];

export default async function QualityAssurancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality Assurance"
        title="Quality Assurance"
        subtitle="How the Directorate assures academic quality across HITEC University."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {INTRO}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <Reveal key={section.href} delay={index * 0.08}>
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20"
              >
                <h2 className="font-heading text-lg font-semibold text-navy">
                  {section.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
