import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardList, Users } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Surveys & Stakeholder Feedback",
};

const CQI =
  "The Directorate gathers structured feedback from students, faculty, alumni, " +
  "employers and administrative offices across the University. Findings are " +
  "analysed and shared with departments and University leadership, and the " +
  "resulting actions feed back into programmes and services — closing the loop " +
  "of continuous quality improvement (CQI).";

const DIRECT_INDIRECT =
  "Quality is assessed through two complementary kinds of evidence. Direct " +
  "measures assess learning and performance directly — for example, " +
  "assessments and results — while indirect measures capture how students and " +
  "other stakeholders perceive their experience, through structured surveys. " +
  "Together, both inform programme review and improvement.";

const SURVEY_GROUPS = [
  {
    icon: Users,
    heading: "Students & Graduates",
    items: [
      "Student Course Evaluation",
      "Teacher Evaluation",
      "Survey of Graduating Students (Exit Survey)",
      "Alumni Survey",
    ],
  },
  {
    icon: ClipboardList,
    heading: "Faculty, Employers & Administration",
    items: [
      "Faculty Course Review",
      "Faculty Satisfaction Survey",
      "Employer Survey",
      "Admin Satisfaction Survey",
      "Student Feedback on Secretariat Offices",
    ],
  },
];

export default function SurveysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Feedback"
        title="Surveys & Stakeholder Feedback"
        subtitle="Structured feedback that drives continuous quality improvement."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* 1. Feedback and continuous improvement */}
        <Reveal>
          <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
            Feedback and continuous improvement
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {CQI}
          </p>
        </Reveal>

        {/* 2. Direct and indirect feedback */}
        <Reveal delay={0.08}>
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
              Direct and indirect feedback
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {DIRECT_INDIRECT}
            </p>
          </div>
        </Reveal>

        {/* 3. Survey instruments (per the HEC quality assurance framework) */}
        <Reveal delay={0.12}>
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
              Survey instruments
            </h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {SURVEY_GROUPS.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.heading}
                    className="h-full overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
                  >
                    <div className="flex items-center gap-3 bg-brand px-5 py-3">
                      <Icon className="size-5 text-gold" />
                      <h3 className="font-heading text-base font-semibold text-white">
                        {group.heading}
                      </h3>
                    </div>
                    <ul className="space-y-2.5 p-5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm text-muted-foreground sm:text-base"
                        >
                          <span
                            aria-hidden
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-light"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 4. Note */}
        <Reveal delay={0.16}>
          <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
            Department-specific survey schedules and online survey forms will be
            published here. For the current survey timeline, see the{" "}
            <Link
              href="/activities"
              className="font-medium text-brand-light underline-offset-2 hover:underline"
            >
              Annual Activities Calendar
            </Link>
            .
          </p>
        </Reveal>
      </section>
    </>
  );
}
