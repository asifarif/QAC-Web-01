import { PageHeader } from "@/components/page-header";

type ComingSoonProps = {
  title: string;
  eyebrow?: string;
  message?: string;
};

/** Shared placeholder for sections whose content is not yet ready. */
export function ComingSoon({
  title,
  eyebrow,
  message = "This section is coming soon.",
}: ComingSoonProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />
      <section className="site-container py-20">
        <p className="text-lg text-muted-foreground">{message}</p>
      </section>
    </>
  );
}
