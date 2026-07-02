import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";

const PARAS = [
 "It is my privilege to serve as Director, Quality Assurance & Collaborations (QA&C) at HITEC University. In today's rapidly evolving academic and industrial landscape, quality is the defining measure of a university's worth and at HITEC University, it is a responsibility we embrace at every level.",
"The Directorate exists to ensure that the education we deliver remains rigorous, relevant, and continuously improving. Through systematic self-assessment of our programmes, structured feedback from students, faculty, alumni and employers, and close coordination with national bodies such as the HEC and accreditation councils, we work to uphold standards that match the best in the country and beyond.",
"Our mandate, however, extends beyond assurance. The Directorate leads the University's pursuit of national and international recognition through rankings and builds collaborative linkages including student exchange. This broaden opportunities for our students and faculty.",
"Our approach is practical and evidence-based. We do not view quality as a box-ticking exercise, but as a shared commitment to excellence. Working hand in hand with departments and University leadership, QA&C identifies opportunities for improvement and ensures they translate into measurable outcomes that benefit our students and stakeholders. I warmly invite our faculty, students, partners and well-wishers to engage with us on this journey.",
];

export function DirectorMessage({ photoSrc }: { photoSrc: string | null }) {
  return (
    <Reveal>
      <div className="grid gap-8 md:grid-cols-3 md:gap-10">
        <div className="md:col-span-1">
          {/* 📷 Director photo size — change max-w-[208px] to resize (bigger = larger photo). */}
          <div className="mx-auto w-full max-w-[250px] md:mx-0">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt="Prof. Dr. Muhammad Asif, Director QA&C"
                width={480}
                height={600}
                className="aspect-[4/5] w-full rounded-2xl object-cover object-top ring-1 ring-foreground/10"
                priority
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-surface text-sm font-medium text-muted-foreground ring-1 ring-foreground/10">
                Director photo
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="font-heading text-2xl font-bold text-navy sm:text-3xl">
            Director&apos;s Message
          </h2>
          <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground">
            {PARAS.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <div className="mt-6 border-t border-border pt-4">
            <p className="font-heading font-semibold text-navy">
              Prof. Dr. Muhammad Asif
            </p>
            <p className="text-sm text-muted-foreground">
              Director, Quality Assurance &amp; Collaborations, HITEC University,
              Taxila
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
