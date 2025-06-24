"use client"

// Birthday calculation utilities
export interface BirthdayInfo {
  currentAge: number
  turningAge: number
  birthYear: number
  isToday: boolean
  daysUntilBirthday: number
  nextBirthdayDate: Date
  zodiacSign: string
  birthMonth: string
}

export function calculateBirthdayInfo(birthDate: Date): BirthdayInfo {
  const today = new Date()
  const currentYear = today.getFullYear()
  const birthYear = birthDate.getFullYear()

  // Calculate current age
  let currentAge = currentYear - birthYear
  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())

  if (!hasHadBirthdayThisYear) {
    currentAge--
  }

  // Age she's turning this year
  const turningAge = currentYear - birthYear

  // Check if today is her birthday
  const isToday = today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()

  // Calculate next birthday
  let nextBirthdayDate = new Date(currentYear, birthDate.getMonth(), birthDate.getDate())
  if (nextBirthdayDate < today) {
    nextBirthdayDate = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate())
  }

  // Days until birthday
  const diffTime = nextBirthdayDate.getTime() - today.getTime()
  const daysUntilBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // Get zodiac sign
  const zodiacSign = getZodiacSign(birthDate.getMonth() + 1, birthDate.getDate())

  // Get birth month name
  const birthMonth = birthDate.toLocaleString("default", { month: "long" })

  return {
    currentAge,
    turningAge,
    birthYear,
    isToday,
    daysUntilBirthday: isToday ? 0 : daysUntilBirthday,
    nextBirthdayDate,
    zodiacSign,
    birthMonth,
  }
}

// For your girlfriend turning 21 this year
export function createGirlfriendBirthday(): BirthdayInfo {
  const currentYear = new Date().getFullYear()
  const birthYear = currentYear - 21 // She's turning 21 this year

  // You can customize the birth month and day here
  // Let's say her birthday is in June (month 5, 0-indexed)
  const birthMonth = 5 // June (0-indexed, so 5 = June)
  const birthDay = 15 // 15th day of the month

  const birthDate = new Date(birthYear, birthMonth, birthDay)
  return calculateBirthdayInfo(birthDate)
}

function getZodiacSign(month: number, day: number): string {
  const zodiacSigns = [
    { sign: "Capricorn", start: [12, 22], end: [1, 19] },
    { sign: "Aquarius", start: [1, 20], end: [2, 18] },
    { sign: "Pisces", start: [2, 19], end: [3, 20] },
    { sign: "Aries", start: [3, 21], end: [4, 19] },
    { sign: "Taurus", start: [4, 20], end: [5, 20] },
    { sign: "Gemini", start: [5, 21], end: [6, 20] },
    { sign: "Cancer", start: [6, 21], end: [7, 22] },
    { sign: "Leo", start: [7, 23], end: [8, 22] },
    { sign: "Virgo", start: [8, 23], end: [9, 22] },
    { sign: "Libra", start: [9, 23], end: [10, 22] },
    { sign: "Scorpio", start: [10, 23], end: [11, 21] },
    { sign: "Sagittarius", start: [11, 22], end: [12, 21] },
  ]

  for (const { sign, start, end } of zodiacSigns) {
    if (
      (month === start[0] && day >= start[1]) ||
      (month === end[0] && day <= end[1]) ||
      (start[0] === 12 && month === 1 && day <= end[1])
    ) {
      return sign
    }
  }

  return "Capricorn" // Default fallback
}

export function getAgeMessages(age: number): string[] {
  const messages = {
    21: [
      `Welcome to 21! 🥂 The world is yours to explore!`,
      `21 years of being absolutely amazing! ✨`,
      `Cheers to 21 years of your beautiful existence! 🍾`,
      `21 and absolutely stunning! 💖`,
      `Finally 21! Time to celebrate properly! 🎉`,
    ],
    20: [`20 years of pure awesomeness! 🌟`, `Two decades of being incredible! 💕`, `20 and absolutely radiant! ✨`],
    22: [
      `22 and more beautiful than ever! 💖`,
      `Another year of being perfect! 🌹`,
      `22 years of lighting up the world! ✨`,
    ],
    default: [
      `${age} years of being absolutely perfect! 💖`,
      `${age} and more amazing every day! ✨`,
      `Celebrating ${age} years of you! 🎉`,
    ],
  }

  return messages[age as keyof typeof messages] || messages.default
}

export function getBirthdayCountdown(daysUntil: number): string {
  if (daysUntil === 0) return "🎉 IT'S HER BIRTHDAY TODAY! 🎉"
  if (daysUntil === 1) return "🎂 Tomorrow is the big day! 🎂"
  if (daysUntil <= 7) return `🗓️ Only ${daysUntil} days until her special day! 🗓️`
  if (daysUntil <= 30) return `📅 ${daysUntil} days until her birthday! 📅`
  return `⏰ ${daysUntil} days until her birthday! ⏰`
}

export function getSpecialAgeMessages(age: number): string {
  const specialAges = {
    18: "Welcome to adulthood! 🎓",
    21: "Legal everywhere! Time to celebrate! 🥂",
    25: "Quarter century of awesomeness! 🎊",
    30: "Thirty, flirty, and thriving! 💃",
    50: "Fabulous at fifty! 🌟",
    default: `${age} years of being incredible! ✨`,
  }

  return specialAges[age as keyof typeof specialAges] || specialAges.default
}
