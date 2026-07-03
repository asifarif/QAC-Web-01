import Link from "next/link";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { focusAreas } from "@/content/focus-areas";

export function WhatWeDo() {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            What we do
          </h2>
          <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">
            Focus areas through which the Directorate safeguards standards and
            builds recognition for HITEC University.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} delay={(index % 3) * 0.08}>
                <Link
                  href={area.href}
                  className="group block h-full rounded-xl transition-transform focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <Card className="h-full gap-0 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:ring-foreground/20">
                    <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                      <Icon className="size-6" />
                    </span>
                    <CardTitle className="text-lg text-navy">
                      {area.title}
                    </CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
