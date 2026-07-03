import {
  Award,
  GraduationCap,
  LineChart,
  MessagesSquare,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type FocusArea = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

/**
 * The six QA&C focus areas — the single source of truth.
 * Consumed by the home "What we do" cards and the About "What We Do" band.
 */
export const focusAreas: FocusArea[] = [
  {
    title: "Quality Assurance & Self-Assessment",
    description:
      "Quality mechanisms across the University and self-assessment of academic programmes, per HEC guidelines.",
    href: "/quality-assurance",
    icon: ShieldCheck,
  },
  {
    title: "Surveys & Stakeholder Feedback",
    description:
      "Feedback from students, faculty, alumni, employers and offices — analysed and acted upon.",
    href: "/surveys",
    icon: MessagesSquare,
  },
  {
    title: "Accreditation & Compliance",
    description:
      "Support for accreditation and compliance with HEC requirements.",
    href: "/quality-assurance/assessment-accreditation",
    icon: Award,
  },
  {
    title: "University Rankings",
    description:
      "Participation in national and international rankings through data acquisition, verification and submission.",
    href: "/rankings",
    icon: LineChart,
  },
  {
    title: "Collaboration & Student Exchange",
    description:
      "Linkages with national and international partner institutions and student exchange opportunities.",
    href: "/collaboration",
    icon: Users,
  },
  {
    title: "Capacity Building & Training",
    description:
      "Workshops on quality assurance, SAR development, ethics and emerging tools.",
    href: "/training",
    icon: GraduationCap,
  },
];
