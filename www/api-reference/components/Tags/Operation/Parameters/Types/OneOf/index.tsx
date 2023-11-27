import type { SchemaObject } from "@/types/openapi"
import clsx from "clsx"
import dynamic from "next/dynamic"
import { useState } from "react"
import Details from "@/components/Details"
import type { TagOperationParametersDefaultProps } from "../Default"
import type { TagsOperationParametersNestedProps } from "../../Nested"
import type { TagOperationParametersProps } from "../.."
import Loading from "@/components/Loading"

const TagOperationParameters = dynamic<TagOperationParametersProps>(
  async () => import("../.."),
  {
    loading: () => <Loading />,
  }
) as React.FC<TagOperationParametersProps>

const TagOperationParametersDefault =
  dynamic<TagOperationParametersDefaultProps>(
    async () => import("../Default"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagOperationParametersDefaultProps>

const TagsOperationParametersNested =
  dynamic<TagsOperationParametersNestedProps>(
    async () => import("../../Nested"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagsOperationParametersNestedProps>

export type TagOperationParamatersOneOfProps = {
  schema: SchemaObject
  isRequired?: boolean
  isNested?: boolean
}

const TagOperationParamatersOneOf = ({
  schema,
  isRequired = false,
  isNested = false,
}: TagOperationParamatersOneOfProps) => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const getName = (item: SchemaObject): string => {
    if (item.title) {
      return item.title
    }

    if (item.anyOf || item.allOf) {
      // return the name of any of the items
      const name = item.anyOf
        ? item.anyOf.find((i) => i.title !== undefined)?.title
        : item.allOf?.find((i) => i.title !== undefined)?.title

      if (name) {
        return name
      }
    }

    return item.type || ""
  }

  const getContent = () => {
    return (
      <>
        <div className={clsx("flex items-center gap-1 pl-1")}>
          <span className="inline-block">One of</span>
          <ul className="mb-0 flex list-none gap-1">
            {schema.oneOf?.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  "rounded-xs cursor-pointer p-0.5",
                  "border border-solid",
                  activeTab === index &&
                    "bg-medusa-bg-subtle dark:bg-medusa-bg-subtle-dark border-medusa-border-strong dark:border-medusa-border-strong-dark",
                  activeTab !== index &&
                    "bg-medusa-bg-base dark:bg-medusa-bg-base-dark border-medusa-border-base dark:border-medusa-border-base-dark"
                )}
                onClick={() => setActiveTab(index)}
              >
                {getName(item)}
              </li>
            ))}
          </ul>
        </div>

        {schema.oneOf && (
          <>
            <TagOperationParameters
              schemaObject={schema.oneOf[activeTab]}
              topLevel={true}
            />
          </>
        )}
      </>
    )
  }

  return (
    <>
      {isNested && (
        <Details
          summaryContent={
            <TagOperationParametersDefault
              schema={schema}
              name={schema.parameterName || schema.title || ""}
              isRequired={isRequired}
              expandable={true}
            />
          }
          className="!border-y-0"
        >
          <TagsOperationParametersNested>
            {getContent()}
          </TagsOperationParametersNested>
        </Details>
      )}
      {!isNested && getContent()}
    </>
  )
}

export default TagOperationParamatersOneOf
