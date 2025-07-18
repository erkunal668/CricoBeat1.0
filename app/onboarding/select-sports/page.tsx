"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Sport {
  id: string
  name: string
  image: string
}

const sports: Sport[] = [
  { id: "badminton", name: "Badminton", image: "/placeholder.svg?height=100&width=100" },
  { id: "swimming", name: "Swimming", image: "/placeholder.svg?height=100&width=100" },
  { id: "squash", name: "Squash", image: "/placeholder.svg?height=100&width=100" },
  { id: "football", name: "Football", image: "/placeholder.svg?height=100&width=100" },
  { id: "box-cricket", name: "Box Cricket", image: "/placeholder.svg?height=100&width=100" },
  { id: "table-tennis", name: "Table Tennis", image: "/placeholder.svg?height=100&width=100" },
]

export default function SelectSportsPage() {
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const MAX_SELECTIONS = 3

  const handleSelectSport = (sportId: string) => {
    setSelectedSports((prevSelected) => {
      if (prevSelected.includes(sportId)) {
        return prevSelected.filter((id) => id !== sportId)
      } else {
        if (prevSelected.length < MAX_SELECTIONS) {
          return [...prevSelected, sportId]
        }
        return prevSelected // Do not add if max selections reached
      }
    })
  }

  const isContinueEnabled = selectedSports.length > 0

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center px-4 py-4">
        <Link href="#" className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        {/* Time, 5G, Battery - Placeholder for mobile status bar */}
        <div className="ml-auto flex items-center gap-2 text-sm">
          <span>10:33</span>
          <span>5G</span>
          <span>34%</span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-6 py-8">
        <h1 className="text-3xl font-bold">What sport do you play?</h1>
        <p className="mt-2 text-gray-400">Select upto {MAX_SELECTIONS} from below</p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {sports.map((sport) => (
            <Card
              key={sport.id}
              className={`cursor-pointer rounded-lg border-2 ${
                selectedSports.includes(sport.id) ? "border-green-500 bg-gray-800" : "border-gray-700 bg-gray-900"
              } transition-all duration-200`}
              onClick={() => handleSelectSport(sport.id)}
            >
              <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                <Image
                  src={sport.image || "/placeholder.svg"}
                  alt={sport.name}
                  width={100}
                  height={100}
                  className="mb-2 h-24 w-24 object-contain"
                />
                <span className="text-lg font-medium">{sport.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Continue Button */}
      <footer className="p-6">
        <Button
          className="w-full rounded-lg bg-green-600 py-3 text-lg font-semibold text-white hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-400"
          disabled={!isContinueEnabled}
          onClick={() => console.log("Selected Sports:", selectedSports)}
        >
          Continue
        </Button>
      </footer>
    </div>
  )
}
