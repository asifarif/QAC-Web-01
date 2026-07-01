"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reveal } from "@/components/motion/reveal";

type ActivityItem = {
  category: string;
  sno?: number;
  description: string;
  scheduled_date: string;
};

type ActivityGroup = {
  category: string;
  items: ActivityItem[];
};

export function ActivityCalendar({ groups }: { groups: ActivityGroup[] }) {
  return (
    <div className="space-y-8">
      {groups.map((group, index) => (
        <Reveal key={group.category} delay={index * 0.08}>
          <div className="overflow-hidden rounded-xl ring-1 ring-foreground/10">
            {/* Category heading bar */}
            <div className="flex items-center justify-between gap-3 bg-navy px-5 py-3">
              <h2 className="font-heading text-base font-semibold text-white sm:text-lg">
                {group.category}
              </h2>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
                {group.items.length}{" "}
                {group.items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-b bg-surface hover:bg-surface">
                  <TableHead className="w-12 px-4 text-navy">#</TableHead>
                  <TableHead className="px-4 text-navy">Description</TableHead>
                  <TableHead className="w-40 px-4 text-navy sm:w-56">
                    Scheduled Date
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.items.map((item, itemIndex) => (
                  <TableRow key={`${group.category}-${item.sno ?? itemIndex}`}>
                    <TableCell className="px-4 py-3 align-top text-muted-foreground tabular-nums">
                      {item.sno ?? itemIndex + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 align-top font-medium whitespace-normal text-foreground">
                      {item.description}
                    </TableCell>
                    <TableCell className="px-4 py-3 align-top whitespace-nowrap text-muted-foreground">
                      {item.scheduled_date || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
