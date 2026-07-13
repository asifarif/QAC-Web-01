import type { Metadata } from "next";
import { BarChart3, Globe2, Leaf, Target } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "University Rankings",
};

const WHY =
  "Rankings benchmark the University against national and international peers " +
  "and provide an external, evidence-based measure of progress. They raise " +
  "HITEC University's visibility for prospective students, researchers and " +
  "partners, and align institutional development with global goals, including " +
  "the UN Sustainable Development Goals.";

const OUR_ROLE =
  "The Directorate leads data acquisition, verification and timely submission " +
  "for these rankings, coordinating with academic departments and " +
  "administrative offices across the University. It also compiles the Yearly " +
  "Progress Report (YPR) for the Higher Education Commission.";

const COMMITMENT =
  "HITEC University formally began its structured participation in " +
  "international rankings in 2025 — a long-term institutional commitment. " +
  "Updates and milestones will be shared on this page.";

const RANKINGS = [
  {
    icon: Globe2,
    name: "QS World University Rankings",
    description:
      "Global ranking assessing academic reputation, research and internationalisation.",
  },
  {
    icon: BarChart3,
    name: "Times Higher Education (THE) World University Rankings",
    description:
      "Global assessment of teaching, research and knowledge transfer.",
  },
  {
    icon: Target,
    name: "THE Impact Rankings",
    description:
      "Measures university contribution to the UN Sustainable Development Goals.",
  },
  {
    icon: Leaf,
    name: "UI GreenMetric",
    description:
      "Ranks universities on sustainability and environmental commitment.",
  },
];

export default function RankingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="University Rankings"
        subtitle="HITEC University's journey toward national and international recognition."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {/* 1. Why rankings matter */}
        <Reveal>
          <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
            Why rankings matter
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {WHY}
          </p>
        </Reveal>

        {/* 2. Rankings we are pursuing */}
        <Reveal delay={0.08}>
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
              Rankings we are pursuing
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {RANKINGS.map((ranking) => {
                const Icon = ranking.icon;
                return (
                  <div
                    key={ranking.name}
                    className="flex h-full gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:shadow-md hover:ring-foreground/20"
                  >
                    <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-light/10 text-brand-light">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-brand">
                        {ranking.name}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {ranking.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* 3. Our role */}
        <Reveal delay={0.12}>
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-brand sm:text-3xl">
              Our role
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              {OUR_ROLE}
            </p>
          </div>
        </Reveal>

        {/* 4. Commitment */}
        <Reveal delay={0.16}>
          <p className="mt-14 rounded-xl border-l-4 border-gold bg-brand-tint p-5 text-base leading-relaxed text-pretty text-brand">
            {COMMITMENT}
          </p>
        </Reveal>
      </section>
    </>
  );
}
