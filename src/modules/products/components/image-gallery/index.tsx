"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { ArrowLeft, ArrrowRight } from "@medusajs/icons"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useSwipeable } from "react-swipeable"

type ImageGalleryProps = {
  images: MedusaImage[]
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const carouselSlideSize = useRef<number>(900);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!isAnimating) {
        setIsAnimating(true)
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
      }},
      onSwipedRight: () => {
        if (!isAnimating) {{
          setIsAnimating(true)
          setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
      }
    }}
  });

  const handlePrevClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    }
  }

  const handleNextClick = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 300) // Match this with the transition duration

    if (typeof window !== "undefined") {
      carouselSlideSize.current = window.innerHeight;
    }
    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div {...handlers} className="h-[50vh] md:h-[85vh] relative overflow-hidden rounded-md" id="animation-carousel">
      <Button
        onClick={handlePrevClick}
        variant="secondary"
        className="absolute hidden sm:block top-1/2 left-2 transform -translate-y-1/2 rounded-full p-2 z-10 !outline-none !focus:outline-none !focus:ring-0"
      >
        <ArrowLeft />
      </Button>
      <div 

        className="h-full w-full"
        >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute rounded-md transition-transform duration-300 ease-in-out ${
              index === currentIndex
                ? 'translate-x-0'
                : index < currentIndex
                ? '-translate-x-full'
                : 'translate-x-full'
            }`}
          >
            <Image
              src={image.url}
              alt={`Slide ${index + 1}`}
              // fill
              width={carouselSlideSize.current}
              height={carouselSlideSize.current}
              // sizes="(max-width: 768px) 100vw, 33vw"
              className="rounded-md object-cover"
            />
          </div>
        ))}
      </div>
      <Button
        onClick={handleNextClick}
        variant="secondary"
        className="absolute hidden sm:block top-1/2 right-2 transform -translate-y-1/2 rounded-full p-2 z-10 outline-none"
      >
        <ArrrowRight />
      </Button>
    </div>
  )
}

export default ImageGallery