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
  "The Directorate promotes national and international collaborations that " +
  "strengthen academic quality and create meaningful opportunities for students " +
  "and faculty. Through partnerships with universities, organizations, and " +
  "quality assurance networks, it supports knowledge exchange, institutional " +
  "cooperation, and student exchange programmes that broaden academic and " +
  "cultural experiences.";

const sections = [
  {
    title: "Memberships & Networks",
    href: "/collaboration/memberships",
    description:
      "National and international initiatives and quality assurance networks HITEC University is part of.",
  },
  {
    title: "Student Exchange",
    href: "/collaboration/student-exchange",
    description:
      "International exchange programmes that broaden students' academic and cultural experience.",
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

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {INTRO}
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sections.map((section, index) => (
            <Reveal key={section.href} delay={index * 0.08}>
              <Link
                href={section.href}
                className="group flex h-full flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20"
              >
                <h2 className="font-heading text-lg font-semibold text-brand">
                  {section.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {section.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light">
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
