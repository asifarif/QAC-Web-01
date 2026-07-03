import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Student Exchange",
};

const INTRO =
  "Through partnerships with universities around the world, HITEC University " +
  "offers international student exchange programmes that broaden students' " +
  "academic horizons and expose them to diverse cultures and learning " +
  "environments. These collaborations strengthen international engagement while " +
  "enriching the educational experience of our students.";

export default function StudentExchangePage() {
  return (
    <>
      <PageHeader
        eyebrow="Collaboration"
        title="Student Exchange"
        subtitle="International exchange opportunities that broaden our students' academic and cultural experience."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <Reveal>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {INTRO}
          </p>
        </Reveal>

        {/* How it works */}
        <Reveal delay={0.08}>
          <div className="mt-14">
            <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
              How it works
            </h2>
            <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground">
              Student exchange is facilitated through the{" "}
              <strong className="font-semibold text-navy">
                Asia Technological University Network (ATU-Net)
              </strong>
              , a regional network connecting technological universities across
              Asia. Through this network, HITEC University students can access
              exchange opportunities at partner institutions.
            </p>
          </div>
        </Reveal>

        {/* Partners */}
        <Reveal delay={0.12}>
          <div className="mt-10">
            <h3 className="font-heading text-lg font-semibold text-navy">
              Partners
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* ATU-Net */}
              <div className="flex flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10">
                <div className="relative h-20">
                  <Image
                    src="/logo/atunet.png"
                    alt="ATU-Net logo"
                    fill
                    sizes="220px"
                    className="object-contain object-left p-1"
                  />
                </div>
                <h4 className="mt-4 font-semibold text-navy">
                  Asia Technological University Network (ATU-Net)
                </h4>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                  A regional network connecting technological universities across
                  Asia to enable academic collaboration and student exchange.
                </p>
                <a
                  href="https://www2.utm.my/atunet/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-navy"
                >
                  Visit ATU-Net
                  <ArrowUpRight className="size-4" />
                </a>
              </div>

              {/* UTM */}
              <div className="flex flex-col rounded-xl bg-card p-6 ring-1 ring-foreground/10">
                <div className="relative h-20">
                  <Image
                    src="/logo/utmlogo.png"
                    alt="Universiti Teknologi Malaysia logo"
                    fill
                    sizes="220px"
                    className="object-contain object-left p-1"
                  />
                </div>
                <h4 className="mt-4 font-semibold text-navy">
                  Universiti Teknologi Malaysia (UTM)
                </h4>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
                  UTM currently offers undergraduate student exchange to HITEC
                  University students.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Closing */}
        <Reveal delay={0.16}>
          <p className="mt-12 text-base leading-relaxed text-pretty text-muted-foreground">
            We are actively expanding both our exchange partnerships and our
            quality assurance networks — further opportunities will be announced
            here.
          </p>
        </Reveal>

        {/*
          TODO (content): add eligibility criteria, application steps and
          deadlines for the student exchange programme when available.
        */}
      </section>
    </>
  );
}
