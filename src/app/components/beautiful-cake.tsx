"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/enhanced-button"
import { Mic, MicOff } from "lucide-react"

interface BeautifulCakeProps {
  onCandlesBlow: () => void
}

export function BeautifulCake({ onCandlesBlow }: BeautifulCakeProps) {
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

        if (volume > 10 && candlesLit) {
          setCandlesLit(false)
          setShowFireworks(true)

          // Delay the callback to show fireworks first
          setTimeout(() => {
            onCandlesBlow()
          }, 1500)

          if (audioRef.current) {
            audioRef.current.play()
          }
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
      if (audioContextRef.current) audioContextRef.current.close()
    }
  }, [candlesLit, micEnabled, onCandlesBlow])

  const toggleMic = () => {
    setMicEnabled(!micEnabled)
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none z-30 w-screen h-screen">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-6 h-6 animate-ping ${
                ["bg-pink-400", "bg-purple-400", "bg-yellow-400", "bg-red-400", "bg-blue-400", "bg-green-400"][i % 6]
              } rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "2s",
              }}
            />
          ))}
        </div>
      )}

      {/* Beautiful Birthday Cake */}
      <div className="relative mb-8">
        {/* Cake Plate */}
        <div className="absolute -bottom-4 -left-8 w-80 h-8 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-2xl opacity-80"></div>

        {/* Cake Base - Bottom Layer */}
        <div className="relative">
          <div className="w-64 h-20 bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400 rounded-2xl shadow-2xl relative overflow-hidden">
            {/* Decorative frosting waves */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-white via-pink-100 to-white opacity-80 rounded-t-2xl"></div>
            <div className="absolute bottom-2 left-4 right-4 h-2 bg-pink-500 rounded-full opacity-60"></div>
            {/* Decorative roses */}
            <div className="absolute top-2 left-8 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
            <div className="absolute top-2 right-8 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-400 rounded-full shadow-sm"></div>
          </div>

          {/* Middle Layer */}
          <div className="w-48 h-16 bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400 rounded-2xl shadow-xl relative -mt-2 mx-auto overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-white via-purple-100 to-white opacity-80 rounded-t-2xl"></div>
            <div className="absolute bottom-2 left-3 right-3 h-1 bg-purple-500 rounded-full opacity-60"></div>
            {/* Decorative elements */}
            <div className="absolute top-1 left-6 w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
            <div className="absolute top-1 right-6 w-2 h-2 bg-yellow-400 rounded-full shadow-sm"></div>
          </div>

          {/* Top Layer */}
          <div className="w-32 h-12 bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-2xl shadow-lg relative -mt-2 mx-auto overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-white via-yellow-100 to-white opacity-80 rounded-t-2xl"></div>
            <div className="absolute bottom-1 left-2 right-2 h-1 bg-yellow-500 rounded-full opacity-60"></div>
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
                ></div>

                {/* Candle Wick */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-gray-800 rounded-full"></div>

                {/* Beautiful Flame */}
                {candlesLit && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {/* Outer flame */}
                      <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse opacity-90 shadow-lg"></div>
                      {/* Inner flame */}
                      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gradient-to-t from-red-400 to-yellow-300 rounded-full animate-pulse"></div>
                      {/* Flame core */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                      {/* Glow effect */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-300 rounded-full opacity-30 blur-sm animate-pulse"></div>
                    </div>
                  </div>
                )}

                {/* Smoke effect when blown out */}
                {!candlesLit && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-8 bg-gradient-to-t from-gray-400 to-transparent opacity-60 rounded-full animate-pulse"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gray-300 opacity-40 rounded-full animate-pulse blur-sm"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Decorative elements around cake */}
          <div
            className="absolute -left-12 top-8 w-8 h-8 bg-pink-300 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute -right-12 top-8 w-6 h-6 bg-purple-300 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute -left-8 -top-4 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -right-8 -top-4 w-5 h-5 bg-blue-300 rounded-full opacity-60 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={toggleMic}
          size="lg"
          variant={micEnabled ? "default" : "outline"}
          className={`${
            micEnabled
              ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
              : "border-pink-300 text-pink-600 hover:bg-pink-50"
          } px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105`}
        >
          {micEnabled ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
          {micEnabled ? "Đang Lắng Nghe Điều Ước Của Em..." : "Nhớ Cho Phép Sử Dụng Loa Nha"}
        </Button>

        {/* Instructions */}
        <div className="text-center max-w-md">
          {micEnabled && candlesLit && (
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-pink-200">
              <p className="text-pink-600 font-medium animate-pulse text-lg">
                💨 Close your eyes, make a wish, and blow gently into your microphone! 💨
              </p>
            </div>
          )}
          {!candlesLit && (
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-2xl shadow-lg">
              <p className="text-purple-700 font-bold text-xl mb-2">🎉 Your wish has been heard! 🎉</p>
              <p className="text-gray-600">Something magical is about to happen...</p>
            </div>
          )}
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </div>
  )
}
