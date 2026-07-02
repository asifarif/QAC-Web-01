import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/motion/reveal";
import { getMemberships, type Membership } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Memberships & Networks",
};

export const runtime = "nodejs";
export const revalidate = 300;

const INTRO =
  "The Directorate represents HITEC University by participating in national and " +
  "international initiatives that promote quality assurance, academic " +
  "collaboration, and the sharing of good practices.";

type MembershipGroup = { category: string; items: Membership[] };

// Group by category, preserving first-appearance order; blank -> "Other" (last).
function groupByCategory(items: Membership[]): MembershipGroup[] {
  const groups: MembershipGroup[] = [];
  const indexOf = new Map<string, number>();
  const other: Membership[] = [];

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

function MembershipCard({ member }: { member: Membership }) {
  const cardClass =
    "group flex h-full flex-col rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20";

  const inner = (
    <>
      <div className="relative h-20 rounded-lg bg-white ring-1 ring-foreground/5">
        {member.logo ? (
          <Image
            src={`/logo/${member.logo}`}
            alt={`${member.name} logo`}
            fill
            sizes="240px"
            className="object-contain p-3 grayscale transition duration-300 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-3 text-center text-sm font-semibold text-navy">
            {member.name}
          </div>
        )}
      </div>

      <h3 className="mt-4 font-semibold text-navy">{member.name}</h3>
      {member.description ? (
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
          {member.description}
        </p>
      ) : null}
      {member.url ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
          Visit
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      ) : null}
    </>
  );

  return member.url ? (
    <a
      href={member.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
    >
      {inner}
    </a>
  ) : (
    <div className={cardClass}>{inner}</div>
  );
}

export default async function MembershipsPage() {
  const items = await getMemberships();
  const groups = groupByCategory(items);

  return (
    <>
      <PageHeader
        eyebrow="Collaboration"
        title="Memberships & Networks"
        subtitle="National and international networks in which HITEC University participates."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {INTRO}
        </p>

        {items.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-base text-muted-foreground">
              Membership details are being updated.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-12">
            {groups.map((group, groupIndex) => (
              <Reveal key={group.category} delay={groupIndex * 0.05}>
                <div>
                  <h2 className="font-heading text-xl font-bold text-navy sm:text-2xl">
                    {group.category}
                  </h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((member, index) => (
                      <MembershipCard
                        key={`${member.name}-${index}`}
                        member={member}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
