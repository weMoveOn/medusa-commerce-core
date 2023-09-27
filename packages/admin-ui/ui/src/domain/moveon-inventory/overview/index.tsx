import React, { useEffect, useState } from "react"
import Spacer from "../../../components/atoms/spacer"
import ListIcon from "../../../components/fundamentals/icons/list-icon"
import TileIcon from "../../../components/fundamentals/icons/tile-icon"
import BodyCard from "../../../components/organisms/body-card"
import TableViewHeader from "../../../components/organisms/custom-table-header"
import MoveOnInventoryImportedProduct from "../../../components/templates/moveon-inventory-imported-product"
import MoveOnProduct from "../../../components/templates/moveon-product"
import { useNavigate } from "react-router-dom"

export type ViewsType = "Product List" | "Imported Products"

const VIEWS: ViewsType[] = ["Product List", "Imported Products"]
export type ProductLayoutType = "grid" | "list"

const Overview = ({selectedView}:{selectedView?:ViewsType}) => {
  const navigate = useNavigate()
  const [view, setView] = useState<ViewsType>(selectedView? selectedView : "Product List")
  const [importedProductLayout, setImportedProductLayOut] = useState<ProductLayoutType>("grid")
  const CurrentView = () => {
    switch (view) {
      case "Product List":
        return <MoveOnProduct />
      default:
        return <MoveOnInventoryImportedProduct layout={importedProductLayout} />
    }
  }

  useEffect(() => {
    let path = "/a/moveon-inventory";

    if (view === "Imported Products") {
      path = "/a/moveon-inventory/imported-products";
    }

    navigate(path);
  }, [view, navigate]);

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
                    <span onClick={() => setImportedProductLayOut("list")}>
                      <ListIcon
                        style={{
                          opacity: importedProductLayout === "list" ? 1 : 0.4,
                          cursor: "pointer",
                        }}
                      />
                    </span>
                    <span onClick={() => setImportedProductLayOut("grid")}>
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
