import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { EASE_OUT_QUART } from "../../lib/motion";

interface BookingPlaceholderProps {
  /** Called when user confirms a slot. Returns a human-readable string. */
  onSlotConfirm: (slot: string) => void;
}

const TIME_SLOTS = ["09:00", "11:00", "14:00", "16:00"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_SHORT = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function BookingPlaceholder({ onSlotConfirm }: BookingPlaceholderProps) {
  // Anchor month — defaults to current
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const monthCells = useMemo(() => buildMonth(view.year, view.month), [view]);

  function changeMonth(delta: number) {
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
    setSelectedDate(null);
    setSelectedTime(null);
  }

  function isPast(date: Date) {
    return date.getTime() < today.getTime();
  }

  function isWeekend(date: Date) {
    const d = date.getDay();
    return d === 0 || d === 6;
  }

  function isAvailable(date: Date) {
    return !isPast(date) && !isWeekend(date);
  }

  function sameDate(a: Date | null, b: Date | null) {
    return (
      !!a &&
      !!b &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function handleSelectDate(date: Date) {
    if (!isAvailable(date)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  }

  function handleConfirm() {
    if (!selectedDate || !selectedTime) return;
    const human = selectedDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    onSlotConfirm(`${human} at ${selectedTime}`);
    // smooth scroll to form
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-border bg-background p-7 shadow-[0_24px_60px_-25px_rgba(11,79,74,0.18)] md:p-8">
      {/* Subtle aurora glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(63,229,186,0.4), transparent 70%)",
        }}
      />

      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Or grab a slot
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
          Book a free 60-min call.
        </h2>

        {/* Calendar header */}
        <div className="mt-6 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-foreground">
            {MONTHS[view.month]} {view.year}
          </h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Day labels */}
        <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {DAYS_SHORT.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="mt-2 grid grid-cols-7 gap-1.5">
          {monthCells.map((cell, i) => {
            if (!cell) {
              return <div key={`e-${i}`} />;
            }
            const avail = isAvailable(cell);
            const selected = sameDate(cell, selectedDate);
            const isToday = sameDate(cell, today);
            return (
              <button
                key={cell.toISOString()}
                type="button"
                disabled={!avail}
                onClick={() => handleSelectDate(cell)}
                className={cn(
                  "relative aspect-square rounded-xl text-sm font-medium transition-all duration-200 ease-out-quart",
                  selected
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : avail
                      ? "text-foreground hover:bg-surface hover:ring-1 hover:ring-foreground/15"
                      : "text-muted-foreground/30",
                  isToday && !selected && "ring-1 ring-accent/40",
                )}
              >
                <span className="font-mono">{cell.getDate()}</span>
                {avail && !selected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1.5 mx-auto h-1 w-1 rounded-full bg-accent/50"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Time slots */}
        <AnimatePresence initial={false} mode="wait">
          {selectedDate && (
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  height: { duration: 0.35, ease: EASE_OUT_QUART },
                  opacity: { duration: 0.25, delay: 0.05 },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: { duration: 0.25, ease: EASE_OUT_QUART },
              }}
              className="overflow-hidden"
            >
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Available times{" "}
                  <span className="text-foreground">
                    ·{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIME_SLOTS.map((t) => {
                    const active = selectedTime === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                          active
                            ? "border-accent bg-accent/10 text-accent shadow-[0_0_0_4px_rgba(63,229,186,0.1)]"
                            : "border-border bg-background text-foreground hover:border-foreground/30",
                        )}
                      >
                        <Clock
                          size={13}
                          strokeWidth={2.2}
                          className={active ? "text-accent" : "text-muted-foreground"}
                        />
                        {t}
                      </button>
                    );
                  })}
                </div>

                {/* Confirm */}
                <motion.button
                  type="button"
                  initial={false}
                  animate={{
                    opacity: selectedTime ? 1 : 0.5,
                    y: selectedTime ? 0 : 4,
                  }}
                  disabled={!selectedTime}
                  onClick={handleConfirm}
                  className="group mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground shadow-glow transition-all duration-200 hover:-translate-y-0.5 hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  Continue with this slot
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </motion.button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Demo calendar — in a live deployment this would be wired to
                  Calendly, Cal.com, or your own system.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        {!selectedDate && (
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              Available
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
              Weekend / past
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Build a 6×7 = 42 cell month grid starting on Monday.
 * Empty cells are returned as `null`.
 */
function buildMonth(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  // Convert Sunday(0)..Saturday(6) → Monday(0)..Sunday(6)
  const firstDow = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
  while (cells.length < 42) cells.push(null);
  return cells;
}
