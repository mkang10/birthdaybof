"use client"

import { useState } from "react"
import { Button } from "./ui/enhanced-button"
import { Card } from "./ui/romantic-card"
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"

const birthdaySongs = [
  { title: "Happy Birthday Classic", duration: "0:30" },
  { title: "Birthday Celebration", duration: "0:45" },
  { title: "Party Time", duration: "0:35" },
]

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [volume, setVolume] = useState(50)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % birthdaySongs.length)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + birthdaySongs.length) % birthdaySongs.length)
  }

  return (
    <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
      <div className="text-center mb-4">
        <h3 className="font-bold text-lg text-purple-800">🎵 Birthday Playlist</h3>
        <p className="text-sm text-purple-600">{birthdaySongs[currentSong].title}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <Button variant="outline" size="sm" onClick={prevSong}>
          <SkipBack className="w-4 h-4" />
        </Button>
        <Button onClick={togglePlay} className="bg-purple-600 hover:bg-purple-700">
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button variant="outline" size="sm" onClick={nextSong}>
          <SkipForward className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 className="w-4 h-4 text-purple-600" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </Card>
  )
}
