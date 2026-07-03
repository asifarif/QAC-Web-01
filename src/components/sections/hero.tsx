import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GridGlow } from "@/components/decor";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <GridGlow />
      <div className="site-container relative py-24 text-center md:py-15">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xl font-medium tracking-wider text-white/70 uppercase">
            HITEC University · Taxila
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mx-auto mt-6 max-w-4xl font-heading text-4xl font-bold text-balance leading-[1.1] sm:text-5xl md:text-6xl">
            Directorate of Quality Assurance &amp; Collaborations
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-4xl text-lg text-pretty text-white/70 sm:text-xl">
            Upholding quality, advancing recognition, and building partnerships
            at HITEC University.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-12 bg-gold px-7 text-base font-semibold text-navy hover:bg-gold/90"
            >
              <Link href="/about">
                Explore our work
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/activities">View activities</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
