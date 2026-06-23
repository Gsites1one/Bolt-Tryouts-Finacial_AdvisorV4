import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium " +
    "transition-[color,background-color,border-color,transform] duration-200 ease-out " +
    "hover:scale-[1.02] active:scale-[0.98] " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
        secondary:
          "border border-border bg-transparent text-foreground hover:bg-surface hover:border-foreground/30",
        ghost:
          "bg-transparent text-foreground hover:bg-surface",
        // Inline text link: keep it flat — neutralise the shared button scale.
        link:
          "bg-transparent px-0 text-accent underline-offset-4 hover:underline hover:scale-100 active:scale-100",
      },
      size: {
        sm: "h-9 rounded-[0.5rem] px-4 text-sm",
        md: "h-11 rounded-[0.5rem] px-5 text-sm",
        lg: "h-12 rounded-[0.5rem] px-7 text-[15px]",
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
