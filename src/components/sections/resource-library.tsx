"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ExternalLink, FileText, Search } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Local (serializable) shape — mirrors DocumentItem in sheets.ts without
// importing the server-only module into this client component.
type DocumentItem = {
  title: string;
  category: string;
  date: string;
  file_url: string;
  description: string;
};

const OTHER = "Other";

/** Category for grouping/chips: blank -> "Other". */
function categoryOf(doc: DocumentItem) {
  return doc.category.trim() || OTHER;
}

/** Unique categories in first-appearance order, "Other" always last. */
function deriveCategories(documents: DocumentItem[]): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  let hasOther = false;
  for (const doc of documents) {
    const category = categoryOf(doc);
    if (category === OTHER) {
      hasOther = true;
      continue;
    }
    if (!seen.has(category)) {
      seen.add(category);
      ordered.push(category);
    }
  }
  if (hasOther) ordered.push(OTHER);
  return ordered;
}

function DocumentCard({ doc }: { doc: DocumentItem }) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:shadow-md hover:ring-foreground/20">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
          <FileText className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-navy">{doc.title}</h3>
          {doc.description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {doc.description}
            </p>
          ) : null}
          {doc.date ? (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {doc.date}
            </p>
          ) : null}
        </div>
      </div>
      {doc.file_url ? (
        <div className="mt-4 border-t border-border pt-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-blue hover:text-navy"
          >
            <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
              Open
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export function ResourceLibrary({ documents }: { documents: DocumentItem[] }) {
  const [selected, setSelected] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(() => deriveCategories(documents), [documents]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((doc) => {
      if (selected !== "All" && categoryOf(doc) !== selected) return false;
      if (!q) return true;
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.description.toLowerCase().includes(q)
      );
    });
  }, [documents, selected, query]);

  // Grouped view when "All" is selected; flat grid for a single category.
  const groups = useMemo(() => {
    if (selected !== "All") return null;
    const byCategory = new Map<string, DocumentItem[]>();
    for (const doc of filtered) {
      const category = categoryOf(doc);
      if (!byCategory.has(category)) byCategory.set(category, []);
      byCategory.get(category)!.push(doc);
    }
    return categories
      .filter((category) => byCategory.has(category))
      .map((category) => ({ category, items: byCategory.get(category)! }));
  }, [filtered, selected, categories]);

  return (
    <>
      <PageHeader
        eyebrow="Library"
        title="Resources"
        subtitle="Policies, templates, forms and reference documents published by the Directorate."
      />

      <section className="site-container py-16">
        {documents.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-base text-muted-foreground">
              Documents are being added — please check back shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Search + category chips */}
            <Reveal delay={0.06}>
              <div className="mt-10 flex flex-col gap-4">
                <div className="relative max-w-md">
                  <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search documents…"
                    aria-label="Search documents by title or description"
                    className="h-10 w-full rounded-lg border border-input bg-card pr-3 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none"
                  />
                </div>
                <div
                  role="group"
                  aria-label="Filter documents by category"
                  className="flex flex-wrap gap-2"
                >
                  {["All", ...categories].map((category) => {
                    const active = selected === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelected(category)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:outline-none",
                          active
                            ? "bg-navy text-white"
                            : "bg-card text-muted-foreground ring-1 ring-foreground/10 hover:bg-blue/10 hover:text-navy",
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="mt-10 rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center">
                <p className="mx-auto max-w-md text-base text-muted-foreground">
                  No documents match your search.
                </p>
              </div>
            ) : groups ? (
              <div className="mt-12 space-y-12">
                {groups.map((group, index) => (
                  <Reveal key={group.category} delay={index * 0.05}>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
                        {group.category}
                      </h2>
                      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {group.items.map((doc, i) => (
                          <DocumentCard key={`${doc.title}-${i}`} doc={doc} />
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((doc, i) => (
                  <DocumentCard key={`${doc.title}-${i}`} doc={doc} />
                ))}
              </div>
            )}

            <p className="mt-12 text-center text-sm text-muted-foreground">
              Updated automatically from the QA&amp;C content sheet.
            </p>
          </>
        )}
      </section>
    </>
  );
}
