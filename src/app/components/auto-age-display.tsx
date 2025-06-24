"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/romantic-card"
import { Badge } from "./ui/romantic-badge"
import { Heart, Calendar, Star, Gift } from "lucide-react"
import {
  calculateBirthdayInfo,
  createGirlfriendBirthday,
  getAgeMessages,
  getBirthdayCountdown,
  getSpecialAgeMessages,
} from "./lib/birthday-utils"

interface AutoAgeDisplayProps {
  girlfriendName: string
  customBirthDate?: Date // Optional: if you want to set a specific birth date
}

export function AutoAgeDisplay({ girlfriendName, customBirthDate }: AutoAgeDisplayProps) {
  const [birthdayInfo, setBirthdayInfo] = useState(() => {
    if (customBirthDate) {
      return calculateBirthdayInfo(customBirthDate)
    }
    return createGirlfriendBirthday() // Default: turning 21 this year
  })

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const ageMessages = getAgeMessages(birthdayInfo.turningAge)

  // Update every day to keep age current
  useEffect(() => {
    const updateBirthdayInfo = () => {
      if (customBirthDate) {
        setBirthdayInfo(calculateBirthdayInfo(customBirthDate))
      } else {
        setBirthdayInfo(createGirlfriendBirthday())
      }
    }

    // Update immediately
    updateBirthdayInfo()

    // Update every hour to catch birthday changes
    const interval = setInterval(updateBirthdayInfo, 1000 * 60 * 60)

    return () => clearInterval(interval)
  }, [customBirthDate])

  // Rotate through age messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % ageMessages.length)
    }, 3000)

    return () => clearInterval(messageInterval)
  }, [ageMessages.length])

  return (
    <div className="space-y-4">
      {/* Main Age Display */}
      <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 border-pink-200 shadow-lg">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-pink-500" />
            <h2 className="text-2xl font-bold text-pink-700">{girlfriendName} is turning</h2>
            <Gift className="w-6 h-6 text-pink-500" />
          </div>

          {/* Big Age Number */}
          <div className="relative mb-4">
            <div className="text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 bg-clip-text text-transparent animate-pulse">
              {birthdayInfo.turningAge}
            </div>
            <div className="absolute -top-2 -right-2">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 animate-spin" />
            </div>
          </div>

          {/* Current Year Display */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-500" />
            <span className="text-lg font-semibold text-purple-700">{new Date().getFullYear()}</span>
          </div>

          {/* Rotating Age Messages */}
          <div className="h-12 flex items-center justify-center">
            <p className="text-lg text-gray-700 italic transition-all duration-500">
              {ageMessages[currentMessageIndex]}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Birthday Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Current Status */}
        <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h3 className="font-semibold text-gray-800">Current Status</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Currently: <span className="font-semibold text-pink-600">{birthdayInfo.currentAge} years old</span>
              </p>
              <p className="text-sm text-gray-600">
                Turning: <span className="font-semibold text-purple-600">{birthdayInfo.turningAge} this year</span>
              </p>
              <p className="text-sm text-gray-600">
                Born: <span className="font-semibold text-blue-600">{birthdayInfo.birthYear}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Birthday Countdown */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-gray-800">Birthday Countdown</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-600">
                {getBirthdayCountdown(birthdayInfo.daysUntilBirthday)}
              </p>
              <p className="text-xs text-gray-500">
                {birthdayInfo.birthMonth} {birthdayInfo.nextBirthdayDate.getDate()}
              </p>
              {birthdayInfo.isToday && (
                <Badge variant="birthday" className="animate-pulse">
                  🎉 TODAY! 🎉
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Special Age Message */}
      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200 shadow-md">
        <CardContent className="p-4 text-center">
          <div className="flex justify-center mb-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500 animate-pulse" />
          </div>
          <p className="text-lg font-semibold text-orange-700">{getSpecialAgeMessages(birthdayInfo.turningAge)}</p>
          <p className="text-sm text-orange-600 mt-1">Zodiac Sign: {birthdayInfo.zodiacSign} ✨</p>
        </CardContent>
      </Card>

      {/* Auto-Update Notice */}
      <div className="text-center">
        <p className="text-xs text-gray-500 italic">
          Age automatically updates based on current year • Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
