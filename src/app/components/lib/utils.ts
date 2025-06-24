import type React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Additional utility functions for the romantic theme
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date)
}

export function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Romantic theme utilities
export const romanticColors = {
  primary: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7c3aed",
    800: "#6b21a8",
    900: "#581c87",
  },
}

export function getRandomRomanticColor(): string {
  const colors = [
    "bg-pink-400",
    "bg-purple-400",
    "bg-rose-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-indigo-400",
    "bg-orange-400",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function createRomanticGradient(color1: string, color2: string): string {
  return `bg-gradient-to-r from-${color1} to-${color2}`
}

// Animation utilities
export function createFloatingAnimation(delay = 0): React.CSSProperties {
  return {
    animation: `float 3s ease-in-out infinite`,
    animationDelay: `${delay}s`,
  }
}

export function createPulseAnimation(duration = 2): React.CSSProperties {
  return {
    animation: `pulse ${duration}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  }
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 50
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "")
}

// Local storage utilities
export function saveToLocalStorage(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn("Failed to save to localStorage:", error)
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.warn("Failed to load from localStorage:", error)
    return defaultValue
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn("Failed to remove from localStorage:", error)
  }
}

// Birthday specific utilities
export function calculateAge(birthDate: Date): number {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export function getNextBirthday(birthDate: Date): Date {
  const today = new Date()
  const thisYear = today.getFullYear()
  let nextBirthday = new Date(thisYear, birthDate.getMonth(), birthDate.getDate())

  if (nextBirthday < today) {
    nextBirthday = new Date(thisYear + 1, birthDate.getMonth(), birthDate.getDate())
  }

  return nextBirthday
}

export function getDaysUntilBirthday(birthDate: Date): number {
  const nextBirthday = getNextBirthday(birthDate)
  const today = new Date()
  const diffTime = nextBirthday.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function isBirthdayToday(birthDate: Date): boolean {
  const today = new Date()
  return today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()
}

// Romantic message utilities
export const romanticMessages = [
  "You are my today and all of my tomorrows.",
  "In you, I've found the love of my life and my closest, truest friend.",
  "Every love story is beautiful, but ours is my favorite.",
  "You make my heart smile.",
  "I love you more than words can express.",
  "You are my sunshine on a cloudy day.",
  "With you, I am home.",
  "You are my greatest adventure.",
  "I fall in love with you more and more every day.",
  "You are my forever and always.",
]

export function getRandomRomanticMessage(): string {
  return romanticMessages[Math.floor(Math.random() * romanticMessages.length)]
}

export function getPersonalizedMessage(name: string): string {
  const messages = [
    `${name}, you light up my world like nobody else.`,
    `Every moment with you is a treasure, ${name}.`,
    `${name}, you are the reason I believe in love.`,
    `My heart belongs to you, ${name}.`,
    `${name}, you make every day feel like a fairy tale.`,
    `I am so grateful to have you in my life, ${name}.`,
    `${name}, you are my dream come true.`,
    `With you, ${name}, I have everything I need.`,
    `${name}, you are the love of my life.`,
    `I choose you, ${name}, today and always.`,
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

// Device detection utilities
export function isMobile(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth <= 768
}

export function isTablet(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth > 768 && window.innerWidth <= 1024
}

export function isDesktop(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth > 1024
}

// Audio utilities
export function playAudio(src: string, volume = 0.5): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src)
    audio.volume = volume
    audio.onended = () => resolve()
    audio.onerror = () => reject(new Error("Failed to play audio"))
    audio.play().catch(reject)
  })
}

// Image utilities
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

export function preloadImages(srcs: string[]): Promise<void[]> {
  return Promise.all(srcs.map(preloadImage))
}

// Performance utilities
export function measurePerformance<T>(fn: () => T, label: string): T {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${label} took ${end - start} milliseconds`)
  return result
}

// Error handling utilities
export function handleError(error: Error, context: string): void {
  console.error(`Error in ${context}:`, error)
  // In a real app, you might want to send this to an error reporting service
}

export function safeAsync<T>(asyncFn: () => Promise<T>, fallback: T, context = "async operation"): Promise<T> {
  return asyncFn().catch((error) => {
    handleError(error, context)
    return fallback
  })
}
