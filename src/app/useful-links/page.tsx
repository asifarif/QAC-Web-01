import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getImportantLinks, type ImportantLink } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Useful Links",
};

export const runtime = "nodejs";
// ISR: re-fetch the important_links tab at most every 5 minutes.
export const revalidate = 300;

type LinkGroup = { category: string; items: ImportantLink[] };

// Group by category (first-appearance order); blank category -> "Other", last.
function groupByCategory(items: ImportantLink[]): LinkGroup[] {
  const groups: LinkGroup[] = [];
  const indexOf = new Map<string, number>();
  const other: ImportantLink[] = [];

  for (const item of items) {
    const category = item.category.trim();
    if (!category) {
      other.push(item);
      continue;
    }
    if (!indexOf.has(category)) {
      indexOf.set(category, groups.length);
      groups.push({ category, items: [] });
    }
    groups[indexOf.get(category)!].items.push(item);
  }

  if (other.length > 0) groups.push({ category: "Other", items: other });
  return groups;
}

export default async function UsefulLinksPage() {
  const links = await getImportantLinks();
  const groups = groupByCategory(links);

  return (
    <>
      <PageHeader
        eyebrow="Directory"
        title="Useful Links"
        subtitle="Quick access to national quality assurance bodies, accreditation councils, surveys and other useful resources."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        {links.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-base text-muted-foreground">
              Links are being updated.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-12">
              {groups.map((group, groupIndex) => (
                <Reveal key={group.category} delay={groupIndex * 0.05}>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
                      {group.category}
                    </h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((link, index) => (
                        <a
                          key={`${link.title}-${index}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex h-full flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-foreground/20"
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-semibold text-navy transition-colors group-hover:text-blue">
                              {link.title}
                            </span>
                            <ExternalLink className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-blue" />
                          </span>
                          {link.description ? (
                            <span className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                              {link.description}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-muted-foreground">
              Updated automatically from the QA&amp;C content sheet.
            </p>
          </>
        )}
      </section>
    </>
  );
}
