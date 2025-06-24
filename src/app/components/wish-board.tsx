"use client"

import { useState } from "react"
import { Button } from "./ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/romantic-card"
import { Textarea } from "./ui/textarea"
import { Heart, MessageCircle, Send } from "lucide-react"

interface Wish {
  id: number
  name: string
  message: string
  timestamp: Date
  likes: number
}

export function WishBoard() {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "Sarah",
      message: "Hope your special day is filled with all your favorite things! 🎂✨",
      timestamp: new Date(),
      likes: 5,
    },
    {
      id: 2,
      name: "Mike",
      message: "Another year older, another year wiser! Have an amazing birthday! 🎉",
      timestamp: new Date(),
      likes: 3,
    },
  ])
  const [newWish, setNewWish] = useState({ name: "", message: "" })

  const addWish = () => {
    if (newWish.name && newWish.message) {
      const wish: Wish = {
        id: Date.now(),
        name: newWish.name,
        message: newWish.message,
        timestamp: new Date(),
        likes: 0,
      }
      setWishes([wish, ...wishes])
      setNewWish({ name: "", message: "" })
    }
  }

  const likeWish = (id: number) => {
    setWishes(wishes.map((wish) => (wish.id === id ? { ...wish, likes: wish.likes + 1 } : wish)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Leave a Birthday Wish
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="text"
            placeholder="Your name"
            value={newWish.name}
            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <Textarea
            placeholder="Write your birthday wish..."
            value={newWish.message}
            onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
            className="min-h-[100px] focus:ring-purple-400"
          />
          <Button onClick={addWish} className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Wish
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-center text-purple-800">💌 Birthday Wishes</h3>
        {wishes.map((wish) => (
          <Card key={wish.id} className="bg-gradient-to-r from-pink-50 to-purple-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-purple-800">{wish.name}</h4>
                <span className="text-xs text-gray-500">{wish.timestamp.toLocaleDateString()}</span>
              </div>
              <p className="text-gray-700 mb-3">{wish.message}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => likeWish(wish.id)}
                className="text-pink-600 hover:text-pink-700"
              >
                <Heart className="w-4 h-4 mr-1" />
                {wish.likes}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
