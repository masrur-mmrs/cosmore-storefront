import Image from "next/image"
import CosmoreImage from "../../../../app/cosmore.jpg"
import HeroImage from "../../../../app/HeroImage.png"


const Hero = () => {
  return (
    <div className="lg:h-[90vh] w-full relative flex flex-col overflow-hidden sm:flex-row">
      {/* Left Div */}
        <div className="lg:w-1/2 sm:w-full bg-primary-color relative items-center justify-center">
          <Image
          src={CosmoreImage}
          alt="Cosmore Logo"
          />
        </div>
      {/* Right Div */}
      <div className="lg:w-1/2 sm:w-0 relative">
      <Image
        src={HeroImage}
        alt="Hero Image"
        className="absolute z-20 md:bottom-0 min-[300px]:-bottom-72"
        />
        <div className="bg-primary-color w-[50%] h-[50%] right-10 top-10 absolute z-10 rounded-full"></div>
        <div className="bg-primary-color w-[25%] h-[25%] left-24 bottom-5 absolute z-10 rounded-full"></div>
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
