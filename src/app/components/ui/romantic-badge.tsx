"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Romantic variants
        romantic: "border-transparent bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm",
        love: "border-transparent bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-sm animate-pulse",
        birthday: "border-transparent bg-gradient-to-r from-yellow-400 to-pink-500 text-white shadow-sm",
        elegant: "border-pink-300 bg-pink-50 text-pink-700",
        soft: "border-transparent bg-pink-100 text-pink-800",
        heart: "border-transparent bg-red-500 text-white rounded-full",
        sparkle:
          "border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white animate-shimmer",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  pulse?: boolean
  glow?: boolean
}

function Badge({ className, variant, size, pulse = false, glow = false, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), pulse && "animate-pulse", glow && "shadow-lg", className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
