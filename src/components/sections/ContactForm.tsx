import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  AlertCircle,
  Send,
  Loader2,
  CalendarCheck,
  X as XIcon,
  Sparkles,
  MailCheck,
  CalendarClock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "../../lib/utils";
import { EASE_OUT_QUART } from "../../lib/motion";

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
  "Mortgage advisory",
  "Insurance review",
  "Tax optimization",
  "Estate planning",
  "Not sure yet — let's just talk",
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
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      className="relative rounded-[28px] border border-border bg-background p-7 shadow-[0_24px_60px_-25px_rgba(11,79,74,0.18)] md:p-9"
    >
      {/* Preferred slot strip — stronger confirmation */}
      {preferredSlot && (
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE_OUT_QUART }}
          className="relative mb-7 overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.08] via-accent/[0.04] to-transparent p-5"
        >
          {/* Soft accent glow corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(63,229,186,0.4), transparent 70%)",
            }}
          />

          <div className="relative flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Animated icon */}
              <motion.span
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 15,
                  delay: 0.1,
                }}
                className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-glow"
              >
                <CalendarCheck size={20} strokeWidth={2.4} />
                {/* Pulse ring */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl bg-accent motion-safe:animate-pulse-dot opacity-30"
                />
              </motion.span>

              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                  <Sparkles size={11} />
                  Slot reserved
                </p>
                <p className="mt-1 truncate font-display text-base font-semibold text-foreground">
                  {preferredSlot}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  We'll hold this slot for 24h while you finish the form.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClearSlot}
              aria-label="Clear selected slot"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <XIcon size={14} />
            </button>
          </div>
        </motion.div>
      )}

      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        Send a message
      </p>
      <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
        Tell me a bit about yourself.
      </h2>

      <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
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
          placeholder="+48 600 000 000"
          autoComplete="tel"
          hint="Optional. Faster to reach me by phone for time-sensitive things."
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
      <label
        className={cn(
          "mt-5 flex cursor-pointer items-start gap-3 rounded-xl border bg-surface/40 p-4 transition-colors duration-200",
          errors.consent
            ? "border-destructive/50"
            : data.consent
              ? "border-accent/40 bg-accent/[0.05]"
              : "border-border hover:border-foreground/20",
        )}
      >
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
              "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
              data.consent
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background",
              "peer-focus-visible:ring-4 peer-focus-visible:ring-accent/20",
            )}
          >
            {data.consent && <Check size={13} strokeWidth={3.5} />}
          </span>
        </span>
        <span className="text-[13px] leading-relaxed text-muted-foreground">
          I agree to{" "}
          <a href="#" className="underline-offset-2 hover:underline">
            the privacy policy
          </a>{" "}
          and consent to being contacted about this enquiry. No marketing, no
          third-party sharing.
        </span>
      </label>
      {errors.consent && (
        <p className="mt-1.5 text-xs text-destructive">{errors.consent}</p>
      )}

      {/* Error banner */}
      {status === "error" && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <AlertCircle
            size={16}
            className="mt-0.5 shrink-0 text-destructive"
          />
          <p className="text-sm text-foreground">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="md"
          disabled={status === "submitting"}
          className="group min-w-[180px]"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Replies within 24h · Mon–Fri
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
          className="h-12 w-full appearance-none rounded-xl border border-border bg-background px-4 pr-10 text-[15px] text-foreground transition-all duration-200 ease-out-quart focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/15"
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
  onReset,
}: {
  name: string;
  onReset: () => void;
}) {
  const firstName = name?.split(" ")[0];
  const nextSteps = [
    {
      icon: MailCheck,
      title: "You'll hear back within 24h.",
      body: "Monday to Friday. Email lands in your inbox from hello@auracapital.eu.",
    },
    {
      icon: CalendarClock,
      title: "We'll find a time that works.",
      body: "I'll send 3–4 slots that match what you mentioned.",
    },
    {
      icon: Sparkles,
      title: "First call is free.",
      body: "60 minutes. No card. No sales pitch. Just conversation.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE_OUT_QUART }}
      className="relative overflow-hidden rounded-[28px] border border-border bg-background p-8 shadow-[0_30px_70px_-25px_rgba(11,79,74,0.25)] md:p-10"
    >
      {/* Aurora glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(63,229,186,0.5), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(91,208,244,0.45), transparent 70%)",
        }}
      />

      <div className="relative text-center">
        {/* Animated check medallion */}
        <motion.div
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 14,
            delay: 0.15,
          }}
          className="relative mx-auto inline-flex h-20 w-20 items-center justify-center"
        >
          {/* Outer pulsing halo */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-accent motion-safe:animate-pulse-dot opacity-20"
          />
          {/* Inner solid medallion */}
          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-glow ring-4 ring-accent/15">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 16,
                delay: 0.35,
              }}
            >
              <Check size={28} strokeWidth={3} />
            </motion.span>
          </span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="mt-7 font-display text-3xl font-semibold text-foreground sm:text-[2rem]"
        >
          Got it{firstName ? `, ${firstName}` : ""}.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground"
        >
          Your message is on its way. Here's what happens next.
        </motion.p>
      </div>

      {/* What happens next — 3 steps */}
      <ul className="relative mt-9 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-3">
        {nextSteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.65 + i * 0.1,
                ease: EASE_OUT_QUART,
              }}
              className="relative rounded-2xl border border-border bg-surface/40 p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/25">
                  <Icon size={13} strokeWidth={2.2} />
                </span>
                <span className="font-mono text-[11px] font-semibold text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <p className="mt-3 font-display text-sm font-semibold leading-snug text-foreground">
                {step.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.05 }}
        className="relative mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-7"
      >
        <Button onClick={onReset} variant="secondary" size="md">
          Send another message
        </Button>
        <p className="text-xs text-muted-foreground">
          Urgent? Call <span className="text-foreground">+48 22 000 0000</span>
        </p>
      </motion.div>
    </motion.div>
  );
}
