"use client"

import { useState } from "react"
import { Card } from "./ui/romantic-card"
import { Button } from "./ui/enhanced-button"
import { X, Heart } from "lucide-react"

const memoryPhotos = [
  { id: 1, src: "/placeholder.svg?height=200&width=200", caption: "First Birthday 🎂" },
  { id: 2, src: "/placeholder.svg?height=200&width=200", caption: "Sweet 16 🌟" },
  { id: 3, src: "/placeholder.svg?height=200&width=200", caption: "College Graduation 🎓" },
  { id: 4, src: "/placeholder.svg?height=200&width=200", caption: "Wedding Day 💒" },
  { id: 5, src: "/placeholder.svg?height=200&width=200", caption: "Family Vacation 🏖️" },
  { id: 6, src: "/placeholder.svg?height=200&width=200", caption: "Last Year's Party 🎉" },
]

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set())

  const toggleLike = (photoId: number) => {
    const newLiked = new Set(likedPhotos)
    if (newLiked.has(photoId)) {
      newLiked.delete(photoId)
    } else {
      newLiked.add(photoId)
    }
    setLikedPhotos(newLiked)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6 text-purple-800">📸 Memory Lane</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {memoryPhotos.map((photo) => (
          <Card
            key={photo.id}
            className="relative overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-200"
            onClick={() => setSelectedPhoto(photo.id)}
          >
            <img src={photo.src || "/placeholder.svg"} alt={photo.caption} className="w-full h-32 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-xs">{photo.caption}</div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 p-1 bg-white/80 hover:bg-white"
              onClick={(e) => {
                e.stopPropagation()
                toggleLike(photo.id)
              }}
            >
              <Heart
                className={`w-4 h-4 ${likedPhotos.has(photo.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </Button>
          </Card>
        ))}
      </div>

      {/* Modal for selected photo */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full">
            <img
              src={memoryPhotos.find((p) => p.id === selectedPhoto)?.src || "/placeholder.svg"}
              alt="Selected memory"
              className="w-full h-auto rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
              <p className="text-lg font-semibold">{memoryPhotos.find((p) => p.id === selectedPhoto)?.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
