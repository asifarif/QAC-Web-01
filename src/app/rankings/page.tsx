import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = {
  title: "University Rankings",
};

export default function RankingsPage() {
  return <ComingSoon title="University Rankings" />;
}
