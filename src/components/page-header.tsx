type PageHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

/** Shared hero band for interior pages: flat brand colour with a very subtle
 *  brand -> brand-dark gradient, no imagery. */
export function PageHeader({ title, subtitle, eyebrow }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark text-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative py-16 md:py-20">
        {eyebrow ? (
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 font-heading text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 text-base text-pretty text-white/80 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
