"use client";

import Image from "next/image";

import gallery from "@/content/gallery.json";

type GalleryItem = { src: string; alt: string };

export function GalleryMarquee() {
  const items = gallery as GalleryItem[];
  if (!items || items.length === 0) return null;

  // ~4s per image; the track scrolls one full copy over this duration.
  const durationSeconds = items.length * 8;
  // Render the list twice so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-brand sm:text-4xl">
            In Pictures
          </h2>
          <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">
            Moments from the Directorate&apos;s activities and engagements.
          </p>
        </div>

        <div
          role="group"
          aria-label="Photo highlights from the Directorate"
          className="marquee-group relative mt-12 w-full"
          style={
            { "--marquee-duration": `${durationSeconds}s` } as React.CSSProperties
          }
        >
          <div className="marquee-track flex w-max">
            {loop.map((item, index) => {
              const isDuplicate = index >= items.length;
              return (
                <Image
                  key={index}
                  src={item.src}
                  alt={item.alt}
                  width={260}
                  height={180}
                  sizes="260px"
                  aria-hidden={isDuplicate ? true : undefined}
                  className="mr-4 h-[200px] w-[280px] shrink-0 rounded-xl border border-foreground/10 object-cover shadow-sm"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
