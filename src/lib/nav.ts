export type NavItem = {
  title: string;
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
  { title: "About QA&C", href: "/about" },
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
        title: "Exchange Programs",
        href: "/collaboration/exchange-programs",
      },
    ],
  },
  { title: "Activities", href: "/activities" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];
