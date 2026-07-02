import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { DirectorMessage } from "@/components/sections/director-message";
import { AboutAccordion } from "@/components/sections/about-accordion";
import { getTeam, getLiaisonOfficers } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "About QA&C",
};

export const runtime = "nodejs";
// ISR: team & liaison lists refresh from the sheet at most every 5 minutes.
export const revalidate = 300;

export default async function AboutPage() {
  const [team, liaison] = await Promise.all([
    getTeam(),
    getLiaisonOfficers(),
  ]);

  // Director photo lives in /public; encode the space in the filename for the URL.
  const DIRECTOR_PHOTO_FILE = "Dr. Asif-PIC2.jpg";
  const directorPhotoSrc = existsSync(
    path.join(process.cwd(), "public", DIRECTOR_PHOTO_FILE),
  )
    ? `/${encodeURIComponent(DIRECTOR_PHOTO_FILE)}`
    : null;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About QA&C"
        subtitle="The Directorate's mandate, quality policy and the people behind it."
      />

      <section className="site-container py-16">
        <DirectorMessage photoSrc={directorPhotoSrc} />

        <div className="mt-16">
          <AboutAccordion team={team} liaison={liaison} />
        </div>
      </section>
    </>
  );
}
