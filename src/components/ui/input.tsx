import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id || reactId;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-accent" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-err` : hint ? `${inputId}-hint` : undefined
          }
          className={cn(
            "h-12 w-full rounded-xl border bg-background px-4 text-[15px] text-foreground",
            "placeholder:text-muted-foreground/60",
            "transition-all duration-200 ease-out-quart",
            "focus:outline-none focus:ring-4",
            error
              ? "border-destructive focus:border-destructive focus:ring-destructive/15"
              : "border-border focus:border-accent focus:ring-accent/15",
            "disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-err`} className="mt-1.5 text-xs text-destructive">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
