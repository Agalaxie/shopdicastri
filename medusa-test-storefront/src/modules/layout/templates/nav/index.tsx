import { Suspense } from "react"
import Image from "next/image"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-dicastri-white border-dicastri-grey-light">
        <nav className="content-container txt-xsmall-plus text-dicastri-black flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="flex items-center"
              data-testid="nav-store-link"
            >
              <Image
                src="/dicastri-logo.png"
                alt="DiCastri"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-dicastri-primary transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Compte
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-dicastri-primary transition-colors flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Panier (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
