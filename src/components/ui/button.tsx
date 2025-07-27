import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-light shadow-lg hover:shadow-xl",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-lg hover:shadow-xl",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-secondary text-secondary-foreground hover:bg-secondary-light shadow-2xl hover:shadow-[0_0_45px_hsl(var(--secondary)/0.35)] transform hover:scale-105 font-semibold transition-all duration-300",
        premium: "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary-light hover:to-secondary-light shadow-2xl hover:shadow-[0_0_45px_hsl(var(--secondary)/0.35)] transform hover:scale-105 font-semibold transition-all duration-300",
        playful: "bg-gradient-to-r from-accent to-accent-coral text-accent-foreground hover:from-secondary-light hover:to-accent-coral shadow-lg hover:shadow-[0_0_30px_hsl(var(--accent-coral)/0.25)] transform hover:scale-105 font-medium transition-all duration-300",
        soft: "bg-primary-soft text-primary-foreground hover:bg-primary-light shadow-md hover:shadow-[0_0_25px_hsl(var(--primary-soft)/0.2)] transform hover:scale-102 transition-all duration-300",
        coral: "bg-accent-coral text-accent-coral-foreground hover:bg-accent shadow-lg hover:shadow-[0_0_30px_hsl(var(--accent-coral)/0.3)] transform hover:scale-105 font-medium transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
