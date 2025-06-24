"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/romantic-card"
import { Gift, Shuffle, Trophy } from "lucide-react"

const birthdayTrivia = [
  {
    question: "What's the most popular birthday month?",
    answer: "September",
    options: ["January", "September", "December", "July"],
  },
  {
    question: "Which country started the birthday cake tradition?",
    answer: "Germany",
    options: ["France", "Italy", "Germany", "England"],
  },
  {
    question: "What do birthday candles represent?",
    answer: "Years of life",
    options: ["Wishes", "Years of life", "Good luck", "Celebration"],
  },
]

const birthdayWishes = [
  "May your birthday be filled with sunshine and smiles, laughter and love! 🌞",
  "Wishing you a day that's as special as you are! ✨",
  "May all your birthday wishes come true! 🌟",
  "Here's to another year of amazing adventures! 🎈",
  "May your special day be surrounded by happiness! 💖",
]

export function BirthdayGames() {
  const [currentGame, setCurrentGame] = useState<"trivia" | "wishes" | "memory">("trivia")
  const [triviaIndex, setTriviaIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [randomWish, setRandomWish] = useState("")
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>
  >([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])

  useEffect(() => {
    initializeMemoryGame()
  }, [])

  const initializeMemoryGame = () => {
    const emojis = ["🎂", "🎈", "🎁", "🎉", "🎊", "🕯️", "🎵", "💖"]
    const cards = [...emojis, ...emojis]
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5)
    setMemoryCards(cards)
  }

  const handleTriviaAnswer = (answer: string) => {
    if (answer === birthdayTrivia[triviaIndex].answer) {
      setScore(score + 1)
    }
    setShowAnswer(true)
    setTimeout(() => {
      setShowAnswer(false)
      setTriviaIndex((prev) => (prev + 1) % birthdayTrivia.length)
    }, 2000)
  }

  const generateRandomWish = () => {
    const randomIndex = Math.floor(Math.random() * birthdayWishes.length)
    setRandomWish(birthdayWishes[randomIndex])
  }

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return

    const newCards = memoryCards.map((card) => (card.id === cardId ? { ...card, flipped: true } : card))
    setMemoryCards(newCards)

    const newFlipped = [...flippedCards, cardId]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const firstCard = memoryCards.find((c) => c.id === first)
      const secondCard = memoryCards.find((c) => c.id === second)

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, matched: true } : card)),
          )
          setFlippedCards([])
        }, 1000)
      } else {
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((card) => (card.id === first || card.id === second ? { ...card, flipped: false } : card)),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-purple-800 mb-4">🎮 Birthday Games</h3>
        <div className="flex justify-center gap-2 mb-6">
          <Button variant={currentGame === "trivia" ? "default" : "outline"} onClick={() => setCurrentGame("trivia")}>
            🧠 Trivia
          </Button>
          <Button variant={currentGame === "wishes" ? "default" : "outline"} onClick={() => setCurrentGame("wishes")}>
            ✨ Wishes
          </Button>
          <Button variant={currentGame === "memory" ? "default" : "outline"} onClick={() => setCurrentGame("memory")}>
            🧩 Memory
          </Button>
        </div>
      </div>

      {currentGame === "trivia" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Birthday Trivia - Score: {score}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-lg font-medium">{birthdayTrivia[triviaIndex].question}</p>
              {!showAnswer ? (
                <div className="grid grid-cols-2 gap-2">
                  {birthdayTrivia[triviaIndex].options.map((option, index) => (
                    <Button key={index} variant="outline" onClick={() => handleTriviaAnswer(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600">✅ {birthdayTrivia[triviaIndex].answer}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {currentGame === "wishes" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Birthday Wish Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button onClick={generateRandomWish} className="mb-4">
              <Shuffle className="w-4 h-4 mr-2" />
              Generate Wish
            </Button>
            {randomWish && (
              <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                <p className="text-lg italic">{randomWish}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {currentGame === "memory" && (
        <Card>
          <CardHeader>
            <CardTitle>🧩 Birthday Memory Game</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {memoryCards.map((card) => (
                <Button
                  key={card.id}
                  variant="outline"
                  className={`h-16 text-2xl ${card.matched ? "bg-green-100" : ""}`}
                  onClick={() => handleCardClick(card.id)}
                  disabled={card.flipped || card.matched}
                >
                  {card.flipped || card.matched ? card.emoji : "❓"}
                </Button>
              ))}
            </div>
            <Button onClick={initializeMemoryGame} variant="outline" className="w-full">
              🔄 New Game
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
