"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/romantic-card"
import { Heart, Star } from "lucide-react"

const loveMessages = [
  "Every day with you feels like a celebration 💕",
  "You make my world brighter just by being in it ✨",
  "Happy Birthday to the most amazing woman in my life 🌹",
  "Your smile is the best gift I could ever receive 😊",
  "Thank you for being my everything, my love 💖",
  "Another year of loving you more than yesterday 💝",
  "You're not just my girlfriend, you're my best friend 👫",
  "Every moment with you is a precious memory 📸",
]

export function LoveMessages() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-to-r from-pink-100 via-purple-50 to-pink-100 border-pink-200 shadow-xl">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          <Star className="w-6 h-6 text-yellow-400 animate-spin ml-2" />
          <Heart className="w-8 h-8 text-pink-500 animate-pulse ml-2" />
        </div>

        <div className="min-h-[60px] flex items-center justify-center">
          <p className="text-xl md:text-2xl font-medium text-gray-700 italic animate-fade-in">
            {loveMessages[currentMessage]}
          </p>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {loveMessages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentMessage ? "bg-pink-500 scale-125" : "bg-pink-200"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
