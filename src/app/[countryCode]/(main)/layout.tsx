import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import WelcomePage from "@modules/layout/templates/welcomepage"

import { SwipeUpProvider, SwipeUpContext } from "@lib/context/swipe-up-context"
import { useContext } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  // const swipeUpContext = useContext(SwipeUpContext);
  
  // if (!swipeUpContext) {
  //   throw new Error('Conditional component must be used within SwipeUpProvider');
  // }

  // const { isSwipeUp } = swipeUpContext;

  return (
    <SwipeUpProvider>
      <WelcomePage/>
      <Nav />{props.children}<Footer/>
    </SwipeUpProvider>
  )
}
