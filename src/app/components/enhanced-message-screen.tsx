"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "./ui/romantic-card"
import { Button } from "./ui/enhanced-button"
import { Heart, ArrowLeft, BookOpen } from "lucide-react"
import MobilePhotoAlbum from "./mobile-photo-album"

interface EnhancedMessageScreenProps {
  girlfriendName: string
  onBack: () => void
}

export function EnhancedMessageScreen({ girlfriendName, onBack }: EnhancedMessageScreenProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [showAlbum, setShowAlbum] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  const loveQuotes = [
    "Ton sourire a volé mon attention, maintenant je suis curieux de connaître ton monde.",
    "Je ne cherche pas la perfection, juste quelqu’un dont la présence rend mes journées plus douces.",
    "Quand je suis avec toi, tout devient naturellement extraordinaire.",
    "Je ne cherche rien d’autre, car tout ce que je veux, c’est déjà toi.",
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % loveQuotes.length)
    }, 4000)

    return () => {
      clearTimeout(timer)
      clearInterval(quoteTimer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 relative">
      {/* Minimal Background Elements for Mobile */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute w-3 h-3 text-pink-300 animate-pulse"
            style={{
              left: `${20 + i * 20}%`,
              top: `${15 + i * 20}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-sm mx-auto">
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>

            <Button
              onClick={() => setShowAlbum(true)}
              size="sm"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md text-sm px-4"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Album
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="space-y-6">
            {/* Mobile Hero */}
            <div className={`text-center ${showMessage ? "animate-fade-in-up" : "opacity-0"}`}>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Happy Birthday
              </h1>
              <h2 className="text-xl font-bold text-pink-600 mb-4">{girlfriendName}! 💖</h2>

              {/* Mobile Rotating Quotes */}
              <div className="h-12 flex items-center justify-center px-2">
                <p className="text-sm text-gray-700 italic text-center transition-all duration-1000">
                  {loveQuotes[currentQuote]}
                </p>
              </div>
            </div>

            {/* Mobile Message Card */}
            <div className={`${showMessage ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
              <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-pink-200">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3">
                      <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-pulse" />
                    </div>
                    <h3 className="text-lg font-bold text-pink-700 mb-3">A Letter From My Heart</h3>
                  </div>

                  <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                    <p>My dearest {girlfriendName},</p>

                    <p>
                      On this special day, I find myself overwhelmed with gratitude for having you in my world. You are
                      not just my girlfriend ; you are my best friend, and the love of my life.
                    </p>

                    <p>
                      Every memory we are created together is a treasure I hold close to my heart. 
                    </p>

                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl text-center my-4">
                      <p className="text-base font-bold text-purple-700 mb-2">
                         You are my greatest adventure and sweetest dream
                      </p>
                      <p className="text-sm text-pink-600 font-semibold">Happy Birthday, my love! 🌟💕</p>
                    </div>

                    <p className="text-right font-semibold text-pink-600 text-sm">With all my love, always ❤️</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mobile Album CTA */}
            <div className={`${showMessage ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "1s" }}>
              <Card className="bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-amber-800 mb-2">Album của tụi mình</h3>
                  <p className="text-amber-700 text-sm mb-4">
                    Anh tạo ra album này dựa trên những kỉ niệm của tụi mình đó
                  </p>
                  <Button
                    onClick={() => setShowAlbum(true)}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md w-full"
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Mở album
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Photo Album */}
      <MobilePhotoAlbum isOpen={showAlbum} onClose={() => setShowAlbum(false)} />
    </div>
  )
}
