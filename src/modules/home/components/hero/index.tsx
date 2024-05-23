"use client"
import Image from "next/image"
import CosmoreImage from "../../../../app/cosmore.jpg"
import HeroImage from "../../../../app/HeroImage.png"
import { useEffect, useState } from "react"
import { clx } from "@medusajs/ui"


const Hero = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="lg:h-[100vh] w-full relative flex flex-col overflow-hidden sm:flex-row">
      {/* Left Div */}
        <div className="lg:w-1/2 sm:w-full bg-primary-color relative items-center justify-center">
          <Image
          src={CosmoreImage}
          alt="Cosmore Logo"
          priority
          />
        </div>
      {/* Right Div */}
      <div className="lg:w-1/2 sm:w-0 relative">
      <Image
        src={HeroImage}
        alt="Hero Image"
        priority
        className="absolute z-20 md:bottom-0 min-[300px]:-bottom-72"
        />
          <div className={clx("bg-primary-color w-[25vw] h-[25vw] right-10 top-10 absolute rounded-full z-10 transition ease-in duration-300 transform-gpu", (visible)?"scale-100":"scale-0")}></div>
          <div className={clx("bg-primary-color w-[20vw] h-[20vw] left-24 bottom-5 absolute rounded-full z-10 transition ease-in duration-300 delay-100 transform-gpu", (visible)?"scale-100":"scale-0")}></div>
        <div className="absolute inset-0 bg-white transform skew-x-12 origin-right"></div>
      </div>
      {/* Content Overlay */}
      <div className="absolute inset-0 z-30 flex justify-center items-center">
        <div className="scroll"></div>
      </div>
    </div>
  )
}

export default Hero
