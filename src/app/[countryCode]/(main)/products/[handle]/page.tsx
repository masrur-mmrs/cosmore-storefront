import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProductByHandle,
  getProductsList,
  getRegion,
  listRegions,
  retrievePricedProductById,
} from "@lib/data"
import { Region } from "@medusajs/medusa"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  try {
    const regions = await listRegions();
    if (!regions || regions.length === 0) {
      return [];
    }

    const countryCodes = regions
      .flatMap((region) => region.countries.map((country) => country.iso_2))
      .filter((code) => code !== undefined && code !== null);

    if (countryCodes.length === 0) {
      return [];
    }

    const allProducts = await Promise.all(
      countryCodes.map((countryCode) => getProductsList({ countryCode }))
    ).then((responses) =>
      responses
        .flatMap(({ response }) => response.products)
        .filter((product) => product.handle !== undefined && product.handle !== null)
    );

    const staticParams = allProducts.flatMap((product) =>
      countryCodes.map((countryCode) => ({
        countryCode,
        handle: product.handle,
      }))
    );

    return staticParams;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params

  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title}`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title}`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

const getPricedProductByHandle = async (handle: string, region: Region) => {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

export default async function ProductPage({ params }: Props) {
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const pricedProduct = await getPricedProductByHandle(params.handle, region)

  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={params.countryCode}
    />
  )
}
