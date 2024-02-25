const ProgressStepper = ({ stepsCompleted }: { stepsCompleted: number }) => {
  const radius = 18
  const circumference = 2 * Math.PI * radius

  const progress = (stepsCompleted / 5) * circumference

  return (
    <svg className="progress-circle" width="60" height="60">
      <circle
        style={{
          fill: "none",
          stroke: "#ddd",
          strokeWidth: "8px",
        }}
        cx="36"
        cy="36"
        r={radius}
      />
      <circle
        style={{
          fill: "none",
          stroke: "#00893C", // Change this to your desired color
          strokeWidth: "8px",
          strokeLinecap: "round",
          transition: "stroke-dashoffset 1s ease-in-out",
          strokeDasharray: circumference,
          strokeDashoffset: circumference - progress,
        }}
        cx="36"
        cy="36"
        r={radius}
      />
    </svg>
  )
}

export default ProgressStepper
