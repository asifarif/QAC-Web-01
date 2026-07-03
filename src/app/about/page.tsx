import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { DirectorMessage } from "@/components/sections/director-message";
import { AboutAccordion } from "@/components/sections/about-accordion";
import {
  getTeam,
  getLiaisonOfficers,
  getSiteContent,
  getDirectorMessage,
} from "@/lib/sheets";

export const metadata: Metadata = {
  title: "About QA&C",
};

export const runtime = "nodejs";
// ISR: team & liaison lists refresh from the sheet at most every 5 minutes.
export const revalidate = 300;

export default async function AboutPage() {
  const [team, liaison, content] = await Promise.all([
    getTeam(),
    getLiaisonOfficers(),
    getSiteContent(),
  ]);
  const paras = getDirectorMessage(content);

  // Photo: a sheet-provided http(s) URL wins; otherwise the local file in
  // /public (URL-encoded for the space); otherwise the placeholder.
  const DIRECTOR_PHOTO_FILE = "Dr. Asif-PIC2.jpg";
  const remotePhoto = (content.director_photo_url ?? "").trim();
  const directorPhotoSrc = /^https?:\/\//i.test(remotePhoto)
    ? remotePhoto
    : existsSync(path.join(process.cwd(), "public", DIRECTOR_PHOTO_FILE))
      ? `/${encodeURIComponent(DIRECTOR_PHOTO_FILE)}`
      : null;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="About QA&C"
        subtitle="The Directorate's mandate, quality policy and the people behind it."
      />

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <DirectorMessage
          photoSrc={directorPhotoSrc}
          name={content.director_name}
          title={content.director_title}
          paragraphs={paras}
        />

        <div className="mt-16">
          <AboutAccordion team={team} liaison={liaison} />
        </div>
      </section>
    </>
  );
}
