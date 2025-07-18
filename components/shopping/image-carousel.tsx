"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 bg-gray-700 rounded-lg text-gray-400">
        No images available
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      {/* Main Image */}
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`Product image ${currentIndex + 1}`}
        fill
        style={{ objectFit: "contain" }}
        className="transition-opacity duration-300 ease-in-out"
      />

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Thumbnail Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
