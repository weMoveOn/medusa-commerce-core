"use client"

import type { OpenAPIV3 } from "openapi-types"
import { useEffect, useState } from "react"
import useSWR from "swr"
import fetcher from "@/utils/swr-fetcher"
import { useBaseSpecs } from "@/providers/base-specs"
import dynamic from "next/dynamic"
import type { TagSectionProps } from "./Section"
import { useArea } from "@/providers/area"
import getLinkWithBasePath from "@/utils/get-link-with-base-path"
import { SidebarItemSections, useSidebar } from "docs-ui"
import getSectionId from "@/utils/get-section-id"
import { ExpandedDocument } from "@/types/openapi"
import getTagChildSidebarItems from "@/utils/get-tag-child-sidebar-items"

const TagSection = dynamic<TagSectionProps>(
  async () => import("./Section")
) as React.FC<TagSectionProps>

export type TagsProps = React.HTMLAttributes<HTMLDivElement>

function getCurrentTag() {
  return typeof location !== "undefined"
    ? location.hash.replace("#", "").split("_")[0]
    : ""
}

const Tags = () => {
  const [tags, setTags] = useState<OpenAPIV3.TagObject[]>([])
  const [loadData, setLoadData] = useState<boolean>(false)
  const [expand, setExpand] = useState<string>("")
  const { baseSpecs, setBaseSpecs } = useBaseSpecs()
  const { addItems } = useSidebar()
  const { area } = useArea()

  const { data } = useSWR<ExpandedDocument>(
    loadData && !baseSpecs
      ? getLinkWithBasePath(`/base-specs?area=${area}&expand=${expand}`)
      : null,
    fetcher,
    {
      errorRetryInterval: 2000,
    }
  )

  useEffect(() => {
    setExpand(getCurrentTag())
  }, [])

  useEffect(() => {
    setLoadData(true)
  }, [expand])

  useEffect(() => {
    if (data) {
      setBaseSpecs(data)
    }
    if (data?.tags) {
      setTags(data.tags)
    }
  }, [data, setBaseSpecs])

  useEffect(() => {
    if (baseSpecs) {
      addItems(
        baseSpecs.tags?.map((tag) => {
          const tagPathName = getSectionId([tag.name.toLowerCase()])
          const childItems =
            baseSpecs.expandedTags &&
            Object.hasOwn(baseSpecs.expandedTags, tagPathName)
              ? getTagChildSidebarItems(baseSpecs.expandedTags[tagPathName])
              : []
          return {
            path: tagPathName,
            title: tag.name,
            children: childItems,
            loaded: childItems.length > 0,
          }
        }) || [],
        {
          section: SidebarItemSections.BOTTOM,
        }
      )
    }
  }, [baseSpecs, addItems])

  return (
    <>
      {tags.map((tag, index) => (
        <TagSection tag={tag} key={index} />
      ))}
    </>
  )
}

export default Tags
