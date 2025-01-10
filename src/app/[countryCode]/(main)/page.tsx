import React from "react"
import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCategoriesList, getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

import CategoryRail from "@modules/home/components/featured-products/category-rail"

const openGraph: OpenGraph = {
  type: "website",
  title: "Cosmore Store",
  url: "https://www.cosmore.store",
  siteName: "Cosmore Store",
  images: [{
    url: "https://cosmore-server.s3.ca-central-1.amazonaws.com/cosmore.jpg",
  }],
}

export const metadata: Metadata = {
  title: "Cosmore",
  description:
    "Welcome to Cosmore, where fashion meets sophistication. At Cosmore, we believe that clothing is more than just fabric; it's an expression of your unique personality and style. Our curated collection of high-quality apparel and accessories is designed to cater to the modern, fashion-forward individual who values both elegance and comfort.",
    openGraph: openGraph,
}

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 10)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const {product_categories} = await getCategoriesList(0, 6);
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)


  return (
    <>
      <Hero />
      <div className="py-12">
        <CategoryRail product_categories={product_categories} countryCode={countryCode} />
        {/* <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections!} region={region!} />
        </ul> */}
      </div>
    </>
  )
}
