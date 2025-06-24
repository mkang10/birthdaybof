"use client"

import { useEffect, useState } from "react"
import { Heart, Star } from "lucide-react"

export function RomanticBackground() {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])
  const [stars, setStars] = useState<Array<{ id: number; left: number; top: number; delay: number }>>([])

  useEffect(() => {
    // Generate floating hearts
    const heartElements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    }))
    setHearts(heartElements)

    // Generate twinkling stars
    const starElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }))
    setStars(starElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute w-6 h-6 text-pink-300 opacity-60 animate-bounce"
          style={{
            left: `${heart.left}%`,
            bottom: "-24px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            animationIterationCount: "infinite",
            animationName: "float-up",
          }}
        />
      ))}

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <Star
          key={star.id}
          className="absolute w-4 h-4 text-yellow-300 opacity-70 animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: "2s",
          }}
        />
      ))}

      {/* CSS for floating animation */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
