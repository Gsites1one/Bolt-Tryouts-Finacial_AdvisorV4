import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  AlertCircle,
  Send,
  Loader2,
  Phone,
  X as XIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { contactPhone } from "../../data/nav";
import { cn } from "../../lib/utils";
import { EASE_OUT_QUART } from "../../lib/motion";

/**
 * Build a friendly pre-filled message when the visitor arrives from the
 * calculator with their projection in the URL.
 */
function calculatorMessage(params: URLSearchParams): string | null {
  if (params.get("from") !== "calculator") return null;
  const projection = params.get("projection");
  const years = params.get("years");
  const rate = params.get("rate");
  const monthly = params.get("monthly");
  const initial = params.get("initial");
  if (!projection || !years || !rate || !monthly || !initial) return null;

  const fmtEur = (n: string) =>
    "€" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });

  return [
    `I just ran the calculator and projected ${fmtEur(projection)} over ${years} years (assuming ${rate}% annual return).`,
    "",
    `Starting from ${fmtEur(initial)} with ${fmtEur(monthly)} per month.`,
    "",
    "I'd like to talk through whether these assumptions are realistic for me and how to actually structure this.",
  ].join("\n");
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  consent: false,
};

const services = [
  "Investment planning",
  "Retirement strategy",
  "Tax & estate optimization",
  "Not sure yet, let's just talk",
];

interface ContactFormProps {
  /** Optional preferred slot pre-filled from the booking widget. */
  preferredSlot?: string | null;
  onClearSlot?: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  preferredSlot,
  onClearSlot,
}: ContactFormProps) {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fromCalculator = searchParams.get("from") === "calculator";

  // Pre-fill from calculator hand-off (runs once on mount if params present)
  useEffect(() => {
    const prefill = calculatorMessage(searchParams);
    if (prefill) {
      setData((d) => ({ ...d, message: prefill }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = "Please tell me your name.";
    if (!data.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email))
      next.email = "Hmm, that doesn't look like a valid email.";
    if (!data.message.trim() || data.message.length < 10)
      next.message = "A line or two helps me prepare for our call.";
    if (!data.consent) next.consent = "You'll need to agree before I can reply.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

    try {
      if (!accessKey) {
        // Prototype demo mode — simulate the network roundtrip.
        await new Promise((r) => setTimeout(r, 900));
        setStatus("success");
        return;
      }

      const fd = new FormData();
      fd.append("access_key", accessKey);
      fd.append("subject", "Aura Capital — new contact request");
      fd.append("from_name", data.name);
      fd.append("replyto", data.email);
      fd.append("name", data.name);
      fd.append("email", data.email);
      fd.append("phone", data.phone || "—");
      fd.append("service_interest", data.service || "—");
      fd.append("preferred_slot", preferredSlot || "—");
      fd.append("message", data.message);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        "Something broke on our end. Drop me an email directly at hello@auracapital.eu.",
      );
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  if (status === "success") {
    return (
      <SuccessState
        name={data.name}
        onReset={() => {
          setData(initialState);
          setStatus("idle");
          onClearSlot?.();
        }}
      />
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[0.5rem] border border-border bg-card p-7 shadow-sm md:p-10"
    >
      {/* Preferred slot strip */}
      {preferredSlot && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT_QUART }}
          className="mb-7 flex items-center justify-between gap-4 rounded-[0.5rem] border border-accent/40 bg-accent/5 p-4"
        >
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              Slot reserved
            </p>
            <p className="mt-1 truncate font-mono text-sm text-foreground">
              {preferredSlot}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              We&rsquo;ll hold this slot for 24h while you finish the form.
            </p>
          </div>
          <button
            type="button"
            onClick={onClearSlot}
            aria-label="Clear selected slot"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.5rem] border border-border bg-background text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            <XIcon size={14} />
          </button>
        </motion.div>
      )}

      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Send a message
      </p>
      <h2 className="mt-2 font-display text-2xl font-medium text-foreground md:text-3xl">
        Tell me a bit about yourself.
      </h2>

      {fromCalculator && (
        <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          We&rsquo;ve pre-filled your projection in the message. Edit anything before sending.
        </p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Your name"
          placeholder="Jan Kowalski"
          required
          autoComplete="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@email.com"
          required
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+31 6 1234 5678"
          autoComplete="tel"
          hint="Optional. Faster for time-sensitive things."
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <ServiceSelect
          value={data.service}
          onChange={(v) => update("service", v)}
        />
      </div>

      <div className="mt-5">
        <Textarea
          label="What's on your mind?"
          placeholder="A line or two about where you are financially and what you'd like to figure out."
          required
          rows={5}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          error={errors.message}
        />
      </div>

      {/* Consent */}
      <label className="mt-6 flex cursor-pointer items-start gap-3">
        <span className="relative mt-0.5 inline-flex">
          <input
            type="checkbox"
            checked={data.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="peer sr-only"
            required
          />
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border transition-colors",
              data.consent
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-card",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-1",
            )}
          >
            {data.consent && <Check size={12} strokeWidth={3} />}
          </span>
        </span>
        <span className="text-[13px] leading-relaxed text-muted-foreground">
          I agree to{" "}
          <a href="#" className="text-foreground underline underline-offset-2 hover:text-accent">
            the privacy policy
          </a>{" "}
          and consent to being contacted about this enquiry. No marketing, no
          third-party sharing.
        </span>
      </label>
      {errors.consent && (
        <p className="mt-2 text-xs text-destructive">{errors.consent}</p>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mt-5 flex items-start gap-3 rounded-[0.5rem] border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0 text-destructive"
          />
          <p className="text-sm text-foreground">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="md"
          disabled={status === "submitting"}
          className="group min-w-[180px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending&hellip;
            </>
          ) : (
            <>
              Book a free consultation
              <Send
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Replies within 24h &middot; Mon&ndash;Fri
        </p>
      </div>
    </form>
  );
}

/* ─────────────────────────── ServiceSelect ─────────────────────── */

function ServiceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="w-full">
      <label
        htmlFor="contact-service"
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        Interested in
      </label>
      <div className="relative">
        <select
          id="contact-service"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-[0.5rem] border border-border bg-card px-4 pr-10 text-[15px] text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
        >
          <option value="">Pick a topic (optional)</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 5l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ───────────────────────────── Success state ───────────────────── */

function SuccessState({
  name,
}: {
  name: string;
  onReset: () => void;
}) {
  const firstName = name?.split(" ")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT_QUART }}
      className="rounded-[0.5rem] border border-border bg-card p-10 text-center shadow-sm md:p-14"
    >
      <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-accent/10 text-accent">
        <Check size={22} strokeWidth={2.5} />
      </span>

      <h3 className="mt-6 font-display text-3xl font-medium text-foreground">
        Got it{firstName ? `, ${firstName}` : ""}.
      </h3>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
        Your message is on its way. I&rsquo;ll reply within 24 hours with three
        or four times that match what you mentioned.
      </p>

      {/* Catch the high-intent visitor who'd rather talk now */}
      <div className="mt-8 border-t border-border pt-7">
        <p className="text-[13px] text-muted-foreground">
          Can&rsquo;t wait that long?
        </p>
        <a
          href={contactPhone.href}
          className="mt-2 inline-flex items-center gap-2 text-base font-medium text-foreground underline decoration-accent decoration-1 underline-offset-[6px] transition-colors hover:text-accent"
        >
          <Phone size={15} strokeWidth={1.75} />
          Call {contactPhone.display}
        </a>
      </div>
    </motion.div>
  );
}
