import { useAdminStore } from "medusa-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import { useRoutes } from "../../../providers/route-provider"
import BuildingsIcon from "../../fundamentals/icons/buildings-icon"
import GearIcon from "../../fundamentals/icons/gear-icon"
import SaleIcon from "../../fundamentals/icons/sale-icon"
import SquaresPlus from "../../fundamentals/icons/squares-plus"
import SwatchIcon from "../../fundamentals/icons/swatch-icon"

import SidebarMenuItem from "../../molecules/sidebar-menu-item"

import HomeIcon from "../../fundamentals/icons/home-icon"
import OrdersIcon from "../../fundamentals/icons/orders-icon"
import ProductsIcon from "../../fundamentals/icons/products-icon"
import CustomersIcon from "../../fundamentals/icons/customers-icons"
import ContentIcon from "../../fundamentals/icons/content-icon"
import DiscountsIcon from "../../fundamentals/icons/discounts-icon"
import CollectionsIcon from "../../fundamentals/icons/collections-icon"
import StoreIcon from "../../fundamentals/icons/store-icon"
import AppIcon from "../../fundamentals/icons/app-icon"

import HelpIcon from "../../fundamentals/icons/help-icon"

const ICON_SIZE = 32

const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const [currentlyOpen, setCurrentlyOpen] = useState(-1)

  const { isFeatureEnabled } = useFeatureFlag()
  const { store } = useAdminStore()

  const { getLinks } = useRoutes()

  const triggerHandler = () => {
    const id = triggerHandler.id++
    return {
      open: currentlyOpen === id,
      handleTriggerClick: () => setCurrentlyOpen(id),
    }
  }
  // We store the `id` counter on the function object, as a state creates
  // infinite updates, and we do not want the variable to be free floating.
  triggerHandler.id = 0

  const inventoryEnabled =
    isFeatureEnabled("inventoryService") &&
    isFeatureEnabled("stockLocationService")

  return (
    // min-w-sidebar max-w-sidebar  medium:block bg-gray-0 border-grey-20 py-base px-base hidden h-screen min-w-[232px]
    <div className=" h-full overflow-y-auto border p-6">
      <div className="">
        <div className="">
          <div className="flex flex-col gap-5 ">
            <SidebarMenuItem
              pageLink={"/a/home"}
              icon={<HomeIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("home", "Home")}
            />
            <SidebarMenuItem
              pageLink={"/a/orders"}
              icon={<OrdersIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-orders", "Orders")}
              subItems={[
                { pageLink: "/a/manual-orders", text: "Manual Orders" },
                {
                  pageLink: "/a/abandoned-checkouts",
                  text: "Abandoned Checkouts",
                },
              ]}
            />
            <SidebarMenuItem
              pageLink={"/a/products"}
              icon={<ProductsIcon />}
              text={t("sidebar-products", "Products")}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              subItems={[
                { pageLink: "/a/inventory", text: "Inventory" },
                { pageLink: "/a/purchase-orders", text: "Purchase Orders" },
                { pageLink: "/a/transfers", text: "Transfers" },
              ]}
            />
            <SidebarMenuItem
              pageLink={"/a/collections"}
              icon={<CollectionsIcon />}
              text={t("sidebar-collections", "Collections")}
              triggerHandler={() => {
                console.log("collections")
              }}
              subItems={[{ pageLink: "/a/overview", text: "Overview" }]}
            />
            <SidebarMenuItem
              pageLink={"/a/customers"}
              icon={<CustomersIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-customers", "Customers")}
            />
            <SidebarMenuItem
              pageLink={"/a/content"}
              icon={<ContentIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-content", "Content")}
              subItems={[
                { pageLink: "/a/meta-object", text: "MetaObject" },
                { pageLink: "/a/files", text: "Files" },
              ]}
            />
            <SidebarMenuItem
              pageLink={"/a/discounts"}
              icon={<DiscountsIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-discounts", "Discounts")}
              subItems={[
                { pageLink: "/a/discount", text: "Discount" },
                { pageLink: "/a/gift-cards", text: "gift-cards" },
              ]}
            />
          </div>
          <hr className="my-8" />
        </div>
        <div className=" grid grid-cols-1 justify-between ">
          <div className="flex flex-col gap-5 ">
            <SidebarMenuItem
              pageLink={"/a/my-store"}
              icon={<StoreIcon />}
              triggerHandler={() => {
                console.log("my-store")
              }}
              text={t("sidebar-my-store", "My Store")}
            />

            <SidebarMenuItem
              pageLink={"/a/my-apps"}
              icon={<AppIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-my-apps", "My Apps")}
            />
          </div>

          <div className=" flex flex-col gap-5 ">
            <SidebarMenuItem
              pageLink={"/a/help"}
              icon={<HelpIcon />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-help", "Help")}
            />
            <SidebarMenuItem
              pageLink={"/a/settings"}
              icon={<GearIcon size={ICON_SIZE} />}
              triggerHandler={() => {
                console.log("triggerHandler")
              }}
              text={t("sidebar-settings", "Settings")}
            />
            {isFeatureEnabled("product_categories") && (
              <SidebarMenuItem
                pageLink={"/a/product-categories"}
                icon={<SwatchIcon size={ICON_SIZE} />}
                text={t("sidebar-categories", "Categories")}
                triggerHandler={() => {
                  console.log("triggerHandler")
                }}
              />
            )}

            {inventoryEnabled && (
              <SidebarMenuItem
                pageLink={"/a/inventory"}
                icon={<BuildingsIcon size={ICON_SIZE} />}
                triggerHandler={() => {
                  console.log("triggerHandler")
                }}
                text={t("sidebar-inventory", "Inventory")}
              />
            )}

            {getLinks().map(({ path, label, icon }, index) => {
              const cleanLink = path.replace("/a/", "")

              const Icon = icon ? icon : SquaresPlus

              return (
                <SidebarMenuItem
                  key={index}
                  pageLink={`/a${cleanLink}`}
                  icon={icon ? <Icon /> : <SquaresPlus size={ICON_SIZE} />}
                  triggerHandler={() => {
                    console.log("triggerHandler")
                  }}
                  text={label}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
