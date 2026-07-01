import { type LucideIcon, Mail, MapPin, Phone, User } from "lucide-react";

import { contact } from "@/content/contact";
import { Reveal } from "@/components/motion/reveal";

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue/10 text-blue">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        <div className="mt-1 text-sm text-foreground sm:text-base">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ContactDetails() {
  return (
    <Reveal>
      <div className="grid overflow-hidden rounded-2xl ring-1 ring-foreground/10 md:grid-cols-2">
        {/* Details */}
        <div className="bg-card p-8 sm:p-10">
          <h2 className="font-heading text-2xl font-bold text-navy">
            Get in touch
          </h2>
          <div className="mt-8 space-y-6">
            <DetailRow icon={MapPin} label="Office">
              <p className="font-medium text-foreground">
                {contact.office.name}
              </p>
              <p className="mt-0.5 text-muted-foreground">
                {contact.office.address}
              </p>
            </DetailRow>

            <DetailRow icon={Phone} label="Phone">
              <a
                href={contact.phone.href}
                className="text-blue transition-colors hover:text-navy"
              >
                {contact.phone.display}
              </a>
            </DetailRow>

            <DetailRow icon={Mail} label="Email">
              <a
                href={`mailto:${contact.email}`}
                className="text-blue transition-colors hover:text-navy"
              >
                {contact.email}
              </a>
            </DetailRow>

            <DetailRow icon={User} label="Director">
              <p className="font-medium text-foreground">
                {contact.director.name}
              </p>
              <p className="mt-0.5 text-muted-foreground">
                {contact.director.title}
              </p>
            </DetailRow>
          </div>
        </div>

        {/* Map */}
        <div className="min-h-[320px] bg-navy">
          <iframe
            src={contact.map.embedSrc}
            title={`Map — ${contact.map.label}`}
            className="h-full min-h-[320px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </Reveal>
  );
}
