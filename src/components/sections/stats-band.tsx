import { Counter } from "@/components/counter";
import { GridGlow } from "@/components/decor";
import { Reveal } from "@/components/motion/reveal";

// Placeholder figures for MVP 0 — replace with real, sourced numbers later.
const stats = [
  { label: "Programmes Reviewed", value: 24, suffix: "+" },
  { label: "Accredited Programmes", value: 12, suffix: "" },
  { label: "Surveys Conducted", value: 35, suffix: "+" },
  { label: "Trainings Delivered", value: 40, suffix: "+" },
];

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <GridGlow />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.1} className="text-center">
              <div className="font-heading text-4xl font-bold text-gold sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-2 text-sm font-medium text-white/70 sm:text-base">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
