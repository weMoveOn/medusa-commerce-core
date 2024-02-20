import { useAdminStore } from "medusa-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import { useRoutes } from "../../../providers/route-provider"
import BuildingsIcon from "../../fundamentals/icons/buildings-icon"
import CartIcon from "../../fundamentals/icons/cart-icon"
import CashIcon from "../../fundamentals/icons/cash-icon"
import GearIcon from "../../fundamentals/icons/gear-icon"
import GiftIcon from "../../fundamentals/icons/gift-icon"
import SaleIcon from "../../fundamentals/icons/sale-icon"
import SquaresPlus from "../../fundamentals/icons/squares-plus"
import SwatchIcon from "../../fundamentals/icons/swatch-icon"
import TagIcon from "../../fundamentals/icons/tag-icon"
import UsersIcon from "../../fundamentals/icons/users-icon"
import SidebarMenuItem from "../../molecules/sidebar-menu-item"
import AccordionSidebar from "../accordian-sidebar"

const navigates = [
  {
    id: 1,
    title: "Home",
    label: "Home",
    path: "home",
  },
  {
    id: 2,
    title: "Home",
    label: "Home",
    path: "home",
  },
  {
    id: 3,
    title: "Home",
    label: "Home",
    path: "home",
  },
  {
    id: 4,
    title: "Home",
    label: "Home",
    path: "home",
  },
  {
    id: 5,
    title: "Home",
    label: "Home",
    path: "home",
  },
]

