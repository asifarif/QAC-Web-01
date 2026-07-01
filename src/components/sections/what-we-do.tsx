import {
  Award,
  GraduationCap,
  LineChart,
  MessagesSquare,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance & Self-Assessment",
    description:
      "Quality mechanisms across the University and self-assessment of programmes, per HEC guidelines.",
  },
  {
    icon: MessagesSquare,
    title: "Surveys & Stakeholder Feedback",
    description:
      "Feedback from students, faculty, alumni, employers and offices, analysed and acted upon.",
  },
  {
    icon: Award,
    title: "Accreditation & Compliance",
    description: "Support for accreditation and compliance.",
  },
  {
    icon: LineChart,
    title: "University Rankings",
    description:
      "Leading HITEC's participation in various rankings through data acquisition and submission.",
  },
  {
    icon: Users,
    title: "Collaboration & Student Exchange",
    description:
      "Linkages with partner institutions and student exchange opportunities.",
  },
  {
    icon: GraduationCap,
    title: "Capacity Building & Training",
    description:
      "Workshops on quality assurance, SAR development, ethics and emerging tools.",
  },
];

export function WhatWeDo() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            What we do
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Focus areas through which the Directorate safeguards standards
            and builds recognition for HITEC University.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={(index % 3) * 0.08}>
                <Card className="h-full gap-0 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20">
                  <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-6" />
                  </span>
                  <CardTitle className="text-lg text-navy">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="mt-2 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
