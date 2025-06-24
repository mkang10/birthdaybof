"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/enhanced-button"
import { Mic, MicOff } from "lucide-react"

interface MobileCowCakeProps {
  onCandlesBlow: () => void
}

export function MobileCowCake({ onCandlesBlow }: MobileCowCakeProps) {
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

      if (time - lastCheckTime > 1000) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        const volume = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length

        if (volume > 10 && candlesLit) {
          setCandlesLit(false)
          setShowFireworks(true)

          setTimeout(() => {
            onCandlesBlow()
          }, 3000)

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
      {/* Fireworks Shooting from Cake */}
      {showFireworks && (
        <div
          className="absolute inset-0 pointer-events-none z-50"
          style={{ width: "100vw", height: "100vh", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          {/* Fireworks shooting from cake center */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = i * 45 * (Math.PI / 180) // 8 directions
            const distance = 150 + Math.random() * 100
            const endX = Math.cos(angle) * distance
            const endY = Math.sin(angle) * distance

            return (
              <div
                key={`rocket-${i}`}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                {/* Rocket trail */}
                <div
                  className="absolute w-1 h-8 bg-gradient-to-t from-yellow-400 to-transparent rounded-full"
                  style={{
                    transform: `rotate(${angle * (180 / Math.PI) + 90}deg)`,
                    animation: `shoot-${i} 1s ease-out forwards`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />

                {/* Explosion at end */}
                <div
                  className="absolute"
                  style={{
                    left: `${endX}px`,
                    top: `${endY}px`,
                    animation: `explode-${i} 2s ease-out forwards`,
                    animationDelay: `${1 + i * 0.1}s`,
                  }}
                >
                  {/* Central burst */}
                  <div
                    className={`w-6 h-6 ${["bg-pink-400", "bg-purple-400", "bg-yellow-400", "bg-red-400", "bg-blue-400", "bg-green-400", "bg-orange-400", "bg-indigo-400"][i]} rounded-full animate-ping`}
                  />

                  {/* Radiating sparks */}
                  {Array.from({ length: 12 }).map((_, j) => (
                    <div
                      key={j}
                      className={`absolute w-2 h-2 ${["bg-pink-300", "bg-purple-300", "bg-yellow-300", "bg-red-300", "bg-blue-300", "bg-green-300"][j % 6]} rounded-full animate-ping`}
                      style={{
                        left: `${Math.cos(j * 30 * (Math.PI / 180)) * 25}px`,
                        top: `${Math.sin(j * 30 * (Math.PI / 180)) * 25}px`,
                        animationDelay: `${j * 0.05}s`,
                        animationDuration: "1.5s",
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Additional sparkles falling down */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={`fall-${i}`}
              className={`absolute w-1 h-1 ${["bg-pink-400", "bg-purple-400", "bg-yellow-400", "bg-red-400", "bg-blue-400"][i % 5]} rounded-full`}
              style={{
                left: `${30 + Math.random() * 40}%`,
                top: "20%",
                animation: `fall 3s linear forwards`,
                animationDelay: `${1.5 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Mobile-Optimized Cow Print Cake */}
      <div className="relative mb-6">
        {/* Cake Plate */}
        <div className="absolute -bottom-4 -left-8 w-56 h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 rounded-full shadow-lg opacity-90"></div>

        {/* Bottom Layer - Mobile Size */}
        <div className="relative w-48 h-16 bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Cow spots - optimized for mobile */}
          <div className="absolute top-1 left-3 w-6 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-4 right-6 w-4 h-6 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-2 left-8 w-7 h-3 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-6 left-1/2 w-3 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-1 right-3 w-4 h-3 bg-black rounded-full opacity-80"></div>

          {/* Pink frosting border */}
          <div className="absolute -top-0.5 left-1 right-1 h-2 bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 rounded-full shadow-sm"></div>
        </div>

        {/* Middle Layer */}
        <div className="relative w-36 h-12 bg-white rounded-xl shadow-lg -mt-1 mx-auto overflow-hidden">
          {/* Cow spots */}
          <div className="absolute top-0.5 left-4 w-4 h-3 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-3 right-4 w-3 h-4 bg-black rounded-full opacity-80"></div>
          <div className="absolute bottom-1 left-1/2 w-3 h-2 bg-black rounded-full opacity-80"></div>

          {/* Purple frosting border */}
          <div className="absolute -top-0.5 left-1 right-1 h-1.5 bg-gradient-to-r from-purple-300 via-purple-200 to-purple-300 rounded-full shadow-sm"></div>
        </div>

        {/* Top Layer */}
        <div className="relative w-24 h-8 bg-white rounded-xl shadow-md -mt-1 mx-auto overflow-hidden">
          {/* Cow spots */}
          <div className="absolute top-0.5 left-2 w-3 h-2 bg-black rounded-full opacity-80"></div>
          <div className="absolute top-2 right-3 w-2 h-3 bg-black rounded-full opacity-80"></div>

          {/* Yellow frosting border */}
          <div className="absolute -top-0.5 left-1 right-1 h-1 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 rounded-full shadow-sm"></div>
        </div>

        {/* Mobile-Optimized Candles */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative">
              {/* Candle Body */}
              <div
                className={`w-2 h-7 rounded-full shadow-md ${
                  [
                    "bg-gradient-to-b from-red-300 to-red-500",
                    "bg-gradient-to-b from-blue-300 to-blue-500",
                    "bg-gradient-to-b from-green-300 to-green-500",
                    "bg-gradient-to-b from-purple-300 to-purple-500",
                    "bg-gradient-to-b from-pink-300 to-pink-500",
                  ][i]
                }`}
              >
                <div className="absolute top-0 left-0 w-0.5 h-full bg-white/30 rounded-l-full"></div>
              </div>

              {/* Wick */}
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-1.5 bg-gray-800 rounded-full"></div>

              {/* Flame */}
              {candlesLit && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-3 h-4 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse shadow-md">
                    <div className="absolute top-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-2 bg-gradient-to-t from-red-400 to-yellow-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Smoke when blown out */}
              {!candlesLit && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-4 bg-gradient-to-t from-gray-400 to-transparent opacity-60 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ultra Clean Mobile Controls */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        <Button
          onClick={toggleMic}
          size="lg"
          className={`${
            micEnabled
              ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
              : "bg-white border-2 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-md"
          } w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300`}
        >
          {micEnabled ? <Mic className="w-5 h-5 mr-2" /> : <MicOff className="w-5 h-5 mr-2" />}
          {micEnabled ? "Đang lắng nghe điều ước của em..." : "Mở cái mic lên"}
        </Button>

        {/* Minimal Instructions */}
        {micEnabled && candlesLit && (
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-md border border-pink-200 w-full text-center">
            <p className="text-pink-600 font-medium text-base">💨 Ước rồi thổi nến đi em 💨</p>
          </div>
        )}

        {!candlesLit && (
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-xl shadow-md w-full text-center">
            <p className="text-purple-700 font-semibold text-base">🎉 Điều ước của em đang được gửi tới mạnh kang! 🎉</p>
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

      {/* Dynamic CSS for firework animations */}
      <style jsx>{`
        ${Array.from({ length: 8 })
          .map((_, i) => {
            const angle = i * 45 * (Math.PI / 180)
            const distance = 150 + Math.random() * 100
            const endX = Math.cos(angle) * distance
            const endY = Math.sin(angle) * distance

            return `
            @keyframes shoot-${i} {
              0% { transform: translate(0, 0) rotate(${angle * (180 / Math.PI) + 90}deg) scale(1); opacity: 1; }
              100% { transform: translate(${endX}px, ${endY}px) rotate(${angle * (180 / Math.PI) + 90}deg) scale(0); opacity: 0; }
            }
            
            @keyframes explode-${i} {
              0% { transform: scale(0); opacity: 0; }
              20% { transform: scale(1.5); opacity: 1; }
              100% { transform: scale(3); opacity: 0; }
            }
          `
          })
          .join("")}
        
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
