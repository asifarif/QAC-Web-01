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
"Quality at HITEC University is assured at two levels. At the programme level, programmes in fields served by a professional accreditation council are accredited by that council, while others are assured through internal self-assessment, with each programme preparing a Self-Assessment Report (SAR) and undergoing programme review (PREE) in line with the Higher Education Commission's framework. At the institutional level, the University reviews its overall performance through RIPE (Review of Institutional Performance and Enhancement). Together these keep quality under continuous review, from individual programmes up to the institution as a whole."
;

const sections = [
  {
    title: "Assessment & Accreditation",
    href: "/quality-assurance/assessment-accreditation",
    description:
      "Accreditation status of programmes reviewed by their relevant professional councils.",
  },
  {
    title: "Self-Assessment (SAR)",
    href: "/quality-assurance/sar",
    description:
      "The internal self-assessment cycle through which programmes are reviewed and improved.",
  },
  {
    title: "RIPE",
    href: "/quality-assurance/ripe",
    description:
      "Institutional self-review of the University's overall performance against national standards.",
  },
];

export default async function QualityAssurancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality Assurance"
        title="Quality Assurance @ HITEC University"
        subtitle="How the Directorate assures academic quality across the University, from individual programmes to the institution as a whole."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
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
