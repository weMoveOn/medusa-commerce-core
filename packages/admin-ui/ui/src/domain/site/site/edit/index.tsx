import React, { useEffect, useState } from "react"
import SiteEditModal from "./components/SiteEditModal"
import { useNavigate } from "react-router-dom"

const SiteEdit = () => {
  // Hooks
  const navigate = useNavigate()
  // All State
  const [openSiteEditModal, setOpenSiteEditModal] = useState(true)
  //   For First render modal should show
  useEffect(() => {
    if (!openSiteEditModal) {
      setOpenSiteEditModal(true)
    }
  }, [])

  // if modal is close then navigate to site page
  useEffect(() => {
    if (!openSiteEditModal) {
      navigate("/a/site")
    }
  }, [openSiteEditModal])

  return (
    <div>
      {
        <SiteEditModal
          openSiteEditModal={openSiteEditModal}
          setOpenSiteEditModal={setOpenSiteEditModal}
        />
      }
    </div>
  )
}

export default SiteEdit
