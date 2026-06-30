export type NavItem = {
  title: string;
  href: string;
};

/**
 * Primary navigation for the QA&C site.
 * Single source of truth, consumed by the header, mobile sheet and footer.
 */
export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About QA&C", href: "/about" },
  { title: "Self-Assessment & Accreditation", href: "/self-assessment" },
  { title: "Activities", href: "/activities" },
  { title: "Resources", href: "/resources" },
  { title: "Contact", href: "/contact" },
];
