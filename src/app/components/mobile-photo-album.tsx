"use client"

import { useState } from "react"
import { Button } from "./ui/enhanced-button"
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react"

const albumPhotos = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1750773753/IMG_2731_duqxne.jpg",
    caption: "Sinh nhật năm ngoái nè",
    description:
      "hận ngày dâu rụng",
    date: "Quậy vl cười vl",
    location: "homestay đến ngày, tôi đã cay",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/v1750773751/78C50723-7DF2-4742-A283-D3E5E0B6C306_vek3k9.jpg",
    caption: "Mắc mưa + có áo mưa mới",
    description: "chuyện tình chúng ta đến bằng những cơn mưa.",
    date: "mưa vl cứ đứng chụp chụp",
    location: "không được ăn hủ tiếu - cay",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/f_auto,q_auto/IMG_7404_zmcusr.heic",
    caption: "Đi uống cà phê dở vl lại còn nhiều muỗi",
    description: "xing vl hê hê",
    date: "Nhưng cô ấy cute nên cũng được.",
    location:  "Cứ chu chu chu chu",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/IMG_2375_vaq5fo.jpg",
    caption: "Vẫn là uống cà phê nhưng là goodtrip",
    description: "một trong những tấm khá ưng.",
    date: "cà phê ngon vợ xing hết bài",
    location: "cà phê gì đó mà cô ấy xem được trên tóp top",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/IMG_2378_vz8lce.jpg",
    caption: "Góc đó nhưng tấm khác vì quá ưng hehe",
    description: "Ưng hoàng phúc luôn.",
    date: "cà phê ngon vợ xing hết bài",
    location: "cà phê gì đó mà cô ấy xem được trên tóp top",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/f_auto,q_auto/IMG_2050_mtl84n.heic",
    caption: "Chinh chinh thơm cho phát kk",
    description: "ôi nhớ cô ấy ghê",
    date: "cà phê ngon vợ xing hết bài",
    location: "cà phê gì đó mà cô ấy xem được trên tóp top",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/IMG_2405_leq4cz.jpg",
    caption: "Qua nhà tôi làm bài , thật là chăm chỉ",
    description: "bệnh nhưng vẫn quậy",
    date: "tôi là người làm bài cho cô ấy",
    location: "có thể là cười cả ngày",
  },
  {
    id: 7,
    src: "https://res.cloudinary.com/dvbbfcxdz/image/upload/f_auto,q_auto/IMG_2714_eysxu7.heic",
    caption: "Đi biên hoà chụp ptb",
    description: "răng sún + sún răng",
    date: "máy chụp nhanh vl, cảm thấy bị bịp",
    location: "10 điểm -1 vì quá đau đít có ô tô thì +1",
  },
]
interface MobilePhotoAlbumProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobilePhotoAlbum({ isOpen, onClose }: MobilePhotoAlbumProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev + 1) % albumPhotos.length)
      setIsTransitioning(false)
    }, 150)
  }

  const prevPhoto = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhoto((prev) => (prev - 1 + albumPhotos.length) % albumPhotos.length)
      setIsTransitioning(false)
    }, 150)
  }

  const goToPhoto = (index: number) => {
    if (isTransitioning || index === currentPhoto) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPhoto(index)
      setIsTransitioning(false)
    }, 150)
  }

  if (!isOpen) return null

  const photo = albumPhotos[currentPhoto]

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-900/80 to-purple-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-300 fill-pink-300" />
          <h2 className="text-lg font-bold text-white">Our Love Story</h2>
        </div>
        <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-2">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Mobile Photo Display */}
      <div className="flex-1 flex flex-col">
        {/* Main Photo */}
        <div className="flex-1 relative overflow-hidden">
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}>
            {/* Ensure correct aspect ratio and prevent distortion */}
            <div className="w-full h-full flex items-center justify-center">
              <img
                src={photo.src || "/placeholder.svg"}
                alt={photo.caption}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Photo overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Navigation arrows */}
            <Button
              onClick={prevPhoto}
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3"
              disabled={isTransitioning}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <Button
              onClick={nextPhoto}
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3"
              disabled={isTransitioning}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Photo Info */}
        <div className="bg-gradient-to-t from-black to-transparent p-6 text-white">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{photo.caption}</h3>
              <Heart className="w-5 h-5 text-red-400 fill-red-400 animate-pulse" />
            </div>

            <p className="text-pink-200 text-sm italic">{photo.date}</p>
            <p className="text-gray-300 text-xs">{photo.location}</p>
            <p className="text-gray-200 text-sm leading-relaxed">{photo.description}</p>
          </div>
        </div>

        {/* Mobile Thumbnail Strip */}
        <div className="bg-black/80 backdrop-blur-sm p-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {albumPhotos.map((thumbPhoto, index) => (
              <button
                key={thumbPhoto.id}
                onClick={() => goToPhoto(index)}
                className={`flex-shrink-0 relative ${
                  index === currentPhoto ? "ring-2 ring-pink-400 scale-110" : "opacity-60 hover:opacity-100"
                } transition-all duration-300 rounded-lg overflow-hidden`}>
                <img
                  src={thumbPhoto.src || "/placeholder.svg"}
                  alt={thumbPhoto.caption}
                  className="w-12 h-12 object-contain"
                />
                {index === currentPhoto && <div className="absolute inset-0 bg-pink-400/20 rounded-lg" />}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Photo Counter */}
        <div className="bg-black/60 backdrop-blur-sm p-3 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {albumPhotos.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPhoto ? "bg-pink-400 scale-125" : "bg-gray-500"
                }`} />
            ))}
          </div>
          <p className="text-gray-300 text-xs">
            {currentPhoto + 1} of {albumPhotos.length}
          </p>
        </div>
      </div>
    </div>
  )
}
