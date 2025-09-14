import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded-[var(--radius-button)] hover:bg-primary-hover shadow-sm hover:shadow-md",
        destructive: "bg-danger text-danger-foreground rounded-[var(--radius-button)] hover:bg-danger/90 shadow-sm hover:shadow-md",
        outline: "border border-border bg-surface text-foreground rounded-[var(--radius-button)] hover:bg-primary/5 hover:border-primary/30",
        secondary: "bg-secondary text-secondary-foreground rounded-[var(--radius-button)] hover:bg-secondary/90 shadow-sm hover:shadow-md",
        ghost: "text-foreground rounded-[var(--radius-button)] hover:bg-primary/10 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground rounded-[var(--radius-button)] hover:bg-success/90 shadow-sm hover:shadow-md",
        warning: "bg-warning text-warning-foreground rounded-[var(--radius-button)] hover:bg-warning/90 shadow-sm hover:shadow-md",
        hero: "bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-[var(--radius-button)] hover:shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold",
        cta: "bg-accent text-accent-foreground rounded-[var(--radius-button)] hover:bg-accent/90 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
        hero: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
