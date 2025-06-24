"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/romantic-card"
import { Button } from "./ui/enhanced-button"
import { Heart, ArrowLeft, Star } from "lucide-react"

interface RomanticMessageScreenProps {
  girlfriendName: string
  onBack: () => void
}

const memoryPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=300&width=400",
    caption: "Our first date - the beginning of forever 💕",
    date: "The day my heart found its home",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=300&width=400",
    caption: "That perfect sunset we watched together 🌅",
    date: "When time stood still for us",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=300&width=400",
    caption: "Your beautiful smile that lights up my world ✨",
    date: "My favorite view in the universe",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=300&width=400",
    caption: "Adventures are better when we're together 🌍",
    date: "Every journey with you is magical",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=300&width=400",
    caption: "Cozy moments that mean everything 🏠",
    date: "Home is wherever you are",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=300&width=400",
    caption: "Dancing in our own little world 💃",
    date: "Every dance with you is perfect",
  },
]

export function RomanticMessageScreen({ girlfriendName, onBack }: RomanticMessageScreenProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    // Show message after a brief delay
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    // Auto-advance photos
    const photoTimer = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % memoryPhotos.length)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(photoTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Floating romantic elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>
            <Heart
              className="absolute w-4 h-4 text-pink-300 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: "3s",
              }}
            />
            <Star
              className="absolute w-3 h-3 text-yellow-300 opacity-50 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button onClick={onBack} variant="ghost" className="mb-6 text-pink-600 hover:text-pink-700 hover:bg-pink-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Celebration
          </Button>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]">
            {/* Personal Message Side */}
            <div className={`space-y-6 ${showMessage ? "animate-fade-in-up" : "opacity-0"}`}>
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                      <Heart className="w-12 h-12 text-red-500 fill-red-500 animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-bold text-pink-700 mb-2">Happy Birthday, {girlfriendName}! 💖</h2>
                  </div>

                  <div className="space-y-6 text-gray-700">
                    <p className="text-lg leading-relaxed">
                      My dearest {girlfriendName}, on this special day, I want you to know that you are the most
                      incredible person Ive ever met. Your smile brightens my darkest days, and your love gives me
                      strength I never knew I had.
                    </p>

                    <p className="text-lg leading-relaxed">
                      Every moment weve shared together has been a treasure. From our first conversation to this very
                      moment, youve filled my life with joy, laughter, and endless love. Youre not just my girlfriend;
                      youre my best friend, my partner in adventure, and my hearts greatest joy.
                    </p>

                    <p className="text-lg leading-relaxed">
                      As you celebrate another year of your beautiful life, I want you to know that Im grateful for
                      every day I get to love you. You deserve all the happiness in the world, and I promise to spend
                      every day trying to give you just that.
                    </p>

                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl text-center">
                      <p className="text-xl font-semibold text-purple-700 italic">
                        You are my today and all of my tomorrows. Happy Birthday, my love! 🌟
                      </p>
                      <p className="text-lg text-pink-600 font-medium mt-3">With all my love, always and forever ❤️</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Photo Memories Side */}
            <div
              className={`space-y-6 ${showMessage ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: "0.5s" }}
            >
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-pink-200">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-center text-pink-700 mb-6">
                    Our Beautiful Journey Together 📸
                  </h3>

                  {/* Main Photo Display */}
                  <div className="relative mb-6">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={memoryPhotos[currentPhotoIndex].src || "/placeholder.svg"}
                        alt={memoryPhotos[currentPhotoIndex].caption}
                        className="w-full h-full object-cover transition-all duration-1000"
                      />
                    </div>

                    {/* Photo Caption */}
                    <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-xl backdrop-blur-sm">
                      <p className="font-semibold text-lg mb-1">{memoryPhotos[currentPhotoIndex].caption}</p>
                      <p className="text-sm opacity-90">{memoryPhotos[currentPhotoIndex].date}</p>
                    </div>

                    {/* Photo Navigation Dots */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {memoryPhotos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentPhotoIndex ? "bg-pink-500 scale-125" : "bg-pink-200 hover:bg-pink-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Photo Thumbnails */}
                  <div className="grid grid-cols-3 gap-2 mt-8">
                    {memoryPhotos.slice(0, 6).map((photo, index) => (
                      <button
                        key={photo.id}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                          index === currentPhotoIndex
                            ? "ring-4 ring-pink-400 scale-105"
                            : "hover:scale-105 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom Message */}
          <div
            className={`mt-12 text-center ${showMessage ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1s" }}
          >
            <Card className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 border-pink-200 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                  <Heart className="w-10 h-10 text-red-500 fill-red-500 animate-pulse mx-2" />
                  <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                </div>
                <p className="text-2xl text-gray-700 italic mb-4">
                  Every love story is beautiful, but ours is my favorite.
                </p>
                <p className="text-xl font-semibold text-pink-600">
                  Here to many more birthdays together, my beautiful {girlfriendName}! 🎉💕
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
