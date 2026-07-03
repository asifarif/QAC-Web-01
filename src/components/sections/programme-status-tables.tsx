"use client";

import type { ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

type ProgrammeRow = {
  programme: string;
  department: string;
  body?: string;
  status?: string;
};

type ProgrammeStatusTablesProps = {
  bs: ProgrammeRow[];
  ms: ProgrammeRow[];
  phd: ProgrammeRow[];
};

type Column = {
  label: string;
  className?: string;
  render: (programme: ProgrammeRow) => ReactNode;
};

function valueOrDash(value?: string) {
  return value?.trim() ? value : "—";
}

function councilBadgeClass(body: string) {
  const council = body.trim().toUpperCase();

  // Council colours are semantic (not brand): PEC stays blue.
  if (council.includes("PEC")) return "bg-sky-50 text-sky-700 ring-sky-600/25";
  if (council.includes("NCEAC"))
    return "bg-emerald-50 text-emerald-700 ring-emerald-600/25";
  if (council.includes("NBEAC"))
    return "bg-amber-50 text-amber-700 ring-amber-600/25";

  return "bg-slate-100 text-slate-700 ring-slate-400/30";
}

function BodyBadge({ body }: { body?: string }) {
  const label = body?.trim();

  if (!label) return <span className="text-muted-foreground">—</span>;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        councilBadgeClass(label),
      )}
    >
      {label}
    </span>
  );
}

function ProgrammeTable({
  title,
  items,
  columns,
  note,
  caption,
  delay,
}: {
  title: string;
  items: ProgrammeRow[];
  columns: Column[];
  note?: string;
  caption?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <section className="overflow-hidden rounded-lg bg-card ring-1 ring-foreground/10">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-brand px-5 py-3">
          <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
            {title}
          </h3>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
            {items.length} {items.length === 1 ? "programme" : "programmes"}
          </span>
        </div>

        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow className="border-b bg-surface hover:bg-surface">
              {columns.map((column) => (
                <TableHead
                  key={column.label}
                  className={cn("px-4 text-brand", column.className)}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={`${title}-${item.programme}-${index}`}>
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    className="px-4 py-3 align-top whitespace-normal text-muted-foreground first:font-medium first:text-foreground"
                  >
                    {column.render(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {note ? (
          <p className="border-t bg-surface px-5 py-3 text-sm text-muted-foreground">
            {note}
          </p>
        ) : null}
        {caption ? (
          <p className="border-t bg-surface px-5 py-3 text-center text-sm text-muted-foreground">
            {caption}
          </p>
        ) : null}
      </section>
    </Reveal>
  );
}

const programmeColumns: Column[] = [
  {
    label: "Programme",
    render: (programme) => valueOrDash(programme.programme),
  },
  {
    label: "Department",
    render: (programme) => valueOrDash(programme.department),
  },
  {
    label: "Status",
    className: "w-44",
    render: (programme) => valueOrDash(programme.status),
  },
  {
    label: "Body",
    className: "w-32",
    render: (programme) => <BodyBadge body={programme.body} />,
  },
];

export function ProgrammeStatusTables({
  bs,
  ms,
  phd,
}: ProgrammeStatusTablesProps) {
  const total = bs.length + ms.length + phd.length;

  if (total === 0) {
    return (
      <Reveal>
        <div className="rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
          <p className="mx-auto max-w-md text-base text-muted-foreground">
            Programme accreditation and self-assessment details are being updated —
            please check back shortly.
          </p>
        </div>
      </Reveal>
    );
  }

  return (
    <div className="space-y-8">
      <ProgrammeTable
        title="BS Programmes"
        items={bs}
        columns={programmeColumns}
        delay={0}
      />
      <ProgrammeTable
        title="MS Programmes"
        items={ms}
        columns={programmeColumns}
        delay={0.08}
      />
      <ProgrammeTable
        title="PhD Programmes"
        items={phd}
        columns={programmeColumns}
        caption="Updated automatically from the QA&C content sheet."
        delay={0.16}
      />
    </div>
  );
}
