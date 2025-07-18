"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { testimonialsData } from "@/lib/data" // Import testimonialsData

export function TestimonialsSection() {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length)
    }, 4000) // Change testimonial every 4 seconds
    return () => clearInterval(interval)
  }, [testimonialsData.length])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-dark-blue">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-accent-yellow drop-shadow-lg">
            What Our Students Say
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl h-[200px] flex items-center justify-center">
          {testimonialsData.map(({ id, author, quote }, index) => (
            <Card
              key={id}
              className={`absolute inset-0 flex flex-col items-center p-6 text-center bg-secondary-light-blue text-white rounded-xl shadow-lg transition-opacity duration-1000 ease-in-out ${
                index === currentTestimonialIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <CardContent className="flex flex-col items-center gap-4">
                <blockquote className="text-lg font-semibold lg:text-xl">&ldquo;{quote}&rdquo;</blockquote>
                <div>
                  <div className="font-semibold">{author}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Add a div to ensure the section has height even with absolute positioning */}
        <div className="h-[200px]" />
      </div>
    </section>
  )
}
