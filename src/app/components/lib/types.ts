import type React from "react"
// Core types for the birthday project
export interface BirthdayPerson {
  name: string
  birthDate: Date
  age?: number
  favoriteColor?: string
  favoriteFlower?: string
  zodiacSign?: string
}

export interface BirthdayMessage {
  id: string
  senderName: string
  message: string
  timestamp: Date
  isRead: boolean
  type: "text" | "voice" | "video"
}

export interface PhotoMemory {
  id: string
  src: string
  caption: string
  description: string
  date: string
  location: string
  tags: string[]
  isFavorite: boolean
}

export interface BirthdayWish {
  id: string
  wish: string
  timestamp: Date
  isGranted: boolean
  category: "love" | "career" | "health" | "family" | "travel" | "other"
}

export interface UserPreferences {
  theme: "romantic" | "elegant" | "playful" | "classic"
  colorScheme: "sunset" | "rose" | "lavender" | "ocean"
  animationsEnabled: boolean
  soundEnabled: boolean
  autoPlayMusic: boolean
  language: "en" | "es" | "fr" | "de"
}

export interface CakeConfiguration {
  layers: number
  candles: number
  flavor: string
  frosting: string
  decorations: string[]
  isLit: boolean
}

export interface FireworkConfiguration {
  count: number
  colors: string[]
  duration: number
  pattern: "random" | "circular" | "heart" | "star"
  intensity: "low" | "medium" | "high"
}

export interface AudioConfiguration {
  volume: number
  autoPlay: boolean
  playlist: string[]
  currentTrack: number
  isPlaying: boolean
}

export interface MicrophoneState {
  isEnabled: boolean
  isListening: boolean
  volume: number
  threshold: number
  lastDetection: Date | null
}

export interface AnimationState {
  isPlaying: boolean
  duration: number
  delay: number
  iteration: "infinite" | number
  direction: "normal" | "reverse" | "alternate"
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
  id?: string
  "data-testid"?: string
}

export interface VariantComponentProps<T extends string> extends BaseComponentProps {
  variant?: T
  size?: "sm" | "default" | "lg" | "xl"
  disabled?: boolean
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void
  onHover?: () => void
  onFocus?: () => void
  onBlur?: () => void
  loading?: boolean
  pulse?: boolean
  glow?: boolean
}

// Event types
export interface CandleBlowEvent {
  timestamp: Date
  volume: number
  duration: number
  success: boolean
}

export interface PhotoViewEvent {
  photoId: string
  timestamp: Date
  duration: number
  action: "view" | "like" | "share" | "download"
}

export interface MessageSendEvent {
  messageId: string
  timestamp: Date
  recipient: string
  type: "birthday" | "love" | "general"
  success: boolean
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  timestamp: Date
}

export interface UploadResponse {
  url: string
  filename: string
  size: number
  type: string
}

// Form types
export interface BirthdayForm {
  recipientName: string
  senderName: string
  message: string
  deliveryDate: Date
  isPrivate: boolean
  includePhotos: boolean
  includeMusic: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  isUrgent: boolean
}

// State management types
export interface AppState {
  user: {
    name: string
    preferences: UserPreferences
    isAuthenticated: boolean
  }
  birthday: {
    person: BirthdayPerson
    messages: BirthdayMessage[]
    photos: PhotoMemory[]
    wishes: BirthdayWish[]
  }
  ui: {
    theme: string
    isLoading: boolean
    errors: string[]
    notifications: string[]
  }
  audio: AudioConfiguration
  microphone: MicrophoneState
}

export type AppAction =
  | { type: "SET_USER_NAME"; payload: string }
  | { type: "SET_PREFERENCES"; payload: UserPreferences }
  | { type: "ADD_MESSAGE"; payload: BirthdayMessage }
  | { type: "ADD_PHOTO"; payload: PhotoMemory }
  | { type: "ADD_WISH"; payload: BirthdayWish }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERRORS" }
  | { type: "TOGGLE_MICROPHONE" }
  | { type: "SET_AUDIO_VOLUME"; payload: number }

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type ComponentVariant<T extends Record<string, any>> = keyof T

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"

export type ComponentColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "romantic"
  | "love"
  | "birthday"
  | "elegant"

// Hook types
export interface UseLocalStorageReturn<T> {
  value: T
  setValue: (value: T) => void
  removeValue: () => void
}

export interface UseAudioReturn {
  isPlaying: boolean
  volume: number
  duration: number
  currentTime: number
  play: () => Promise<void>
  pause: () => void
  stop: () => void
  setVolume: (volume: number) => void
  seek: (time: number) => void
}

export interface UseMicrophoneReturn {
  isEnabled: boolean
  isListening: boolean
  volume: number
  enable: () => Promise<void>
  disable: () => void
  startListening: () => void
  stopListening: () => void
}

// Animation types
export type AnimationType =
  | "fade"
  | "slide"
  | "scale"
  | "rotate"
  | "bounce"
  | "pulse"
  | "shake"
  | "flip"
  | "zoom"
  | "float"

export interface AnimationConfig {
  type: AnimationType
  duration: number
  delay?: number
  easing?: string
  iteration?: number | "infinite"
  direction?: "normal" | "reverse" | "alternate"
  fillMode?: "none" | "forwards" | "backwards" | "both"
}

// Theme types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  error: string
  warning: string
  success: string
  info: string
}

export interface ThemeConfig {
  colors: ThemeColors
  fonts: {
    primary: string
    secondary: string
    mono: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
  }
  shadows: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}
