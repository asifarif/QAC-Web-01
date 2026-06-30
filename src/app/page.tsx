import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { StatsBand } from "@/components/sections/stats-band";
import { LatestActivities } from "@/components/sections/latest-activities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <StatsBand />
      <LatestActivities />
    </>
  );
}
