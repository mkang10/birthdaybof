"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/enhanced-button"
import { Mic, MicOff } from "lucide-react"

interface StunningCakeProps {
  onCandlesBlow: () => void
}

export function StunningCake({ onCandlesBlow }: StunningCakeProps) {
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

          setTimeout(() => {
            onCandlesBlow()
          }, 2000)

          // try to play the celebration sound; ignore any abort/interruption errors
          audioRef.current?.play().catch(() => {
            /* Safari or quick-unmount can throw AbortError – it’s safe to ignore */
          })
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
        audioContextRef.current = null // ensure we never try again
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
      {/* Enhanced Fireworks Effect */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className={`absolute animate-ping ${
                [
                  "bg-pink-400",
                  "bg-purple-400",
                  "bg-yellow-400",
                  "bg-red-400",
                  "bg-blue-400",
                  "bg-green-400",
                  "bg-orange-400",
                  "bg-indigo-400",
                ][i % 8]
              } rounded-full`}
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 3D Cake Container */}
      <div className="relative mb-8 perspective-1000">
        {/* Cake Table/Stand */}
        <div className="absolute -bottom-8 -left-16 w-96 h-12 bg-gradient-to-b from-amber-100 to-amber-200 rounded-full shadow-2xl transform rotate-x-60 opacity-90"></div>

        {/* Table Legs */}
        <div className="absolute -bottom-20 left-8 w-3 h-12 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full shadow-lg"></div>
        <div className="absolute -bottom-20 right-8 w-3 h-12 bg-gradient-to-b from-amber-200 to-amber-300 rounded-full shadow-lg"></div>

        {/* Stunning 3D Cake */}
        <div className="relative transform-gpu">
          {/* Bottom Layer - Chocolate */}
          <div className="relative w-80 h-24 bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-3xl shadow-2xl transform-gpu">
            {/* 3D Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-amber-400 to-transparent rounded-t-3xl opacity-60"></div>

            {/* Decorative Frosting Border */}
            <div className="absolute -top-2 left-4 right-4 h-4 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-full shadow-lg"></div>

            {/* Chocolate Chips */}
            <div className="absolute top-4 left-8 w-2 h-2 bg-amber-900 rounded-full shadow-sm"></div>
            <div className="absolute top-6 right-12 w-2 h-2 bg-amber-900 rounded-full shadow-sm"></div>
            <div className="absolute top-8 left-1/2 w-2 h-2 bg-amber-900 rounded-full shadow-sm"></div>

            {/* Decorative Roses */}
            <div className="absolute top-2 left-12 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
            <div className="absolute top-2 right-12 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg"></div>
          </div>

          {/* Middle Layer - Strawberry */}
          <div className="relative w-64 h-20 bg-gradient-to-b from-pink-300 via-pink-400 to-pink-500 rounded-3xl shadow-xl -mt-4 mx-auto transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-200/30 to-transparent rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-pink-200 to-transparent rounded-t-3xl opacity-70"></div>

            {/* Cream Decoration */}
            <div className="absolute -top-2 left-6 right-6 h-3 bg-gradient-to-r from-white via-pink-100 to-white rounded-full shadow-md"></div>

            {/* Strawberry Pieces */}
            <div className="absolute top-3 left-10 w-3 h-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-sm"></div>
            <div className="absolute top-5 right-10 w-3 h-3 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-sm"></div>

            {/* Gold Decoration */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-sm"></div>
          </div>

          {/* Top Layer - Vanilla */}
          <div className="relative w-48 h-16 bg-gradient-to-b from-yellow-100 via-yellow-200 to-yellow-300 rounded-3xl shadow-lg -mt-3 mx-auto transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-50/40 to-transparent rounded-3xl"></div>
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-white to-transparent rounded-t-3xl opacity-80"></div>

            {/* Top Cream */}
            <div className="absolute -top-1 left-4 right-4 h-2 bg-gradient-to-r from-white via-yellow-50 to-white rounded-full shadow-sm"></div>

            {/* Vanilla Decoration */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
          </div>

          {/* Magnificent Candles */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="relative">
                {/* Candle Body with 3D effect */}
                <div
                  className={`w-4 h-12 rounded-full shadow-xl relative ${
                    [
                      "bg-gradient-to-b from-red-300 via-red-400 to-red-600",
                      "bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600",
                      "bg-gradient-to-b from-green-300 via-green-400 to-green-600",
                      "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600",
                      "bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600",
                      "bg-gradient-to-b from-pink-300 via-pink-400 to-pink-600",
                      "bg-gradient-to-b from-orange-300 via-orange-400 to-orange-600",
                      "bg-gradient-to-b from-indigo-300 via-indigo-400 to-indigo-600",
                      "bg-gradient-to-b from-teal-300 via-teal-400 to-teal-600",
                    ][i]
                  }`}
                >
                  {/* 3D highlight */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-white/30 rounded-l-full"></div>
                </div>

                {/* Candle Wick */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-gray-800 rounded-full shadow-sm"></div>

                {/* Spectacular Flame */}
                {candlesLit && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      {/* Outer flame glow */}
                      <div className="absolute -inset-2 w-8 h-8 bg-orange-300 rounded-full opacity-20 blur-md animate-pulse"></div>

                      {/* Main flame */}
                      <div className="w-5 h-7 bg-gradient-to-t from-orange-600 via-yellow-400 to-yellow-200 rounded-full animate-pulse shadow-lg relative">
                        {/* Inner flame */}
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse"></div>
                        {/* Flame core */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-blue-200 rounded-full animate-pulse"></div>
                      </div>

                      {/* Flame flicker effect */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full opacity-40 blur-sm animate-ping"></div>
                    </div>
                  </div>
                )}

                {/* Smoke when blown out */}
                {!candlesLit && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-10 bg-gradient-to-t from-gray-400 via-gray-300 to-transparent opacity-70 rounded-full animate-pulse blur-sm"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gray-200 opacity-40 rounded-full animate-pulse blur-md"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute -left-20 top-12 w-6 h-6 bg-pink-300 rounded-full opacity-70 animate-float shadow-lg"></div>
          <div className="absolute -right-20 top-12 w-8 h-8 bg-purple-300 rounded-full opacity-70 animate-float-delayed shadow-lg"></div>
          <div className="absolute -left-16 -top-8 w-4 h-4 bg-yellow-300 rounded-full opacity-70 animate-float-slow shadow-lg"></div>
          <div className="absolute -right-16 -top-8 w-5 h-5 bg-blue-300 rounded-full opacity-70 animate-float-delayed shadow-lg"></div>
        </div>
      </div>

      {/* Enhanced Controls */}
      <div className="flex flex-col items-center gap-6 mt-8">
        <Button
          onClick={toggleMic}
          size="lg"
          className={`${
            micEnabled
              ? "bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:via-rose-600 hover:to-purple-700 text-white shadow-2xl"
              : "bg-white/90 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 shadow-xl"
          } px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm`}
        >
          {micEnabled ? <Mic className="w-6 h-6 mr-3" /> : <MicOff className="w-6 h-6 mr-3" />}
          {micEnabled ? "Listening for Magic..." : "Enable Microphone"}
        </Button>

        {/* Beautiful Instructions */}
        <div className="text-center max-w-lg">
          {micEnabled && candlesLit && (
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-pink-200/50">
              <div className="flex justify-center mb-3">
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse mr-2"></div>
                <div
                  className="w-3 h-3 bg-purple-400 rounded-full animate-pulse mr-2"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
              <p className="text-pink-600 font-semibold text-xl animate-pulse">
                💨 Close your eyes, make your most beautiful wish, and blow gently... 💨
              </p>
              <p className="text-gray-500 text-sm mt-2">The magic is waiting for you ✨</p>
            </div>
          )}
          {!candlesLit && (
            <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100 p-8 rounded-3xl shadow-2xl border border-pink-200">
              <p className="text-purple-700 font-bold text-2xl mb-3">🎉 Your wish has been captured! 🎉</p>
              <p className="text-gray-600 text-lg">Something magical is about to unfold...</p>
              <div className="flex justify-center mt-4">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce mr-1"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce mr-1"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}
        </div>
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
