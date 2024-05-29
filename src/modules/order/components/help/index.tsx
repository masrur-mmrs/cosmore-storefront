import { Heading } from "@medusajs/ui"
import Link from "next/link"
import React from "react"

const Help = () => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">Need help?</Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <Link href="mailto:cosmore705@gmail.com" target="_blank">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
