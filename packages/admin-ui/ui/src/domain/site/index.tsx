import { Route, Routes } from "react-router-dom"
import Site from "./site"
import SiteEdit from "./site/edit"

const SiteRoute = () => {
  return (
    <Routes>
      <Route index element={<Site />} />
      <Route path="edit" element={<SiteEdit />} />
    </Routes>
  )
}

export default SiteRoute
