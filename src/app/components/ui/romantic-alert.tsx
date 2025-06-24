"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        // Romantic variants
        romantic: "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 text-pink-800 [&>svg]:text-pink-600",
        love: "bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800 [&>svg]:text-red-600 animate-pulse",
        birthday:
          "bg-gradient-to-r from-yellow-50 to-pink-50 border-yellow-200 text-yellow-800 [&>svg]:text-yellow-600",
        success: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800 [&>svg]:text-green-600",
        elegant: "bg-white/90 backdrop-blur-sm border-purple-200 text-purple-800 [&>svg]:text-purple-600 shadow-lg",
        dreamy:
          "bg-gradient-to-r from-purple-50/80 via-pink-50/80 to-blue-50/80 backdrop-blur-sm border-purple-200/50 text-purple-800 [&>svg]:text-purple-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
