"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/enhanced-button"
import { Mic, MicOff } from "lucide-react"

interface CowPrintCakeProps {
  onCandlesBlow: () => void
}

export function CowPrintCake({ onCandlesBlow }: CowPrintCakeProps) {
  const [candlesLit, setCandlesLit] = useState(true)
  const [micEnabled, setMicEnabled] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)

  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let animationFrameId: number
    let lastCheckTime = 0

    const detectBlow = (time: number) => {
      if (!analyserRef.current || !dataArrayRef.current) return

      if (time - lastCheckTime > 100) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        const volume = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length

        if (volume > 100 && candlesLit) {
          setCandlesLit(false)
          setShowFireworks(true)

          setTimeout(() => {
            onCandlesBlow()
          }, 2000)

          audioRef.current?.play().catch(() => {})
        }

        lastCheckTime = time
      }

      if (candlesLit && micEnabled) {
        animationFrameId = requestAnimationFrame(detectBlow)
      }
    }

    const initMic = async () => {
      if (!micEnabled) return

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        const source = audioContextRef.current.createMediaStreamSource(stream)
        const analyser = audioContextRef.current.createAnalyser()
        source.connect(analyser)
        analyser.fftSize = 512

        const bufferLength = analyser.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)

        analyserRef.current = analyser
        dataArrayRef.current = dataArray

        animationFrameId = requestAnimationFrame(detectBlow)
      } catch (err) {
        console.error("Cannot access microphone:", err)
        setMicEnabled(false)
      }
    }

    if (micEnabled && candlesLit) {
      initMic()
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => null)
        audioContextRef.current = null
      }
    }
  }, [candlesLit, micEnabled, onCandlesBlow])

  const toggleMic = () => {
    setMicEnabled(!micEnabled)
    if (micEnabled && audioContextRef.current && audioContextRef.current.state !== "closed") {
      audioContextRef.current.close().catch(() => null)
      audioContextRef.current = null
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-ping ${
                ["bg-pink-400", "bg-purple-400", "bg-yellow-400", "bg-red-400", "bg-blue-400"][i % 5]
              } rounded-full`}
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cow Print Birthday Cake */}
      <div className="relative mb-8">
        {/* Cake Plate */}
        <div className="absolute -bottom-6 -left-12 w-72 h-6 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-xl opacity-90"></div>

        {/* Bottom Layer - Cow Print */}
        <div className="relative w-64 h-20 bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Cow spots */}
          <div className="absolute top-2 left-4 w-8 h-6 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-6 right-8 w-6 h-8 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-4 left-12 w-10 h-5 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-8 left-1/2 w-4 h-6 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-2 right-4 w-6 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-1 right-1/3 w-5 h-4 bg-black rounded-full opacity-80"></div>

          {/* Pink frosting border */}
          <div className="absolute -top-1 left-2 right-2 h-3 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-full shadow-md"></div>
        </div>

        {/* Middle Layer - Cow Print */}
        <div className="relative w-48 h-16 bg-white rounded-2xl shadow-xl -mt-2 mx-auto overflow-hidden">
          {/* Cow spots */}
          <div className="absolute top-1 left-6 w-6 h-5 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-4 right-6 w-5 h-6 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-2 left-1/2 w-4 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-2 right-1/3 w-3 h-5 bg-black rounded-full opacity-80"></div>

          {/* Purple frosting border */}
          <div className="absolute -top-1 left-2 right-2 h-2 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 rounded-full shadow-md"></div>
        </div>

        {/* Top Layer - Cow Print */}
        <div className="relative w-32 h-12 bg-white rounded-2xl shadow-lg -mt-2 mx-auto overflow-hidden">
          {/* Cow spots */}
          <div className="absolute top-1 left-3 w-4 h-3 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-3 right-4 w-3 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-1 left-1/2 w-3 h-3 bg-black rounded-full opacity-80"></div>

          {/* Yellow frosting border */}
          <div className="absolute -top-1 left-2 right-2 h-2 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-full shadow-sm"></div>
        </div>

        {/* Beautiful Candles */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="relative">
              {/* Candle Body */}
              <div
                className={`w-3 h-10 rounded-full shadow-lg ${
                  [
                    "bg-gradient-to-b from-red-300 to-red-500",
                    "bg-gradient-to-b from-blue-300 to-blue-500",
                    "bg-gradient-to-b from-green-300 to-green-500",
                    "bg-gradient-to-b from-yellow-300 to-yellow-500",
                    "bg-gradient-to-b from-purple-300 to-purple-500",
                    "bg-gradient-to-b from-pink-300 to-pink-500",
                    "bg-gradient-to-b from-orange-300 to-orange-500",
                  ][i]
                }`}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-white/30 rounded-l-full"></div>
              </div>

              {/* Wick */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-800 rounded-full"></div>

              {/* Flame */}
              {candlesLit && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-5 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse shadow-lg">
                    <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-red-400 to-yellow-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Smoke when blown out */}
              {!candlesLit && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-6 bg-gradient-to-t from-gray-400 to-transparent opacity-60 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clean Controls */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={toggleMic}
          size="lg"
          className={`${
            micEnabled
              ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              : "bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50"
          } px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg`}
        >
          {micEnabled ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
          {micEnabled ? "Listening..." : "Mở Cái Loa Lên"}
        </Button>

        {/* Simple Instructions */}
        {micEnabled && candlesLit && (
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-pink-200 max-w-md text-center">
            <p className="text-pink-600 font-medium">💨 Make a wish and blow gently 💨</p>
          </div>
        )}

        {!candlesLit && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-2xl shadow-lg max-w-md text-center">
            <p className="text-purple-700 font-semibold">🎉 Your wish has been captured! 🎉</p>
          </div>
        )}
      </div>

      {/* Hidden audio */}
      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </div>
  )
}
