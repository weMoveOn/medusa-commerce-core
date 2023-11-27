import React, { useMemo } from "react"
import type { Props } from "@theme/MDXComponents/A"
import { getGlossaryByPath } from "../../utils/glossary"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { MedusaDocusaurusContext } from "@medusajs/docs"
import Tooltip from "../../components/Tooltip"
import Link from "@docusaurus/Link"
import clsx from "clsx"

const MDXA = (props: Props) => {
  const { href, children } = props
  const {
    siteConfig: { url },
  } = useDocusaurusContext() as MedusaDocusaurusContext

  // check if a glossary exists for href
  const glossary = useMemo(() => {
    return (typeof children === "string" && href.startsWith("/")) ||
      href.includes(url)
      ? getGlossaryByPath(children as string)
      : null
  }, [href, children])

  if (!glossary) {
    return <Link {...props} />
  }

  return (
    <Tooltip
      tooltipChildren={
        <span className="flex flex-col gap-0.25 max-w-[200px]">
          <span className="text-compact-small-plus text-medusa-fg-base dark:text-medusa-fg-base-dark">
            {glossary.title}
          </span>
          <span className="text-compact-small">{glossary.content}</span>
        </span>
      }
      clickable={true}
    >
      <Link
        {...props}
        className={clsx(props.className, "border-0 border-b border-dashed")}
      />
    </Tooltip>
  )
}

export default MDXA
