import { Route, Routes } from "react-router-dom"
import Site from "./site"

const SiteRoute = () => {
  return (
    <Routes>
      <Route index element={<Site />} />
    </Routes>
  )
}

export default SiteRoute
