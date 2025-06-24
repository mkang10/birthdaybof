"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-4 text-base",
        xl: "h-14 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type NativeInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">

export interface InputProps extends NativeInputProps, VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, type, icon, iconPosition = "left", ...props }, ref) => {
    if (icon) {
      return (
        <div className="relative">
          {iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, size }),
              icon && iconPosition === "left" && "pl-10",
              icon && iconPosition === "right" && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
          />
          {iconPosition === "right" && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>
          )}
        </div>
      )
    }

    return <input type={type} className={cn(inputVariants({ variant, size }), className)} ref={ref} {...props} />
  },
)
Input.displayName = "Input"

export { Input, inputVariants }
