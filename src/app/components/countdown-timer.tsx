"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/romantic-card"
import { Button } from "./ui/enhanced-button"
import { Calendar, Clock } from "lucide-react"

export function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && targetDate) {
      interval = setInterval(() => {
        const now = new Date().getTime()
        const target = new Date(targetDate).getTime()
        const difference = target - now

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
          })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          setIsActive(false)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, targetDate])

  const startCountdown = () => {
    if (targetDate) {
      setIsActive(true)
    }
  }

  const setNextBirthday = () => {
    const today = new Date()
    const nextYear = today.getFullYear() + 1
    const nextBirthday = new Date(nextYear, today.getMonth(), today.getDate())
    setTargetDate(nextBirthday.toISOString().split("T")[0])
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center">
          <Clock className="w-5 h-5" />
          Birthday Countdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <Button onClick={setNextBirthday} variant="outline" size="sm">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>

        <Button onClick={startCountdown} className="w-full" disabled={!targetDate}>
          Start Countdown
        </Button>

        {isActive && (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">{timeLeft.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-pink-600">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-600">Seconds</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
