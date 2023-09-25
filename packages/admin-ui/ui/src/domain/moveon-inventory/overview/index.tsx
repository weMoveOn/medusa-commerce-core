import React, { useState } from "react"
import Spacer from "../../../components/atoms/spacer"
import ListIcon from "../../../components/fundamentals/icons/list-icon"
import TileIcon from "../../../components/fundamentals/icons/tile-icon"
import BodyCard from "../../../components/organisms/body-card"
import TableViewHeader from "../../../components/organisms/custom-table-header"
import MoveOnInventoryImportedProduct from "../../../components/templates/moveon-inventory-imported-product"
import MoveOnProduct from "../../../components/templates/moveon-product"
import MoveonInventoryBatchImportStatus from "../../../components/templates/moveon-inventory-batch-import-status"

export type ViewsType = "Product List" | "Imported Products" | "Import Status"

const VIEWS: ViewsType[] = ["Product List", "Imported Products", "Import Status"]
export type ProductLayoutType = "grid" | "list"

const Overview = () => {
  const [view, setView] = useState<ViewsType>("Product List")
  const [importedProductLayout, setImportedProductLayOut] = useState<ProductLayoutType>("grid")
  const [importedProductStatusLayout, setImportedProductStatusLayOut] = useState<ProductLayoutType>("grid")
  const CurrentView = () => {
    switch (view) {
      case "Product List":
        return <MoveOnProduct />
      case "Import Status":
        return <MoveonInventoryBatchImportStatus layout={importedProductStatusLayout} />
      default:
        return <MoveOnInventoryImportedProduct layout={importedProductLayout} />
    }
  }

  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            forceDropdown={false}
            customActionable={
              <div className="flex space-x-2">
                {view === "Imported Products" || view=== "Import Status" && (
                  <>
                    <span
                      onClick={() => {
                        setImportedProductLayOut("list")
                        setImportedProductStatusLayOut("list")
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
                        setImportedProductStatusLayOut("grid")
                      }}
                    >
                      <TileIcon
                        style={{
                          opacity: importedProductLayout || importedProductStatusLayout === "grid" ? 1 : 0.4,
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
