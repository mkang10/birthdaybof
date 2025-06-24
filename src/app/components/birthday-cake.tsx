"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/enhanced-button"
import { Mic, MicOff } from "lucide-react"

interface BirthdayCakeProps {
  onCandlesBlow: () => void
}

export function BirthdayCake({ onCandlesBlow }: BirthdayCakeProps) {
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

      // Chỉ check mỗi 100ms thôi (giảm tải)
      if (time - lastCheckTime > 100) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current)
        const volume = dataArrayRef.current.reduce((a, b) => a + b, 0) / dataArrayRef.current.length

        if (volume > 10 && candlesLit) {
          setCandlesLit(false)
          setShowFireworks(true)
          onCandlesBlow()

          if (audioRef.current) {
            audioRef.current.play()
          }

          // Hide fireworks after 3 seconds
          setTimeout(() => setShowFireworks(false), 3000)
        }

        lastCheckTime = time
      }

      // Chỉ tiếp tục check nếu còn nến đang cháy
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
        console.error("Không thể truy cập micro:", err)
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

  const relightCandles = () => {
    setCandlesLit(true)
    setShowFireworks(false)
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* Fireworks Effect */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-4 h-4 animate-ping ${
                ["bg-pink-400", "bg-purple-400", "bg-yellow-400", "bg-red-400", "bg-blue-400"][i % 5]
              } rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      )}

      {/* Birthday Cake */}
      <div className="relative mb-6">
        {/* Cake Base */}
        <div className="relative">
          {/* Bottom Layer */}
          <div className="w-48 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-lg shadow-lg relative">
            <div className="absolute inset-x-2 top-1 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute inset-x-4 bottom-2 h-1 bg-pink-500 rounded-full"></div>
          </div>

          {/* Middle Layer */}
          <div className="w-40 h-14 bg-gradient-to-b from-purple-300 to-purple-400 rounded-lg shadow-lg relative -mt-2 mx-auto">
            <div className="absolute inset-x-2 top-1 h-2 bg-white rounded-full opacity-60"></div>
            <div className="absolute inset-x-3 bottom-2 h-1 bg-purple-500 rounded-full"></div>
          </div>

          {/* Top Layer */}
          <div className="w-32 h-12 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg shadow-lg relative -mt-2 mx-auto">
            <div className="absolute inset-x-2 top-1 h-1 bg-white rounded-full opacity-60"></div>
            <div className="absolute inset-x-3 bottom-2 h-1 bg-yellow-500 rounded-full"></div>
          </div>

          {/* Candles */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="relative">
                {/* Candle */}
                <div className="w-2 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-full shadow-sm"></div>
                {/* Flame */}
                {candlesLit && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-4 bg-gradient-to-t from-orange-400 via-yellow-400 to-yellow-200 rounded-full animate-pulse opacity-90 shadow-lg"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                  </div>
                )}
                {/* Smoke effect when blown out */}
                {!candlesLit && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-6 bg-gray-400 opacity-50 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 items-center">
        <Button
          onClick={toggleMic}
          variant={micEnabled ? "default" : "outline"}
          className={`${micEnabled ? "bg-pink-500 hover:bg-pink-600" : ""}`}
        >
          {micEnabled ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
          {micEnabled ? "Listening..." : "Enable Mic"}
        </Button>

        {!candlesLit && (
          <Button onClick={relightCandles} variant="outline">
            🕯️ Relight Candles
          </Button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center">
        {micEnabled && candlesLit && (
          <p className="text-pink-600 font-medium animate-pulse">💨 Make a wish and blow out the candles! 💨</p>
        )}
        {!candlesLit && (
          <p className="text-purple-600 font-bold text-lg">
            🎉 Happy Birthday, Beautiful! Your wish will come true! 🎉
          </p>
        )}
      </div>

      {/* Hidden audio element for celebration sound */}
      <audio ref={audioRef} preload="auto">
        <source
          src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
          type="audio/wav"
        />
      </audio>
    </div>
  )
}
