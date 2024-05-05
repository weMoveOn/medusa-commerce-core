import { useAdminStore } from "medusa-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import { useRoutes } from "../../../providers/route-provider"
import BuildingsIcon from "../../fundamentals/icons/buildings-icon"
import GearIcon from "../../fundamentals/icons/gear-icon"
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
import EyeIcon from "../../fundamentals/icons/eye-icon"

const ICON_SIZE = 28

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
    <div className=" bg-grey-0 h-screen overflow-y-auto border p-6">
      <div className="">
        <div className="">
          <div className="medium:gap-5 flex flex-col gap-3 ">
            <SidebarMenuItem
              pageLink={"/a/home"}
              icon={<HomeIcon />}
              triggerHandler={() => {}}
              text={t("home", "Home")}
            />
            <SidebarMenuItem
              icon={<OrdersIcon />}
              pageLink="/a/orders"
              triggerHandler={() => {}}
              text={t("sidebar-orders", "Orders")}
              subItems={[
                { pageLink: "/a/orders", text: "Manual Orders" },
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
              triggerHandler={() => {}}
              subItems={[
                { pageLink: "/a/inventory", text: "Inventory" },
                { pageLink: "/a/purchase-orders", text: "Purchase Orders" },
                { pageLink: "/a/transfers", text: "Transfers" },
              ]}
            />
            <SidebarMenuItem
              pageLink={"/a/site"}
              icon={<EyeIcon />}
              triggerHandler={() => {}}
              text={t("site", "Site")}
            />

            <SidebarMenuItem
              pageLink={"/a/collections"}
              icon={<CollectionsIcon />}
              text={t("sidebar-collections", "Collections")}
              triggerHandler={() => {}}
              subItems={[{ pageLink: "/a/overview", text: "Overview" }]}
            />
            <SidebarMenuItem
              pageLink={"/a/customers"}
              icon={<CustomersIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-customers", "Customers")}
            />
            <SidebarMenuItem
              pageLink={"/a/content"}
              icon={<ContentIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-content", "Content")}
              subItems={[
                { pageLink: "/a/meta-object", text: "MetaObject" },
                { pageLink: "/a/files", text: "Files" },
              ]}
            />
            <SidebarMenuItem
              pageLink={"/a/discounts"}
              icon={<DiscountsIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-discounts", "Discounts")}
              subItems={[
                { pageLink: "/a/discount", text: "Discount" },
                { pageLink: "/a/gift-cards", text: "gift-cards" },
              ]}
            />
          </div>
          <hr className="my-8" />
        </div>
        <div className="pb-32">
          <div className="medium:gap-5 flex flex-col gap-3 ">
            <SidebarMenuItem
              pageLink={"/a/my-store"}
              icon={<StoreIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-my-store", "My Store")}
            />

            <SidebarMenuItem
              pageLink={"/a/my-apps"}
              icon={<AppIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-my-apps", "My Apps")}
            />
          </div>

          <div className=" medium:mt-44 medium:gap-5  mt-12 flex flex-col gap-3 ">
            <SidebarMenuItem
              pageLink={"/a/help"}
              icon={<HelpIcon />}
              triggerHandler={() => {}}
              text={t("sidebar-help", "Help")}
            />
            <SidebarMenuItem
              pageLink={"/a/settings"}
              icon={<GearIcon size={ICON_SIZE} />}
              triggerHandler={() => {}}
              text={t("sidebar-settings", "Settings")}
            />
            {isFeatureEnabled("product_categories") && (
              <SidebarMenuItem
                pageLink={"/a/product-categories"}
                icon={<SwatchIcon size={ICON_SIZE} />}
                text={t("sidebar-categories", "Categories")}
                triggerHandler={() => {}}
              />
            )}

            {inventoryEnabled && (
              <SidebarMenuItem
                pageLink={"/a/inventory"}
                icon={<BuildingsIcon size={ICON_SIZE} />}
                triggerHandler={() => {}}
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
                  triggerHandler={() => {}}
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
