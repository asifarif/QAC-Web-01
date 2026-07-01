import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ActivityCalendar } from "@/components/sections/activity-calendar";
import { getActivities, groupActivities } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Activities",
};

// Run on the Node.js runtime (the Google auth libraries need Node APIs).
export const runtime = "nodejs";
// ISR: re-fetch the sheet at most every 5 minutes, so content edits appear in
// production within ~5 minutes without a redeploy.
export const revalidate = 300;

export default async function ActivitiesPage() {
  const activities = await getActivities();
  const groups = groupActivities(activities);

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Annual Activities Calendar"
        subtitle="June 2025 – July 2026"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {groups.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
            <p className="mx-auto max-w-md text-base text-muted-foreground">
              The activity calendar is being updated — please check back
              shortly.
            </p>
          </div>
        ) : (
          <>
            <ActivityCalendar groups={groups} />
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Annual Activities Calendar - QA&amp;C HITEC University, Taxila
            </p>
          </>
        )}
      </section>
    </>
  );
}
