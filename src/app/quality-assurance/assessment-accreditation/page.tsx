import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ProgrammeStatusTables } from "@/components/sections/programme-status-tables";
import { getProgrammes, type Programme } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Assessment & Accreditation",
};

export const runtime = "nodejs";
// ISR: re-fetch the programmes tab at most every 5 minutes.
export const revalidate = 300;

const INTRO =
  "Quality at programme level is assured through two complementary routes. " +
  "Programmes under a discipline-specific accreditation council are reviewed by " +
  "that council; programmes outside any council are reviewed through the HEC " +
  "self-assessment cycle by the QA&C. Engineering programmes are accredited by " +
  "the Pakistan Engineering Council (PEC), computing programmes by the National " +
  "Computing Education Accreditation Council (NCEAC), and business programmes by " +
  "the National Business Education Accreditation Council (NBEAC). Self-Assessment " +
  "Reports (SARs) are prepared for the remaining programmes only.";

type ProgrammeLevelGroups = {
  bs: Programme[];
  ms: Programme[];
  phd: Programme[];
};

function normaliseLevel(value: string) {
  return value.replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function programmeLevel(programme: Programme): keyof ProgrammeLevelGroups | null {
  const level = normaliseLevel(programme.level);
  const name = normaliseLevel(programme.programme);
  const hint = `${level} ${name}`;

  if (hint.includes("phd") || hint.includes("doctor")) return "phd";
  if (hint.includes("ms") || hint.includes("master")) return "ms";
  if (hint.includes("bs") || hint.includes("bachelor")) return "bs";

  return null;
}

function splitProgrammesByLevel(items: Programme[]): ProgrammeLevelGroups {
  const groups: ProgrammeLevelGroups = {
    bs: [],
    ms: [],
    phd: [],
  };

  for (const programme of items) {
    const level = programmeLevel(programme);
    if (level) groups[level].push(programme);
  }

  return groups;
}

export default async function AssessmentAccreditationPage() {
  const { bs, ms, phd } = splitProgrammesByLevel(await getProgrammes());

  return (
    <>
      <PageHeader
        eyebrow="Quality Assurance"
        title="Assessment & Accreditation"
        subtitle="Programme accreditation status across the PEC, NCEAC and NBEAC councils."
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {INTRO}
        </p>

        <div className="mt-16">
          <ProgrammeStatusTables bs={bs} ms={ms} phd={phd} />
        </div>
      </section>
    </>
  );
}
