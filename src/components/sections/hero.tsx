import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function Hero() {
  return (
    <section>
      {/* Title band */}
      <div className="bg-gradient-to-br from-brand to-brand-dark text-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 text-center md:py-16">
          <Reveal className="flex justify-center">
            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur sm:text-sm">
              Quality Assurance &amp; Collaborations
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mx-auto mt-5 max-w-4xl font-heading text-3xl font-bold text-balance leading-[1.1] sm:text-4xl md:text-5xl">
              Directorate of Quality Assurance &amp; Collaborations
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-4xl text-lg text-pretty text-white/80 sm:text-xl">
              Upholding quality, advancing recognition, and building partnerships
              at HITEC University.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="h-12 bg-gold px-7 text-base font-semibold text-brand hover:bg-gold/90"
              >
                <Link href="/about">
                  Explore our work
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/40 bg-transparent px-7 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/activities">View activities</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
