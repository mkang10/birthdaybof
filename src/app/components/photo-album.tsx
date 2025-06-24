"use client"

import { useState } from "react"
import { Button } from "./ui/enhanced-button"
import { ChevronLeft, ChevronRight, Heart, BookOpen } from "lucide-react"

const albumPhotos = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Our First Date",
    description:
      "The moment I knew you were special - that nervous excitement, your beautiful smile, the way time seemed to stop when we talked. This was the beginning of our forever.",
    date: "The day my heart found its home",
    location: "That little café downtown",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Perfect Sunset Together",
    description:
      "Watching the sun paint the sky in colors that couldn't compare to the beauty I saw in your eyes. Every sunset since then reminds me of this perfect moment.",
    date: "When time stood still for us",
    location: "Our favorite spot by the lake",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Your Radiant Smile",
    description:
      "This photo captures what I see every day - pure joy, warmth, and the light that brightens every corner of my world. Your smile is my favorite sight.",
    date: "My daily dose of sunshine",
    location: "In our cozy living room",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Adventure Together",
    description:
      "Every journey with you is an adventure, whether we're exploring new places or just walking hand in hand. With you, even the ordinary becomes extraordinary.",
    date: "Making memories around the world",
    location: "That amazing trip we took",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Cozy Home Moments",
    description:
      "The quiet moments are just as precious - lazy Sunday mornings, cooking together, reading side by side. Home isn't a place, it's wherever you are.",
    date: "Finding magic in the everyday",
    location: "Our little sanctuary",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    caption: "Dancing in Our World",
    description:
      "Whether it's a fancy dinner or dancing in our kitchen, every moment with you feels like a celebration. You make ordinary moments feel like fairy tales.",
    date: "Every dance is perfect with you",
    location: "Anywhere music plays",
  },
]

// subtle dot-grid background as a data-URI
const dotGridBg =
  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f3f4f6' fillOpacity='0.1'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3C/g%3E%3C/svg%3E\")"

interface PhotoAlbumProps {
  isOpen: boolean
}

export default function PhotoAlbum({ isOpen }: PhotoAlbumProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const totalPages = Math.ceil(albumPhotos.length / 2)

  const flipPage = (direction: "next" | "prev") => {
    if (isFlipping) return

    setIsFlipping(true)
    setTimeout(() => {
      if (direction === "next" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1)
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(currentPage - 1)
      }
      setIsFlipping(false)
    }, 300)
  }

  const getPhotosForPage = (pageIndex: number) => {
    const startIndex = pageIndex * 2
    return albumPhotos.slice(startIndex, startIndex + 2)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-6xl w-full max-h-[90vh]">
        {/* Album Cover/Book */}
        <div className="relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-2xl shadow-2xl p-8 transform-gpu perspective-1000">
          {/* Book Binding */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-b from-amber-900 to-amber-800 rounded-l-2xl shadow-inner"></div>
          <div className="absolute left-2 top-4 bottom-4 w-1 bg-amber-600 rounded-full"></div>
          <div className="absolute left-2 top-8 bottom-8 w-0.5 bg-amber-500 rounded-full"></div>

          {/* Album Title */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-amber-200" />
              <h2 className="text-4xl font-bold text-amber-100">Our Love Story</h2>
              <Heart className="w-8 h-8 text-red-400 fill-red-400" />
            </div>
            <p className="text-amber-200 text-lg italic">A collection of our most precious moments</p>
          </div>

          {/* Photo Pages */}
          <div className="relative bg-cream-50 rounded-xl shadow-inner p-8 min-h-[500px]">
            {/* Page Background */}
            {/* parchment-tone gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl"></div>

            {/* dotted texture */}
            <div className="absolute inset-0 rounded-xl" style={{ backgroundImage: dotGridBg, opacity: 0.3 }} />

            {/* Current Page Content */}
            <div
              className={`relative z-10 transition-all duration-300 ${isFlipping ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
            >
              <div className="grid md:grid-cols-2 gap-8 h-full">
                {getPhotosForPage(currentPage).map((photo, index) => (
                  <div key={photo.id} className="relative group">
                    {/* Photo Frame */}
                    <div className="bg-white p-4 rounded-lg shadow-xl transform rotate-1 hover:rotate-0 transition-all duration-300 group-hover:scale-105">
                      <div className="relative overflow-hidden rounded-md">
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={photo.caption}
                          className="w-full h-64 object-cover"
                        />
                        {/* Photo Corner Tabs */}
                        <div className="absolute top-2 left-2 w-4 h-4 bg-white/80 transform rotate-45 shadow-sm"></div>
                        <div className="absolute top-2 right-2 w-4 h-4 bg-white/80 transform rotate-45 shadow-sm"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 bg-white/80 transform rotate-45 shadow-sm"></div>
                        <div className="absolute bottom-2 right-2 w-4 h-4 bg-white/80 transform rotate-45 shadow-sm"></div>
                      </div>

                      {/* Photo Caption */}
                      <div className="mt-4 space-y-2">
                        <h3 className="font-bold text-lg text-gray-800">{photo.caption}</h3>
                        <p className="text-sm text-gray-600 italic">{photo.date}</p>
                        <p className="text-xs text-gray-500">{photo.location}</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{photo.description}</p>
                      </div>

                      {/* Decorative Heart */}
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
                      </div>
                    </div>

                    {/* Handwritten-style note */}
                    <div className="absolute -bottom-4 -right-4 bg-yellow-200 p-2 rounded transform rotate-12 shadow-md opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs text-gray-700 font-handwriting">💕</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Page Navigation */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <Button
                onClick={() => flipPage("prev")}
                disabled={currentPage === 0 || isFlipping}
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentPage ? "bg-amber-600 scale-125" : "bg-amber-300"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={() => flipPage("next")}
                disabled={currentPage === totalPages - 1 || isFlipping}
                variant="outline"
                size="sm"
                className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Page Number */}
            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
