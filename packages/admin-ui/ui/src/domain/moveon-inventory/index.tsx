import { Route, Routes } from "react-router-dom"
import Overview from "./overview"
import MoveonInventoryImportedProduct from "../../components/templates/moveon-inventory-imported-product"
import MoveonProduct from "../../components/templates/moveon-product"

const MoveOnInventoryRoute = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="/imported-products" element={<Overview selectedView="Imported Products" />} />
    </Routes>
  )
}

export default MoveOnInventoryRoute
