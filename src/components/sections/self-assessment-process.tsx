import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    title: "Program Team (PT) formation",
    description:
      "A dedicated Program Team is constituted to lead the self-assessment for the programme.",
  },
  {
    title: "SAR preparation",
    description:
      "The Self-Assessment Report is prepared against HEC criteria — programme mission & objectives, curriculum, faculty, facilities, student support and process control.",
  },
  {
    title: "Assessment Team (AT) review",
    description:
      "An independent Assessment Team evaluates the SAR, visits the department and meets stakeholders.",
  },
  {
    title: "Findings & rubric scoring",
    description:
      "The team records its findings and scores the programme against the assessment rubric.",
  },
  {
    title: "Improvement plan",
    description:
      "An improvement plan is agreed to close the gaps identified during the review.",
  },
  {
    title: "Follow-up & reporting",
    description:
      "Progress is followed up and reported to University leadership and HEC.",
  },
];

export function SelfAssessmentProcess() {
  return (
    <div>
      <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
        The Self-Assessment Process
      </h2>
      <div className="mt-8">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <Reveal key={step.title} delay={index * 0.06}>
              <div
                className={`relative flex gap-5 ${isLast ? "pb-0" : "pb-8"}`}
              >
                {/* Connector line between nodes */}
                {!isLast ? (
                  <span
                    aria-hidden
                    className="absolute top-11 left-5 h-[calc(100%-1.75rem)] w-px bg-border"
                  />
                ) : null}
                <span className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-semibold text-white ring-4 ring-background">
                  {index + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-heading text-base font-semibold text-navy sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
