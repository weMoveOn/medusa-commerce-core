import { useAdminCreateBatchJob, useAdminCreateCollection } from "medusa-react"
import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Spacer from "../../../components/atoms/spacer"
import ListIcon from "../../../components/fundamentals/icons/list-icon"
import TileIcon from "../../../components/fundamentals/icons/tile-icon"
import BodyCard from "../../../components/organisms/body-card"
import TableViewHeader from "../../../components/organisms/custom-table-header"
import MoveOnInventoryImportedProduct from "../../../components/templates/moveon-inventory-imported-product"
import MoveOnProduct from "../../../components/templates/moveon-product"
import useNotification from "../../../hooks/use-notification"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"

export type ViewsType = "Product List" | "Imported Products"

const VIEWS: ViewsType[] = ["Product List", "Imported Products"]
export type ProductLayoutType = "grid" | "list"

const Overview = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const url = useMemo(() => {
    const currentUrl = new URL(window.location.href)
    return currentUrl
  }, [])

  const searchParams = useMemo(() => {
    const currentSearchParams = new URLSearchParams(url.search)
    return currentSearchParams
  }, [url])

  const [view, setView] = useState<ViewsType>("Product List")
  const [importedProductLayout, setImportedProductLayOut] =
    useState<ProductLayoutType>("grid")
  const {
    state: createProductState,
    close: closeProductCreate,
    open: openProductCreate,
  } = useToggleState()

  const { resetInterval } = usePolling()
  const createBatchJob = useAdminCreateBatchJob()

  const notification = useNotification()

  const createCollection = useAdminCreateCollection()

  useEffect(() => {
    if (location.search.includes("?view=product-list")) {
      setView("Product List")
    }
  }, [location])

  useEffect(() => {
    switch (view) {
      case "Imported Products":
        searchParams.set("view", "imported-product")
        break
      case "Product List":
        searchParams.set("view", "product-list")
        break

      default:
        searchParams.delete("view")
    }

    const offset = searchParams.get("offset")
    const limit = searchParams.get("limit")
    searchParams.delete("offset")
    searchParams.delete("limit")
    if (offset !== null) {
      searchParams.set("offset", offset)
    }
    if (limit !== null) {
      searchParams.set("limit", limit)
    }

    url.search = searchParams.toString()
    window.history.replaceState(null, "", url.href)
  }, [view, searchParams, url])

  const CurrentView = () => {
    switch (view) {
      case "Product List":
        return <MoveOnProduct />
      default:
        return <MoveOnInventoryImportedProduct layout={importedProductLayout} />
    }
  }

  const [showNewCollection, setShowNewCollection] = useState(false)
  const {
    open: openExportModal,
    close: closeExportModal,
    state: exportModalOpen,
  } = useToggleState(false)

  const {
    open: openImportModal,
    close: closeImportModal,
    state: importModalOpen,
  } = useToggleState(false)

  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            forceDropdown={false}
            customActionable={
              <div className="flex space-x-2">
                {view === "Imported Products" && (
                  <>
                    <span
                      onClick={() => {
                        setImportedProductLayOut("list")
                      }}
                    >
                      <ListIcon
                        style={{
                          opacity: importedProductLayout === "list" ? 1 : 0.4,
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <span
                      onClick={() => {
                        setImportedProductLayOut("grid")
                      }}
                    >
                      <TileIcon
                        style={{
                          opacity: importedProductLayout === "grid" ? 1 : 0.4,
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  </>
                )}
              </div>
            }
            customHeader={
              <TableViewHeader
                views={VIEWS}
                setActiveView={setView}
                activeView={view}
              />
            }
            className="h-fit"
          >
            <CurrentView />
          </BodyCard>
          <Spacer />
        </div>
      </div>
    </>
  )
}

export default React.memo(Overview)

// 138.48
