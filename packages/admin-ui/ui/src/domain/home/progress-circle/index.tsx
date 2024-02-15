import React from "react"

const ProgressCircle = ({ stepsCompleted }: { stepsCompleted: number }) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  console.log("circumference :>> ", circumference)

  const progress = (stepsCompleted / 5) * circumference

  return (
    <svg className="progress-circle" width="200" height="200">
      <circle
        style={{
          fill: "none",
          stroke: "#ddd",
          strokeWidth: "10px",
        }}
        cx="100"
        cy="100"
        r={radius}
      />
      <circle
        style={{
          fill: "none",
          stroke: "#00893C", // Change this to your desired color
          strokeWidth: "10px",
          strokeLinecap: "round",
          transition: "stroke-dashoffset 1s ease-in-out",
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
        }}
        cx="100"
        cy="100"
        r={radius}
      />
    </svg>
  )
}

export default ProgressCircle
