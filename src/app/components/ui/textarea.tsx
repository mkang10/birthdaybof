"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"
const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        romantic: "border-pink-300 focus-visible:ring-pink-400 focus-visible:border-pink-400 bg-pink-50/50",
        love: "border-red-300 focus-visible:ring-red-400 focus-visible:border-red-400 bg-red-50/50",
        elegant: "border-purple-300 focus-visible:ring-purple-400 focus-visible:border-purple-400 bg-purple-50/50",
        glass:
          "bg-white/20 backdrop-blur-md border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/50",
        soft: "border-pink-200 focus-visible:ring-pink-300 bg-pink-25",
      },
      size: {
        default: "min-h-[80px]",
        sm: "min-h-[60px] text-sm",
        lg: "min-h-[120px]",
        xl: "min-h-[160px] text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, size, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ variant, size }), className)} ref={ref} {...props} />
})
Textarea.displayName = "Textarea"

export { Textarea }
