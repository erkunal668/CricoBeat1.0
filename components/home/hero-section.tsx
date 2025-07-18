"use client"
import { useState, useEffect } from "react"

export function HeroSection() {
  const quotes = [
    "Success in cricket comes from consistent practice and dedication.",
    "Train like a beast, live like a champion. Every beat counts.",
    "The only bad workout is the one that didn't happen.",
    "Your body can stand almost anything. It's your mind that you have to convince.",
  ]
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 4000) // Change quote every 4 seconds
    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-[400px] h-[400px] bg-secondary-light-blue rounded-full opacity-30 blur-3xl animated-circle-1" />
        <div
          className="absolute w-[300px] h-[300px] bg-secondary-light-blue rounded-full opacity-20 blur-3xl animated-circle-2"
          style={{ top: "10%", left: "80%" }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-secondary-light-blue rounded-full opacity-25 blur-3xl animated-circle-1"
          style={{ bottom: "5%", left: "-10%" }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-white">
            Welcome to Cricobeat
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-gray-200">
            Premier Cricket Academy - Where Champions Are Made
          </p>
          <div className="relative h-24 w-full max-w-2xl flex items-center justify-center">
            <div className="absolute inset-0 bg-secondary-light-blue rounded-xl p-6 flex items-center justify-center shadow-lg">
              {quotes.map((quote, index) => (
                <p
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl transition-opacity duration-1000 ease-in-out px-4 ${
                    index === currentQuoteIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
