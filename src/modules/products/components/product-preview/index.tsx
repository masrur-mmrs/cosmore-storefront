import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"


export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)
  

  if (!pricedProduct) {
    return null
  }


  

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
      
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
        <div data-testid="product-wrapper" className="hover:-translate-y-3 transition ease-in-out duration-300">
            <Thumbnail
              thumbnail={productPreview.thumbnail}
              size="full"
              isFeatured={isFeatured}
            />
            <div className="flex flex-col sm:flex-row txt-compact-medium justify-between rounded-b-lg py-3 bg-1  bg-primary-color">
              <Text className="text-ui-fg-subtle ml-1 font-bold" data-testid="product-title">{productPreview.title}</Text>
              <div className="flex items-center gap-x-2 ml-1 sm:mr-1">
                {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
              </div>
            </div>
        </div>
    </LocalizedClientLink>
  )
}
