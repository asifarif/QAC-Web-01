import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { navItems } from "@/lib/nav";

const hitecLinks = [
  { title: "HITEC University", href: "https://www.hitecuni.edu.pk" },
  { title: "Higher Education Commission (HEC)", href: "https://www.hec.gov.pk" },
  {
    title: "Pakistan Engineering Council (PEC)",
    href: "https://www.pec.org.pk",
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="site-container grid gap-10 py-14 md:grid-cols-3">
        {/* Contact */}
        <div>
          <h3 className="font-heading text-base font-semibold text-white">
            Directorate of Quality Assurance &amp; Collaborations
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                HITEC University, Museum Road,
                <br />
                Taxila Cantt, Rawalpindi,
                <br />
                Punjab 47080, Pakistan
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href="tel:+92519490814649" className="hover:text-white">
                +92-51-9490 8146-49
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a
                href="mailto:director.qec@hitecuni.edu.pk"
                className="hover:text-white"
              >
                director.qec@hitecuni.edu.pk
              </a>
            </li>
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-heading text-base font-semibold text-white">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.title}
                </Link>
                {item.children ? (
                  <ul className="mt-2 ml-3 space-y-2 border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="transition-colors hover:text-white"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        {/* HITEC links */}
        <div>
          <h3 className="font-heading text-base font-semibold text-white">
            HITEC Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {hitecLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container py-6 text-sm text-white/60">
          © {year} Directorate of Quality Assurance &amp; Collaborations, HITEC
          University. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
