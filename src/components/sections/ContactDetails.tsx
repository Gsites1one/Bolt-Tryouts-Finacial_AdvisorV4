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
    value: "+31 20 123 4567",
    href: "tel:+31201234567",
    note: "Mon-Fri, 09:00-18:00 CET",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Herengracht 100, Amsterdam",
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
    <div className="rounded-[0.5rem] border border-border bg-card p-7 shadow-sm md:p-9">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Or reach out directly
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium text-foreground">
        Other ways to talk.
      </h2>

      <ul className="mt-8 space-y-6">
        {channels.map(({ icon: Icon, label, value, href, note }) => (
          <li key={label} className="flex items-start gap-4">
            <Icon
              size={18}
              strokeWidth={1.5}
              className="mt-1 shrink-0 text-accent"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="mt-1 block break-words text-base font-medium text-foreground transition-colors hover:text-accent"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-1 break-words text-base font-medium text-foreground">
                  {value}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">{note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
