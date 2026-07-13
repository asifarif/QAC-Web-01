import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, GraduationCap } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getActivities } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Capacity Building & Training",
};

export const runtime = "nodejs";
// ISR: re-fetch the activities tab at most every 5 minutes.
export const revalidate = 300;

const INTRO =
  "The Directorate builds quality assurance capacity across the University " +
  "through regular workshops, trainings and awareness sessions for faculty and " +
  "staff, covering self-assessment, programme review, research ethics and " +
  "emerging tools.";

export default async function TrainingPage() {
  // getActivities() already sorts by sno.
  const all = await getActivities();
  const trainings = all.filter(
    (a) => a.category.trim().toLowerCase() === "trainings",
  );

  return (
    <>
      <PageHeader
        eyebrow="Capacity Building"
        title="Capacity Building & Training"
        subtitle="Workshops and trainings that build quality assurance capacity across the University."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {INTRO}
          </p>
        </Reveal>

        {trainings.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-base text-muted-foreground">
              Training schedule is being updated.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {trainings.map((item, index) => (
                <Reveal key={`${item.sno ?? index}-${item.description.slice(0, 24)}`} delay={(index % 3) * 0.06}>
                  <div className="flex h-full flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:shadow-md hover:ring-foreground/20">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-light/10 text-brand-light">
                        <GraduationCap className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-semibold text-brand">
                          {item.description}
                        </h2>
                        {item.scheduled_date ? (
                          <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-medium text-brand">
                            <CalendarDays className="size-3.5" />
                            {item.scheduled_date}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-muted-foreground">
              Updated automatically from the QA&amp;C content sheet.
            </p>
          </>
        )}

        <p className="mt-10 text-base">
          <Link
            href="/activities"
            className="inline-flex items-center gap-1.5 font-semibold text-brand-light transition-colors hover:text-brand"
          >
            See the full Annual Activities Calendar{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
    </>
  );
}