const AccordionTitle = ({
  label,
  isComplete,
}: {
  label: string
  isComplete: Boolean
}) => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          <path
            d="M7.99932 21L7.74868 17.4911C7.61394 15.6046 9.10803 14 10.9993 14C12.8906 14 14.3847 15.6046 14.25 17.4911L13.9993 21"
            stroke="#262B28"
            strokeWidth="2"
          />
          <path
            d="M1.35139 12.2135C0.998371 9.91624 0.821861 8.76763 1.25617 7.74938C1.69047 6.73112 2.65403 6.03443 4.58114 4.64106L6.02099 3.6C8.41829 1.86667 9.61694 1 11 1C12.3831 1 13.5817 1.86667 15.979 3.6L17.4189 4.64106C19.346 6.03443 20.3095 6.73112 20.7438 7.74938C21.1781 8.76763 21.0016 9.91624 20.6486 12.2135L20.3476 14.1724C19.8471 17.4289 19.5969 19.0572 18.429 20.0286C17.2611 21 15.5537 21 12.1388 21H9.86119C6.44633 21 4.73891 21 3.571 20.0286C2.40309 19.0572 2.15287 17.4289 1.65243 14.1724L1.35139 12.2135Z"
            stroke="#262B28"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className=" text-base font-medium leading-normal text-gray-900">
        {label}
      </p>
    </div>
  )
}
const ICON_SIZE = 20

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
    <div className=" medium:block min-w-sidebar max-w-sidebar bg-gray-0 border-grey-20 py-base px-base hidden h-screen overflow-y-auto border-r ">
      <div className="h-full">
        <div className="py-3.5">
          {/* <AccordionSidebar
            defaultValue={[`initialExpanded`]}
            type="multiple"
            className="flex flex-col gap-4"
          >
            <AccordionSidebar.Item
              // @ts-ignore
              title={<AccordionTitle label={"Home"} />}
              value={"initialExpanded"}
              headingSize={"small"}
              className={" rounded-lg bg-white "}
            >
              <div className="flex items-center justify-between ">
                <div>
                  <p className="inter-base-regular text-black  ">
                    Manual Orders
                  </p>
                  <p className="inter-base-regular text-grey-50  ">
                    Abandoned Checkouts
                  </p>
                </div>
              </div>
            </AccordionSidebar.Item>
          </AccordionSidebar> */}

          <SidebarMenuItem
            subItems={[
              { pageLink: "/a/orders", text: "Orders" },
              { pageLink: "/a/products", text: "products" },
              { pageLink: "/a/home", text: "Home 3" },
            ]}
            pageLink={"/a/home"}
            icon={<CartIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("home", "Home")}
          />
          <SidebarMenuItem
            pageLink={"/a/orders"}
            icon={<CartIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-orders", "Orders")}
            subItems={[
              { pageLink: "/a/orders", text: "Orders" },
              { pageLink: "/a/products", text: "products" },
              { pageLink: "/a/home", text: "Home 3" },
            ]}
          />

          <SidebarMenuItem
            pageLink={"/a/products"}
            icon={<TagIcon size={ICON_SIZE} />}
            text={t("sidebar-products", "Products")}
            triggerHandler={triggerHandler}
            subItems={[
              { pageLink: "/a/orders", text: "Orders" },
              { pageLink: "/a/products", text: "products" },
              { pageLink: "/a/home", text: "Home 3" },
            ]}
          />
          <SidebarMenuItem
            pageLink={"/a/customers"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-customers", "Customers")}
            subItems={[
              { pageLink: "/a/orders", text: "Orders" },
              { pageLink: "/a/products", text: "products" },
              { pageLink: "/a/home", text: "Home 3" },
            ]}
          />
          <SidebarMenuItem
            pageLink={"/a/content"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-content", "Content")}
          />

          <SidebarMenuItem
            pageLink={"/a/collection"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-collection", "Collection")}
          />

          <SidebarMenuItem
            pageLink={"/a/analytics"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-analytics", "Analytics")}
          />
          <SidebarMenuItem
            pageLink={"/a/marketing"}
            icon={<UsersIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-marketing", "Marketing")}
          />
          <SidebarMenuItem
            pageLink={"/a/discounts"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-discounts", "Discounts")}
          />
          <h1>My Store</h1>
          <SidebarMenuItem
            pageLink={"/a/online-store"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-online-store", "Online Store")}
          />
          <SidebarMenuItem
            pageLink={"/a/social-media-channels"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-social-media-channels", "Social Media Channels")}
          />
          <h1>App Store</h1>

          <SidebarMenuItem
            pageLink={"/a/app-store"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-app-store", "App Store")}
          />
          <SidebarMenuItem
            pageLink={"/a/installed-apps"}
            icon={<SaleIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-installed-apps", "Installed App")}
          />
          <br />
          <hr />
          {isFeatureEnabled("product_categories") && (
            <SidebarMenuItem
              pageLink={"/a/product-categories"}
              icon={<SwatchIcon size={ICON_SIZE} />}
              text={t("sidebar-categories", "Categories")}
              triggerHandler={triggerHandler}
            />
          )}

          {inventoryEnabled && (
            <SidebarMenuItem
              pageLink={"/a/inventory"}
              icon={<BuildingsIcon size={ICON_SIZE} />}
              triggerHandler={triggerHandler}
              text={t("sidebar-inventory", "Inventory")}
            />
          )}

          <SidebarMenuItem
            pageLink={"/a/gift-cards"}
            icon={<GiftIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-gift-cards", "Gift Cards")}
          />
          <SidebarMenuItem
            pageLink={"/a/pricing"}
            icon={<CashIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-pricing", "Pricing")}
          />
          {getLinks().map(({ path, label, icon }, index) => {
            const cleanLink = path.replace("/a/", "")

            const Icon = icon ? icon : SquaresPlus

            return (
              <SidebarMenuItem
                key={index}
                pageLink={`/a${cleanLink}`}
                icon={icon ? <Icon /> : <SquaresPlus size={ICON_SIZE} />}
                triggerHandler={triggerHandler}
                text={label}
              />
            )
          })}
          <SidebarMenuItem
            pageLink={"/a/settings"}
            icon={<GearIcon size={ICON_SIZE} />}
            triggerHandler={triggerHandler}
            text={t("sidebar-settings", "Settings")}
          />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
