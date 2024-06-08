"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Button } from "@medusajs/ui"
import { ArrowLeft, ArrrowRight } from "@medusajs/icons"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="h-80 relative md:py-[45vh]">
      <Button
        onClick={handlePrevClick}
        variant="secondary"
        className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full p-2 !outline-none !focus:outline-none !focus:ring-0"
      >
        <ArrowLeft />
      </Button>
      <div className="h-full flex items-center justify-center">
        <Image
          src={images[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          width={640}
          height={480}
          className="object-contain rounded-md"
        />
      </div>
      <Button
        onClick={handleNextClick}
        variant="secondary"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 rounded-full p-2 outline-none"
      >
        <ArrrowRight />
      </Button>
    </div>
  )
}

export default ImageGallery