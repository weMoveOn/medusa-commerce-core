import { Route, Routes } from "react-router-dom"
import Overview from "./overview"

const MoveOnInventoryRoute = () => {
  return (
    <Routes>
      <Route index element={<Overview />} />
      <Route path="/imported-product" element={<Overview />} />
    </Routes>
  )
}

export default MoveOnInventoryRoute
