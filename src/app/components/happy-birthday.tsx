"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/romantic-card"
import { Heart } from "lucide-react"
import { MobileCowCake } from "./mobile-cow-cake"
import { EnhancedMessageScreen } from "./enhanced-message-screen"

export default function Component() {
    const [showMessageScreen, setShowMessageScreen] = useState(false)
    const [girlfriendName, setGirlfriendName] = useState("Bò iu")

    const handleCandlesBlow = () => {
        setTimeout(() => {
            setShowMessageScreen(true)
        }, 4000)
    }

    const handleBackToCelebration = () => {
        setShowMessageScreen(false)
    }

    if (showMessageScreen) {
        return <EnhancedMessageScreen girlfriendName={girlfriendName} onBack={handleBackToCelebration} />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 relative">
            {/* Minimal Background - Only 3 hearts for mobile */}
            <div className="absolute inset-0 pointer-events-none opacity-15">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Heart
                        key={i}
                        className="absolute w-3 h-3 text-pink-300 animate-pulse"
                        style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 25}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: "4s",
                        }}
                    />
                ))}
            </div>

            {/* Mobile-First Layout */}
            <div className="relative z-10 min-h-screen flex flex-col justify-center p-4">
                <div className="max-w-sm mx-auto w-full space-y-8">
                    {/* Ultra Clean Mobile Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent leading-tight">
                            Happy Birthday
                        </h1>

                        <div className="space-y-3">
                          <div className="text-xl font-semibold text-pink-600 text-center w-full drop-shadow-md animate-pulse">
  {girlfriendName === "Bò iu" ? "Bof" : girlfriendName}
</div>


                            <div className="flex justify-center items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                                <p className="text-sm text-gray-600 italic">Gửi tới công chúa đít toa</p>
                                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Cake Card */}
                    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-pink-100">
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-xl font-bold text-pink-700 mb-2">Ước đi em</h2>
                                    <p className="text-sm text-gray-600">Nhắm mắt rồi thổi đi cục zàng</p>
                                    <p className="text-sm text-gray-600">Nhắm mắt rồi thổi đi cục zàng</p>
                                    <p className="text-sm text-gray-600">Nhắm mắt rồi thổi đi cục zàng</p>

                                </div>

                                <MobileCowCake onCandlesBlow={handleCandlesBlow} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Simple Mobile Quote */}
                    <Card className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 shadow-md">
                        <CardContent className="p-6 text-center">
                            <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse mx-auto mb-3" />
                            <p className="text-base text-gray-700 italic mb-3 leading-relaxed">
                                
                            </p>
                            <p className="text-sm text-pink-600 font-semibold">je veux me réveiller tous les jours à tes côtes, {girlfriendName} 💕</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
