import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { ContactDetails } from "@/components/sections/contact-details";

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
      <section className="site-container py-16">
        <ContactDetails />
      </section>
    </>
  );
}
