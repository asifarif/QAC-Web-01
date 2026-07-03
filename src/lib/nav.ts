export type NavItem = {
  title: string;
  /** Optional shorter label for the top bar and mobile menu; the footer always uses `title`. */
  shortTitle?: string;
  href: string;
  children?: NavItem[];
};

/**
 * Primary navigation for the QA&C site.
 * Single source of truth, consumed by the header, mobile sheet and footer.
 * Items with `children` render as a dropdown (desktop) / expandable group (mobile);
 * the parent `href` is the section landing/overview page.
 */
export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About QA&C", shortTitle: "About", href: "/about" },
  {
    title: "Quality Assurance",
    href: "/quality-assurance",
    children: [
      {
        title: "Assessment & Accreditation",
        href: "/quality-assurance/assessment-accreditation",
      },
      { title: "Self-Assessment (SAR)", href: "/quality-assurance/sar" },
      { title: "RIPE", href: "/quality-assurance/ripe" },
    ],
  },
  {
    title: "Collaboration",
    href: "/collaboration",
    children: [
      {
        title: "Memberships & Networks",
        href: "/collaboration/memberships",
      },
      {
        title: "Student Exchange",
        href: "/collaboration/student-exchange",
      },
    ],
  },
  { title: "Activities", href: "/activities" },
  {
    title: "Resources",
    href: "/resources",
    children: [{ title: "Useful Links", href: "/useful-links" }],
  },
  { title: "Contact", href: "/contact" },
];
