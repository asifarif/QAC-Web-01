"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";

// Local (serializable) shapes — mirrors sheets.ts without importing the
// server-only module into this client component.
type TeamMember = { name: string; designation: string };
type LiaisonOfficer = {
  name: string;
  designation: string;
  department: string;
};

const VISION =
  "To be a premier institution to achieve academic excellence, innovative solutions in collaboration with industry for sustainable development and socio-economic growth with gender equality.";

const MISSION =
  "To impart quality education to students by equipping them with knowledge, research, creativity and entrepreneurial skills to compete in local and global markets while remaining cognizant of social and moral responsibility, and to build strong industry linkages for innovative solutions and socio-economic development with gender equality.";

const MANDATE =
  "QA&C exists to translate the University's vision and mission into practice — by assuring the quality of academic programmes and services, supporting accreditation and compliance, representing the University in national and international rankings, and fostering collaboration and student exchange, all in line with HEC standards and international best practice.";

const POLICY_ITEMS = [
  "maintaining standards that meet or exceed HEC and accreditation requirements (PEC, NCEAC, NBEAC);",
  "conducting regular self-assessment of non-council programmes and acting on findings;",
  "gathering and responding to feedback from students, faculty, alumni, employers and offices;",
  "representing the University fairly in national and international rankings;",
  "building faculty and staff capacity in quality assurance;",
  "and reviewing this policy periodically.",
];

const WHAT_WE_DO = [
  {
    title: "Quality Assurance & Self-Assessment",
    desc: "Quality mechanisms and self-assessment of programmes, per HEC guidelines.",
  },
  {
    title: "Surveys & Stakeholder Feedback",
    desc: "Feedback from students, faculty, alumni, employers and offices.",
  },
  {
    title: "Accreditation & Compliance",
    desc: "Support for PEC, NCEAC and NBEAC accreditation and HEC compliance.",
  },
  {
    title: "University Rankings",
    desc: "Participation in national and international rankings.",
  },
  {
    title: "Collaboration & Student Exchange",
    desc: "Linkages with partner institutions and student exchange.",
  },
  {
    title: "Capacity Building & Training",
    desc: "Workshops on QA, SAR development, ethics and emerging tools.",
  },
];

const triggerClass =
  "py-4 font-heading text-base font-semibold text-navy hover:no-underline sm:text-lg";

const labelClass =
  "block text-xs font-semibold tracking-wider text-navy uppercase";

const cardClass = "rounded-lg bg-surface p-4 ring-1 ring-foreground/5";

export function AboutAccordion({
  team,
  liaison,
}: {
  team: TeamMember[];
  liaison: LiaisonOfficer[];
}) {
  return (
    <Reveal>
      <Accordion
        type="single"
        collapsible
        defaultValue="vision"
        className="rounded-xl bg-card px-4 ring-1 ring-foreground/10 sm:px-6"
      >
        {/* 1. Vision, Mission & Mandate */}
        <AccordionItem value="vision">
          <AccordionTrigger className={triggerClass}>
            Vision, Mission &amp; Mandate
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-6">
            <div className="rounded-lg border-l-4 border-blue bg-blue/5 p-4">
              <span className={labelClass}>University Vision</span>
              <p className="mt-2 text-base leading-relaxed text-foreground italic">
                {VISION}
              </p>
            </div>
            <div className="mt-4">
              <span className={labelClass}>University Mission</span>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground italic">
                {MISSION}
              </p>
            </div>
            <div className="mt-4">
              <span className={labelClass}>Our Mandate</span>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {MANDATE}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Quality Policy */}
        <AccordionItem value="policy">
          <AccordionTrigger className={triggerClass}>
            Quality Policy
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-6">
            <p className="text-base text-muted-foreground">
              On behalf of the University, the Directorate is committed to:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base text-muted-foreground marker:text-blue">
              {POLICY_ITEMS.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        {/* 3. What We Do */}
        <AccordionItem value="what-we-do">
          <AccordionTrigger className={triggerClass}>
            What We Do
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {WHAT_WE_DO.map((item) => (
                <div key={item.title} className={cardClass}>
                  <span className="block font-semibold text-navy">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. QA&C Team */}
        <AccordionItem value="team">
          <AccordionTrigger className={triggerClass}>
            QA&amp;C Team
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-6">
            {team.length === 0 ? (
              <p className="text-base text-muted-foreground">
                Team details are being updated.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((member, index) => (
                  <div key={`${member.name}-${index}`} className={cardClass}>
                    <span className="block font-semibold text-navy">
                      {member.name}
                    </span>
                    {member.designation ? (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {member.designation}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        {/* 5. QEC Liaison Officers */}
        <AccordionItem value="liaison">
          <AccordionTrigger className={triggerClass}>
            QEC Liaison Officers
          </AccordionTrigger>
          <AccordionContent className="pt-1 pb-6">
            <p className="text-base text-muted-foreground">
              Departmental QEC Liaison Officers coordinate quality assurance
              activities within their departments.
            </p>
            {liaison.length === 0 ? (
              <p className="mt-4 text-base text-muted-foreground">
                Liaison officer details are being updated.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {liaison.map((officer, index) => (
                  <div key={`${officer.name}-${index}`} className={cardClass}>
                    <span className="block font-semibold text-navy">
                      {officer.name}
                    </span>
                    {officer.designation ? (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {officer.designation}
                      </span>
                    ) : null}
                    {officer.department ? (
                      <span className="mt-1 block text-xs font-medium tracking-wider text-blue uppercase">
                        {officer.department}
                      </span>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
            <p className="mt-6 text-sm text-muted-foreground">
              Updated automatically from the QA&amp;C content sheet.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Reveal>
  );
}
