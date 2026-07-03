import { ArrowUpRight, CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

// NOTE: Static placeholders for MVP 0. In MVP 2 this becomes a dynamic feed
// sourced from the activities data store (CMS / database), replacing this
// hard-coded array with fetched, paginated entries.
const activities = [
  {
    title: "Internal Quality Audit — Spring 2026",
    date: "May 2026",
    category: "Quality Assurance",
  },
  {
    title: "Employer Feedback Survey launched",
    date: "April 2026",
    category: "Surveys",
  },
  {
    title: "SAR development workshop for faculty",
    date: "March 2026",
    category: "Training",
  },
];

export function LatestActivities() {
  return (
    <section className="bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <h2 className="font-heading text-3xl font-bold text-navy sm:text-4xl">
            Latest activities
          </h2>
          <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">
            Recent initiatives and engagements from the Directorate.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {activities.map((activity, index) => (
            <Reveal key={activity.title} delay={index * 0.1}>
              <Card className="group h-full gap-0 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-foreground/20">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-blue/10 text-blue">
                    {activity.category}
                  </Badge>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-blue" />
                </div>
                <CardTitle className="mt-4 text-lg leading-snug text-navy">
                  {activity.title}
                </CardTitle>
                <CardDescription className="mt-3 flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  {activity.date}
                </CardDescription>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
