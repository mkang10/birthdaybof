"use client"

import { useState } from "react"
import { Button } from "./ui/enhanced-button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/romantic-card"
import { Input } from "./ui/romantic-input"
import { Textarea } from "./ui/textarea"
import { Badge } from "./ui/romantic-badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/romantic-avatar"
import { Progress } from "./ui/romantic-progress"
import { Alert, AlertDescription, AlertTitle } from "./ui/romantic-alert"
import { Heart, Gift, Sparkles, Search, Mail } from "lucide-react"

export function UIShowcase() {
  const [progress, setProgress] = useState(75)
  const [loading, setLoading] = useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Complete UI Component Library
          </h1>
          <p className="text-gray-600">Beautiful components for your special birthday project</p>
        </div>

        {/* Buttons Showcase */}
        <Card variant="romantic" hover>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-pink-500" />
              Enhanced Buttons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Romantic Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-700">Romantic Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="romantic" icon={<Heart className="w-4 h-4" />}>
                  Romantic
                </Button>
                <Button variant="love" icon={<Heart className="w-4 h-4" />}>
                  Love
                </Button>
                <Button variant="birthday" icon={<Gift className="w-4 h-4" />}>
                  Birthday
                </Button>
                <Button variant="heart" size="icon">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="sparkle" icon={<Sparkles className="w-4 h-4" />}>
                  Sparkle
                </Button>
              </div>
            </div>

            {/* Standard Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Standard Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Elegant Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Elegant Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="elegant">Elegant</Button>
                <Button variant="glass">Glass</Button>
                <Button variant="neon">Neon</Button>
                <Button variant="soft">Soft</Button>
                <Button variant="bold">Bold</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-pink-700">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="romantic" size="compact">
                  Compact
                </Button>
                <Button variant="romantic" size="sm">
                  Small
                </Button>
                <Button variant="romantic" size="default">
                  Default
                </Button>
                <Button variant="romantic" size="lg">
                  Large
                </Button>
                <Button variant="romantic" size="xl">
                  Extra Large
                </Button>
                <Button variant="romantic" size="massive">
                  Massive
                </Button>
              </div>
            </div>

            {/* Special Features */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Special Features</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="romantic" loading={loading} onClick={handleLoadingDemo}>
                  {loading ? "Loading..." : "Click for Loading"}
                </Button>
                <Button variant="love" pulse>
                  Pulsing
                </Button>
                <Button variant="birthday" glow>
                  Glowing
                </Button>
                <Button variant="romantic" rounded="full" size="full">
                  Full Width Rounded
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards Showcase */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card variant="romantic" hover glow>
            <CardHeader>
              <CardTitle className="text-pink-700">Romantic Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">A beautiful romantic card with gradient background and hover effects.</p>
            </CardContent>
          </Card>

          <Card variant="love" hover>
            <CardHeader>
              <CardTitle className="text-red-700">Love Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Perfect for love messages and romantic content.</p>
            </CardContent>
          </Card>

          <Card variant="glass" hover>
            <CardHeader>
              <CardTitle className="text-white">Glass Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">Modern glass morphism effect with backdrop blur.</p>
            </CardContent>
          </Card>
        </div>

        {/* Inputs & Textarea Showcase */}
        <Card variant="elegant" hover>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-500" />
              Form Components
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Inputs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input variant="romantic" placeholder="Romantic input..." />
                <Input variant="love" placeholder="Love input..." />
                <Input variant="elegant" placeholder="Elegant input..." />
                <Input variant="glass" placeholder="Glass input..." />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input variant="romantic" placeholder="Search with icon..." icon={<Search className="w-4 h-4" />} />
                <Input
                  variant="love"
                  placeholder="Email with icon..."
                  icon={<Mail className="w-4 h-4" />}
                  iconPosition="right"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-purple-700">Textareas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Textarea variant="romantic" placeholder="Write your romantic message..." />
                <Textarea variant="love" placeholder="Express your love..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges & Avatars */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="dreamy" hover>
            <CardHeader>
              <CardTitle>Romantic Badges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="romantic">Romantic</Badge>
                <Badge variant="love">Love</Badge>
                <Badge variant="birthday">Birthday</Badge>
                <Badge variant="sparkle">Sparkle</Badge>
                <Badge variant="heart">♥</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="elegant" size="lg">
                  Elegant Large
                </Badge>
                <Badge variant="soft" pulse>
                  Pulsing
                </Badge>
                <Badge variant="romantic" glow>
                  Glowing
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card variant="soft" hover>
            <CardHeader>
              <CardTitle>Romantic Avatars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar variant="romantic" size="sm">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <Avatar variant="love" size="default">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <Avatar variant="elegant" size="lg">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <Avatar variant="glow" size="xl">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress & Alerts */}
        <div className="space-y-6">
          <Card variant="birthday" hover>
            <CardHeader>
              <CardTitle>Romantic Progress Bars</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Romantic Progress</label>
                <Progress variant="romantic" value={progress} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Love Progress</label>
                <Progress variant="love" value={85} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Birthday Progress</label>
                <Progress variant="birthday" value={60} size="lg" />
              </div>
              <Button variant="romantic" onClick={() => setProgress(Math.random() * 100)} size="sm">
                Randomize Progress
              </Button>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Alert variant="romantic">
              <Heart className="h-4 w-4" />
              <AlertTitle>Romantic Alert</AlertTitle>
              <AlertDescription>
                This is a beautiful romantic alert with gradient background and heart icon.
              </AlertDescription>
            </Alert>

            <Alert variant="love">
              <Sparkles className="h-4 w-4" />
              <AlertTitle>Love Alert</AlertTitle>
              <AlertDescription>A pulsing love alert perfect for special messages and notifications.</AlertDescription>
            </Alert>
          </div>

          <Alert variant="birthday">
            <Gift className="h-4 w-4" />
            <AlertTitle>Birthday Alert</AlertTitle>
            <AlertDescription>
              Celebrate with this beautiful birthday-themed alert component with warm colors.
            </AlertDescription>
          </Alert>
        </div>

        {/* Usage Examples */}
        <Card variant="glass" hover>
          <CardHeader>
            <CardTitle className="text-white">Usage Examples</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <code className="text-white text-sm">
                {`<Button variant="romantic" icon={<Heart />}>
  I Love You
</Button>`}
              </code>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <code className="text-white text-sm">
                {`<Card variant="glass" hover>
  <CardContent>Beautiful content</CardContent>
</Card>`}
              </code>
            </div>
            <div className="bg-black/20 p-4 rounded-lg">
              <code className="text-white text-sm">
                {`<Input 
  variant="love" 
  placeholder="Your message..." 
  icon={<Heart />} 
/>`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  )
}
