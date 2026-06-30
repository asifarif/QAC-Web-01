import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Reach the Directorate of Quality Assurance & Collaborations."
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">
          Coming soon. This page will provide a contact form and full directory.
          In the meantime, our address and phone number are in the footer below.
        </p>
      </section>
    </>
  );
}
