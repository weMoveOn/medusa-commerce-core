import React from "react"
import { useNavigate } from "react-router-dom"

const Site = () => {
  const navigate = useNavigate()
  return (
    <div className=" space-y-4">
      <div className=" space-y-4">
        <div className=" rounded-lg border p-4">
          <div className=" flex justify-between">
            <h2 className=" font-semibold">Design & branding</h2>
            <button
              onClick={() => navigate("edit")}
              className=" font-medium text-green-500"
            >
              Customize
            </button>
          </div>
          Customize the theme, colors, and layout of your site
        </div>
      </div>
    </div>
  )
}

export default Site
