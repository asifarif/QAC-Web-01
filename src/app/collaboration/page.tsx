import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Collaboration",
};

export const runtime = "nodejs";

const INTRO =
  "Collaboration is the “C” in QA&C. Beyond assuring quality, the Directorate " +
  "builds national and international linkages with partner institutions and " +
  "facilitates student exchange — broadening the academic and cultural exposure " +
  "of our students and faculty.";

const sections = [
  {
    title: "Exchange Programs",
    href: "/collaboration/exchange-programs",
    description:
      "Student and faculty exchange opportunities with partner institutions.",
  },
];

export default async function CollaborationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collaboration"
        title="Collaboration"
        subtitle="Building linkages and exchange that broaden opportunity for our students and faculty."
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
