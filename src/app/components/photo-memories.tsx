"use client"

import { Card, CardContent } from "./ui/romantic-card"
import { Camera, Heart } from "lucide-react"

const memories = [
  {
    title: "Our First Date",
    description: "The day that started our beautiful journey together 💕",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Our First Trip",
    description: "Adventures are better when we're together 🌍",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Cozy Moments",
    description: "Simple moments that mean everything 🏠",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Special Occasions",
    description: "Celebrating life's beautiful moments 🎉",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export function PhotoMemories() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-pink-700 mb-2 flex items-center justify-center gap-2">
          <Camera className="w-8 h-8" />
          Our Beautiful Memories
          <Camera className="w-8 h-8" />
        </h3>
        <p className="text-gray-600">Every picture tells our love story 📖💕</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {memories.map((memory, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white border-pink-100"
          >
            <div className="relative">
              <img src={memory.image || "/placeholder.svg"} alt={memory.title} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="text-lg font-bold text-pink-700 mb-2">{memory.title}</h4>
              <p className="text-gray-600 italic">{memory.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
