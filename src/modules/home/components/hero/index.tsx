"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import { clx } from "@medusajs/ui"
import DownArrow from "../../../../app/arrow-down-3101.png"
import Lottie from "lottie-react"
import { Transition } from "@headlessui/react"

import Cosmore from '../../../../app/cosmore.json'
import HeroImage from '../../../../app/HeroImage.png'

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState<boolean>(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  setTimeout(() => {
    setShowDownArrow(true);
  }, 3500);

  return (
    <div className="lg:h-[100vh] w-full relative flex flex-col overflow-hidden sm:flex-row">
      {/* Left Div */}
        <div className="lg:w-1/2 sm:w-full bg-primary-color relative items-center justify-center">
          <Lottie
          animationData={Cosmore}
          loop={false}
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
        <div className="absolute w-full inset-0 z-30 md:block min-[300px]:hidden">
        <div className="!origin-center absolute top-[70%] left-1/2 -translate-x-1/2">
          <Transition
          show={showDownArrow}
          enter="transition-opacity ease-in duration-300 transform-gpu"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          >
            <Image
              src={DownArrow}
              alt="Arrow"
              width={100}
              height={100}
              className="animate-bounce"
            />
          </Transition>
        </div>
      </div>
    </div>
  )
}

export default Hero
