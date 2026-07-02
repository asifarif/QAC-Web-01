import { Fragment } from "react";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "RIPE",
};

const HEC_GUIDANCE_URL =
  "https://www.hec.gov.pk/english/services/universities/QAA/Documents/QAA/RQF/Draft%20Policy-03%20Institutional%20level%20IQAEQA%20Guidance.pdf";

const INTRO_PARAS = [
  "RIPE is HITEC University's institution-level internal quality assurance process. It is a routine self-review in which the University examines its own performance over the preceding academic year against the HEC RIPE Standards set out in the Quality Assurance Framework.",
  "It complements — but is distinct from — programme-level self-assessment. Where a Self-Assessment Report (SAR) evaluates an individual degree programme, RIPE steps back to review the institution as a whole.",
  "The review is overseen by the Institutional Quality Assessment and Effectiveness (IQAE) function and the Institutional Quality Circle (IQC), which is chaired by the Vice Chancellor. It draws on the University's programme and departmental self-assessments, together with evaluations gathered from students and other stakeholders.",
];

const KEY_TERMS = [
  { term: "IQC", full: "Institutional Quality Circle" },
  {
    term: "IQAE",
    full: "Institutional Quality Assessment and Effectiveness",
  },
  { term: "IPR", full: "Institutional Performance Report" },
  {
    term: "RIPE",
    full: "Review of Institutional Performance and Enhancement",
  },
];

type Phase = {
  label: string;
  title: string;
  steps: string[];
};

const PHASES: Phase[] = [
  {
    label: "Phase 1",
    title: "Pre-visit",
    steps: [
      "IQC initiates the process and constitutes an IPR preparation/update committee and a follow-up committee.",
      "The IPR committee compiles the Institutional Performance Report; the follow-up committee prepares the follow-up report.",
      "IQAE reviews both reports for completeness and evidence, returning them if incomplete.",
      "IQC constitutes the RIPE review committee (5–7 internal and external members, including at least one from HEC's expert pool).",
      "IQAE holds an orientation on the RIPE Standards, HEC expectations and the review process.",
      "Finalised reports are shared with the committee and IQAE finalises the schedule.",
    ],
  },
  {
    label: "Phase 2",
    title: "On-visit",
    steps: [
      "Review documentary evidence against the claims made in the IPR.",
      "Meetings with students, faculty, academic heads and administrative staff (and campus/college heads where applicable).",
      "Visits to facilities — classrooms, libraries, labs, cafeteria, accommodation, sports and transport.",
      "The committee meets privately to finalise its findings.",
    ],
  },
  {
    label: "Phase 3",
    title: "Post-visit",
    steps: [
      "The RIPE committee prepares its report of findings, suggestions and recommendations.",
      "The report is submitted to IQAE, signed by all members (IQAE moderates any conflict).",
      "IQAE submits the report to IQC for review and approval.",
      "IQAE disseminates it to departments for implementation and monitors progress via IQC under the CQI policy.",
    ],
  },
];

type StandardGroup = {
  heading: string;
  items: { n: number; text: string }[];
};

const STANDARD_GROUPS: StandardGroup[] = [
  {
    heading: "Strategic Development",
    items: [
      { n: 1, text: "Vision, mission, goals and strategic planning" },
      { n: 2, text: "Governance, leadership and organisation" },
      { n: 3, text: "Institutional resources and planning" },
      { n: 4, text: "Audit and finance" },
      { n: 5, text: "Affiliated colleges/institutions" },
      { n: 6, text: "Internationalisation and global engagement" },
    ],
  },
  {
    heading: "Academic Development",
    items: [
      { n: 7, text: "Faculty recruitment, development and support services" },
      { n: 8, text: "Academic programmes and curricula" },
      { n: 9, text: "Admission, progression, assessment and certification" },
      { n: 10, text: "Student support services" },
      {
        n: 11,
        text: "Impactful teaching and learning and community engagement",
      },
      {
        n: 12,
        text: "Research, innovation, entrepreneurship and industrial linkage",
      },
    ],
  },
  {
    heading: "Institutional Development",
    items: [
      { n: 13, text: "Fairness and integrity" },
      { n: 14, text: "Public information and transparency" },
      {
        n: 15,
        text: "Institutional effectiveness, quality assurance and enhancement",
      },
      { n: 16, text: "CQI and cyclical external quality assurance" },
    ],
  },
];

function FlowArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center py-1 lg:px-1 lg:py-0"
    >
      <ArrowDown className="size-6 text-blue lg:hidden" />
      <ArrowRight className="hidden size-6 text-blue lg:block" />
    </div>
  );
}

function PhaseColumn({ phase }: { phase: Phase }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <div className="bg-navy px-4 py-3">
        <p className="text-xs font-semibold tracking-wider text-gold uppercase">
          {phase.label}
        </p>
        <h3 className="font-heading text-base font-semibold text-white">
          {phase.title}
        </h3>
      </div>
      <ol className="flex flex-1 flex-col gap-2.5 p-4">
        {phase.steps.map((step, index) => (
          <li
            key={index}
            className="rounded-lg bg-surface px-3 py-2.5 text-sm leading-relaxed text-muted-foreground ring-1 ring-foreground/5"
          >
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function RipePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality Assurance"
        title="RIPE"
        subtitle="Institution-level internal quality assurance at HITEC University."
      />

      {/* 1. What is RIPE? */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
                What is RIPE?
              </h2>
              <p className="mt-2 font-heading text-lg font-semibold text-blue">
                Review of Institutional Performance and Enhancement (RIPE for
                IQA)
              </p>
              <div className="mt-4 space-y-4">
                {INTRO_PARAS.map((para) => (
                  <p
                    key={para.slice(0, 24)}
                    className="text-base leading-relaxed text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <aside className="rounded-xl border-l-4 border-blue bg-blue/5 p-5">
              <h3 className="font-heading text-sm font-semibold tracking-wider text-navy uppercase">
                Key terms
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                {KEY_TERMS.map((item) => (
                  <div key={item.term}>
                    <dt className="font-semibold text-foreground">
                      {item.term}
                    </dt>
                    <dd className="text-muted-foreground">{item.full}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </Reveal>
      </section>

      {/* 2. The RIPE Process */}
      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              The RIPE Process
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              A cyclical, three-phase institutional review — from preparation,
              through the on-site visit, to reporting and follow-up.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-stretch">
              {PHASES.map((phase, index) => (
                <Fragment key={phase.label}>
                  {index > 0 ? <FlowArrow /> : null}
                  <PhaseColumn phase={phase} />
                </Fragment>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. RIPE Standards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            RIPE Standards
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Sixteen standards, grouped under three areas of institutional
            development.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {STANDARD_GROUPS.map((group, index) => (
            <Reveal key={group.heading} delay={index * 0.08}>
              <div className="h-full rounded-xl bg-card p-6 ring-1 ring-foreground/10">
                <h3 className="font-heading text-lg font-semibold text-navy">
                  {group.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.n} className="flex gap-3">
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy tabular-nums">
                        {item.n}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 4. Footnote */}
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Based on the HEC Guidelines for Self-Review of Institutional
          Performance and Enhancement (RIPE for IQA).{" "}
          <a
            href={HEC_GUIDANCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue underline-offset-2 hover:underline"
          >
            View the HEC guidance document (PDF)
            <span aria-hidden="true"> →</span>
          </a>
        </p>
      </section>
    </>
  );
}
