import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
    "transition-all duration-200 ease-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "border border-border bg-transparent text-foreground hover:bg-surface hover:border-foreground/20",
        ghost:
          "bg-transparent text-foreground hover:text-accent hover:bg-accent/5",
        dark:
          "bg-ink text-paper hover:bg-foreground hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        sm: "h-9 rounded-full px-4 text-sm",
        md: "h-11 rounded-full px-6 text-sm",
        lg: "h-14 rounded-full px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = "Button";

export { Button, buttonVariants };
