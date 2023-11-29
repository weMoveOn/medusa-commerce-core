import clsx from "clsx"
import React from "react"
import LearningPathIcon from "./Icon"
import { getLearningPath } from "../../utils/learning-paths"
import { useLearningPath } from "../../providers/LearningPath"
import { Button, useNotifications } from "docs-ui"
import { CircleMiniSolid } from "@medusajs/icons"
import Link from "@docusaurus/Link"

type LearningPathProps = {
  pathName: string
  className?: string
} & React.AllHTMLAttributes<HTMLDivElement>

const LearningPath: React.FC<LearningPathProps> = ({
  pathName,
  className = "",
}) => {
  const path = getLearningPath(pathName)
  if (!path) {
    throw new Error(`Learning path ${pathName} does not exist.`)
  }
  const { startPath, path: currentPath } = useLearningPath()
  const notificationContext = useNotifications()

  const handleClick = () => {
    if (notificationContext && currentPath?.notificationId) {
      notificationContext.removeNotification(currentPath.notificationId)
    }
    startPath(path)
  }

  return (
    <div
      className={clsx(
        "rounded shadow-card-rest dark:shadow-card-rest-dark bg-docs-bg-surface mt-1.5 mb-4",
        className
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-1 p-1 border-0 border-b border-solid border-medusa-border-base"
        )}
      >
        <LearningPathIcon />
        <div className={clsx("basis-3/4")}>
          <span
            className={clsx(
              "text-medusa-fg-base text-compact-large-plus block"
            )}
          >
            {path.label}
          </span>
          {path.description && (
            <span
              className={clsx(
                "text-medusa-fg-subtle text-compact-medium mt-0.25 inline-block"
              )}
            >
              {path.description}
            </span>
          )}
        </div>
        <Button onClick={handleClick} className={clsx("basis-1/4 max-w-fit")}>
          Start Path
        </Button>
      </div>
      {path.steps.map((step, index) => (
        <div
          className={clsx(
            "flex items-center p-1 gap-1 relative",
            index !== path.steps.length - 1 &&
              "border-0 border-b border-solid border-medusa-border-base"
          )}
          key={index}
        >
          <div className={clsx("w-3 flex items-center justify-center")}>
            <CircleMiniSolid className="text-medusa-fg-muted" />
          </div>
          <span
            className={clsx("text-medusa-fg-base text-compact-medium-plus")}
          >
            {step.title}
          </span>
          <Link
            href={step.path}
            className={clsx("absolute top-0 left-0 w-full h-full")}
          />
        </div>
      ))}
    </div>
  )
}

export default LearningPath
