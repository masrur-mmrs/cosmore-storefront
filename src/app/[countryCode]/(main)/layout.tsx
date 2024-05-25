import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import WelcomePage from "@modules/layout/templates/welcomepage"

import { SwipeUpProvider } from "@lib/context/swipe-up-context"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {

  return (
    <SwipeUpProvider>
      <div className="relative">
        <div className=""><WelcomePage/></div>
        <div className="z-10">
            <Nav />{props.children}<Footer/>
        </div>
      </div>
    </SwipeUpProvider>
  )
}
