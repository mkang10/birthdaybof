// Birthday project constants
export const BIRTHDAY_CONSTANTS = {
  // Animation durations
  ANIMATION_DURATION: {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },

  // Firework settings
  FIREWORKS: {
    COUNT: 50,
    DURATION: 3000,
    COLORS: [
      "bg-pink-400",
      "bg-purple-400",
      "bg-yellow-400",
      "bg-red-400",
      "bg-blue-400",
      "bg-green-400",
      "bg-orange-400",
      "bg-indigo-400",
    ],
  },

  // Audio settings
  AUDIO: {
    DEFAULT_VOLUME: 0.5,
    CELEBRATION_SOUND:
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
  },

  // Microphone settings
  MICROPHONE: {
    VOLUME_THRESHOLD: 10,
    CHECK_INTERVAL: 100,
    FFT_SIZE: 512,
  },

  // Local storage keys
  STORAGE_KEYS: {
    GIRLFRIEND_NAME: "birthday_girlfriend_name",
    LAST_VISIT: "birthday_last_visit",
    PREFERENCES: "birthday_preferences",
    MESSAGES: "birthday_messages",
  },

  // Responsive breakpoints
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    "2XL": 1536,
  },

  // Photo album settings
  PHOTO_ALBUM: {
    TRANSITION_DURATION: 150,
    AUTO_ADVANCE_INTERVAL: 4000,
    MAX_PHOTOS: 20,
  },
} as const

// Romantic color palettes
export const ROMANTIC_PALETTES = {
  SUNSET: {
    primary: "#ff6b6b",
    secondary: "#ffa726",
    accent: "#ffcc02",
    background: "#fff3e0",
  },
  ROSE: {
    primary: "#e91e63",
    secondary: "#f06292",
    accent: "#f8bbd9",
    background: "#fce4ec",
  },
  LAVENDER: {
    primary: "#9c27b0",
    secondary: "#ba68c8",
    accent: "#e1bee7",
    background: "#f3e5f5",
  },
  OCEAN: {
    primary: "#2196f3",
    secondary: "#64b5f6",
    accent: "#bbdefb",
    background: "#e3f2fd",
  },
} as const

// Component variant mappings
export const COMPONENT_VARIANTS = {
  BUTTON: [
    "default",
    "romantic",
    "love",
    "birthday",
    "elegant",
    "glass",
    "neon",
    "heart",
    "sparkle",
    "soft",
    "bold",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ],
  CARD: ["default", "romantic", "love", "birthday", "elegant", "glass", "dreamy", "soft", "bold"],
  INPUT: ["default", "romantic", "love", "elegant", "glass", "soft"],
  BADGE: [
    "default",
    "romantic",
    "love",
    "birthday",
    "elegant",
    "soft",
    "heart",
    "sparkle",
    "secondary",
    "destructive",
    "outline",
  ],
} as const

// Default props for components
export const DEFAULT_PROPS = {
  BUTTON: {
    variant: "default" as const,
    size: "default" as const,
    rounded: "md" as const,
  },
  CARD: {
    variant: "default" as const,
    size: "default" as const,
    rounded: "lg" as const,
  },
  INPUT: {
    variant: "default" as const,
    size: "default" as const,
  },
  BADGE: {
    variant: "default" as const,
    size: "default" as const,
  },
} as const

// Validation rules
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
  },
} as const

// API endpoints (if needed)
export const API_ENDPOINTS = {
  SEND_MESSAGE: "/api/send-message",
  UPLOAD_PHOTO: "/api/upload-photo",
  SAVE_PREFERENCES: "/api/save-preferences",
} as const

// Error messages
export const ERROR_MESSAGES = {
  MICROPHONE_ACCESS: "Unable to access microphone. Please check your browser permissions.",
  AUDIO_PLAYBACK: "Unable to play audio. Please check your browser settings.",
  INVALID_NAME: "Please enter a valid name (2-50 characters, letters only).",
  INVALID_EMAIL: "Please enter a valid email address.",
  MESSAGE_TOO_SHORT: "Message must be at least 10 characters long.",
  MESSAGE_TOO_LONG: "Message must be less than 500 characters.",
  NETWORK_ERROR: "Network error. Please check your connection and try again.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
} as const

// Success messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: "Your message has been sent successfully!",
  PHOTO_UPLOADED: "Photo uploaded successfully!",
  PREFERENCES_SAVED: "Your preferences have been saved!",
  WISH_CAPTURED: "Your wish has been captured! ✨",
} as const
