import type { Metadata } from "next";

import { ResourceLibrary } from "@/components/sections/resource-library";
import { getDocuments } from "@/lib/sheets";

export const metadata: Metadata = {
  title: "Resources",
};

export const runtime = "nodejs";
// ISR: re-fetch the documents tab at most every 5 minutes.
export const revalidate = 300;

// NOTE: this document library is the future source corpus for the RAG-powered
// assistant (later MVP).
export default async function ResourcesPage() {
  const docs = await getDocuments();
  return <ResourceLibrary documents={docs} />;
}
