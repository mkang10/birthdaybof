"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const progressVariants = cva("relative h-4 w-full overflow-hidden rounded-full bg-secondary", {
  variants: {
    variant: {
      default: "bg-secondary",
      romantic: "bg-pink-100",
      love: "bg-red-100",
      birthday: "bg-yellow-100",
      elegant: "bg-purple-100",
    },
    size: {
      sm: "h-2",
      default: "h-4",
      lg: "h-6",
      xl: "h-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const progressIndicatorVariants = cva("h-full w-full flex-1 bg-primary transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      romantic: "bg-gradient-to-r from-pink-500 to-purple-600",
      love: "bg-gradient-to-r from-red-400 to-pink-500 animate-pulse",
      birthday: "bg-gradient-to-r from-yellow-400 to-pink-500",
      elegant: "bg-gradient-to-r from-purple-400 to-pink-400",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">,
    VariantProps<typeof progressVariants> {
  value?: number
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"]
}


const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant, size, indicatorVariant, ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn(progressVariants({ variant, size }), className)} {...props}>
      <ProgressPrimitive.Indicator
        className={cn(progressIndicatorVariants({ variant: indicatorVariant || variant }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
