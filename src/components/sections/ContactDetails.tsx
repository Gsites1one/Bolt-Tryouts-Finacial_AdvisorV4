import { Mail, Phone, MapPin, Clock } from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@auracapital.eu",
    href: "mailto:hello@auracapital.eu",
    note: "Best for anything detailed",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+48 22 000 0000",
    href: "tel:+48220000000",
    note: "Mon–Fri, 09:00–18:00 CET",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Aleja Niepodległości 100, Warsaw",
    note: "By appointment only",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    note: "Monday to Friday",
  },
];

export function ContactDetails() {
  return (
    <div className="rounded-[28px] border border-border bg-surface/60 p-7 md:p-8">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Or reach out directly
      </p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
        Other ways to talk.
      </h2>

      <ul className="mt-7 space-y-5">
        {channels.map(({ icon: Icon, label, value, href, note }) => (
          <li key={label} className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25">
              <Icon size={16} strokeWidth={2.2} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-0.5 block break-words font-display text-base font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-0.5 break-words font-display text-base font-semibold text-foreground">
                  {value}
                </p>
              )}
              <p className="mt-0.5 text-xs text-muted-foreground">{note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
