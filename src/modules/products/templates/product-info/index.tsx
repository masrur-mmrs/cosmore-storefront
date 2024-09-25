"use client"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Chart from "@modules/products/components/product-tabs/chart"
import { useEffect, useState } from "react"

interface ProductDetails {
  chartArray?: string[][];
  // Add other properties as needed
}

type ProductInfoProps = {
  product: PricedProduct & {
    productDetails?: ProductDetails;
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [chartArray, setChartArray] = useState<string[][]>([]);

  useEffect(() => {
    if (product.productDetails && 'chartArray' in product.productDetails) {
      setChartArray(product.productDetails.chartArray || []);
    }
  }, [product.productDetails]);

  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-medium text-ui-fg-muted hover:text-ui-fg-subtle"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading level="h2" className="text-3xl leading-10 text-ui-fg-base" data-testid="product-title">
          {product.title}
        </Heading>
        <Text className="text-medium text-ui-fg-subtle" data-testid="product-description">
          {product.description}
        </Text>
        <div className="flex flex-col text-sm gap-y-4">
        {/* Object.keys(product.productDetails!).length>0 */}
        {(product.productDetails !== undefined )&&<div>
            <span className="font-semibold">Size Chart</span>
            <Chart chartArray={chartArray} />
          </div>}
          <div>
            {(product.material)?<><span className="font-semibold">Material</span>
            <p>{product.material ? product.material : "-"}</p></>:<></>}
          </div>
          <div>
            {(product.origin_country)?<><span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : "-"}</p></>:<></>}
          </div>
          <div>
            {(product.type)?<><span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : "-"}</p></>:<></>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo