import { useState, useEffect } from "react"

const useViewportSize = () => {
  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    handleResize() // Initial width setup

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setIsMobile(width < 640)
  }, [width])

  return { width, isMobile }
}

export default useViewportSize
