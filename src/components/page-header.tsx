import { GridGlow } from "@/components/decor";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

/** Shared hero band for interior pages, keeping headings consistent. */
export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <GridGlow />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
