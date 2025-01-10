import React from "react";
import { ProductCategory } from "types/global";
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getProductsByCategoryHandle, getRegion } from "@lib/data";
import ProductPreviewWrapper from "@modules/common/components/product-preview-wrapper";
import ProductPreview from "@modules/products/components/product-preview";
import InteractiveLink from "@modules/common/components/interactive-link";

const Products = async ({handle, countryCode}: {handle: string, countryCode: string}) => {
  const {response} = await getProductsByCategoryHandle({handle, countryCode})
  const region = await getRegion(countryCode)
  return (
    <ul className="grid my-10 grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
      {response.products.map((product: any, index) => {
        if (index < 3) {
          return (
            <ProductPreviewWrapper key={product.id} index={index}>
              <li key={product.id}>
                <ProductPreview
                  productPreview={product}
                  region={region!}
                  isFeatured
                />
              </li>
            </ProductPreviewWrapper>
          )
        }
      })}
    </ul>
  );
}

const CategoryRail = async ({product_categories, countryCode}: {product_categories: any, countryCode: any}) => {
  
  const productsExist = async (handle: string, countryCode: string)  => {
    const {response} = await getProductsByCategoryHandle({handle, countryCode})
    return response.products.length > 0
  }
  
    return (
      <div  className="content-container py-12 small:py-24">
        {product_categories && product_categories?.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                    {product_categories?.slice(0, 20).map((c: ProductCategory) => {
                      if (c.parent_category) {
                        return
                      }
  
                      const children =
                        c.category_children?.map((child) => ({
                          name: child.name,
                          handle: child.handle,
                          id: child.id,
                        })) || null
  
                      return (
                        <li
                          className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                          key={c.id}
                        >
                          {children && (
                            <ul className="grid grid-cols-1 ml-3 gap-2">
                              {children &&
                                children.map(async (child) => 
                                  {
                                    if (await productsExist(child.handle, countryCode)) {
                                      return(
                                        <li key={child.id}>
                                          <div className="flex flex-row justify-between mb-8">
                                            <LocalizedClientLink
                                              className="txt-xlarge hover:text-ui-fg-base"
                                              href={`/categories/${child.handle}`}
                                              data-testid="category-link"
                                            >
                                              {child.name}
                                            </LocalizedClientLink>
                                            <InteractiveLink href={`/categories/${child.handle}`}>
                                              View all
                                            </InteractiveLink>
                                          </div>
                                          <Products handle={child.handle} countryCode={countryCode} />  
                                        </li>
                                      )
                                    }
                                  }
                                )}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
            )}
        </div>
    );
  }

  export default CategoryRail;