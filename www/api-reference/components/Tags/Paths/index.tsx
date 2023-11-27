"use client"

import getSectionId from "@/utils/get-section-id"
import fetcher from "@/utils/swr-fetcher"
import type { OpenAPIV3 } from "openapi-types"
import useSWR from "swr"
import type { Operation, PathsObject } from "@/types/openapi"
import type { SidebarItemType } from "@/providers/sidebar"
import { SidebarItemSections, useSidebar } from "@/providers/sidebar"
import { Fragment, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import type { TagOperationProps } from "../Operation"
import { useArea } from "@/providers/area"
import getLinkWithBasePath from "@/utils/get-link-with-base-path"
import clsx from "clsx"
import { useBaseSpecs } from "@/providers/base-specs"
import getTagChildSidebarItems from "@/utils/get-tag-child-sidebar-items"
import { useLoading } from "@/providers/loading"
import DividedLoading from "@/components/Loading/Divided"

const TagOperation = dynamic<TagOperationProps>(
  async () => import("../Operation")
) as React.FC<TagOperationProps>

export type TagPathsProps = {
  tag: OpenAPIV3.TagObject
} & React.HTMLAttributes<HTMLDivElement>

const TagPaths = ({ tag, className }: TagPathsProps) => {
  const tagSlugName = useMemo(() => getSectionId([tag.name]), [tag])
  const { area } = useArea()
  const { items, addItems, findItemInSection } = useSidebar()
  const { baseSpecs } = useBaseSpecs()
  const { loading } = useLoading()
  // if paths are already loaded since through
  // the expanded field, they're loaded directly
  // otherwise, they're loaded using the API endpoint
  let paths: PathsObject =
    baseSpecs?.expandedTags &&
    Object.hasOwn(baseSpecs.expandedTags, tagSlugName)
      ? baseSpecs.expandedTags[tagSlugName]
      : {}
  const { data } = useSWR<{
    paths: PathsObject
  }>(
    !Object.keys(paths).length
      ? getLinkWithBasePath(`/tag?tagName=${tagSlugName}&area=${area}`)
      : null,
    fetcher,
    {
      errorRetryInterval: 2000,
    }
  )

  paths = data?.paths || paths

  useEffect(() => {
    if (paths) {
      const parentItem = findItemInSection(
        items[SidebarItemSections.BOTTOM],
        tagSlugName,
        false
      )
      if (!parentItem?.children?.length) {
        const items: SidebarItemType[] = getTagChildSidebarItems(paths)

        addItems(items, {
          section: SidebarItemSections.BOTTOM,
          parent: {
            path: tagSlugName,
            changeLoaded: true,
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths])

  return (
    <div className={clsx("relative", className)}>
      {loading && <DividedLoading className="mt-7" />}
      {Object.entries(paths).map(([endpointPath, operations], pathIndex) => (
        <Fragment key={pathIndex}>
          {Object.entries(operations).map(
            ([method, operation], operationIndex) => (
              <TagOperation
                method={method}
                operation={operation as Operation}
                tag={tag}
                key={`${pathIndex}-${operationIndex}`}
                endpointPath={endpointPath}
                className={clsx("pt-7")}
              />
            )
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default TagPaths
