"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // New romantic variants
        romantic:
          "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
        love: "bg-gradient-to-r from-red-400 via-pink-500 to-purple-600 text-white hover:from-red-500 hover:via-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl animate-pulse",
        birthday:
          "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl",
        elegant:
          "bg-white/90 backdrop-blur-sm border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 shadow-md hover:shadow-lg",
        glass:
          "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg hover:shadow-xl",
        neon: "bg-transparent border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all duration-300",
        heart:
          "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300",
        sparkle:
          "bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-white hover:from-purple-500 hover:via-pink-500 hover:to-yellow-500 shadow-lg hover:shadow-xl animate-shimmer",
        soft: "bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-200 hover:border-pink-300 shadow-sm hover:shadow-md",
        bold: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-lg px-12 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        full: "w-full h-12 px-6",
        compact: "h-8 px-3 text-xs",
        massive: "h-16 px-16 text-xl font-bold",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
  pulse?: boolean
  glow?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      asChild = false,
      loading = false,
      icon,
      iconPosition = "left",
      pulse = false,
      glow = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, className }),
          loading && "cursor-not-allowed opacity-70",
          pulse && "animate-pulse",
          glow && "animate-pulse shadow-lg",
          disabled && "cursor-not-allowed opacity-50",
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}

        {icon && iconPosition === "left" && !loading && <span className="mr-2">{icon}</span>}

        {children}

        {icon && iconPosition === "right" && !loading && <span className="ml-2">{icon}</span>}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
