import { ReactNode, createContext, useState } from "react"
import Button from "../../../components/fundamentals/button"
import IconSquare from "../../../components/fundamentals/icon-square"
import TriangleDown from "../../../components/fundamentals/icons/triangle-down"
import InputField from "../../../components/molecules/input"
import Accordion from "../accordion"
import TriangleUp from "../../../components/fundamentals/icons/triangle-up"
import { CircleDottedLine } from "@medusajs/icons"

const products = [
  { id: 1, title: "Step 1", content: "Add Product", status: "complete" },
  { id: 2, title: "Step 2", content: "Shipping", status: "complete" },
  { id: 3, title: "Step 3", content: "Payments", status: "current" },
  { id: 4, title: "Step 4", content: "Online Store", status: "incoming" },
  { id: 5, title: "Step 5", content: "Launch", status: "incoming" },
]

const AccordionHeader = ({ label }: { label: string }) => {
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <CircleDottedLine />
        <p className="medium:text-2xl text-base font-bold ">{label}</p>
      </div>
    </>
  )
}

const CardBar = ({
  title,
  content,
  defaultValue,
}: {
  title: string
  content: string
  defaultValue?: string
}) => {
  return (
    <>
      <div className=" mt-4 w-full">
        <Accordion defaultValue={[`test`]} type="multiple">
          <Accordion.Item
            key={title}
            // @ts-ignore
            title={<AccordionHeader label={title} />}
            value={"test"}
            headingSize={"large"}
            className={" rounded-lg bg-white p-4"}
          >
            <div className={"py-4"}>
              <div className={"h-[2px] w-full bg-black "}></div>
              <p className="inter-base-regular text-grey-50 mt-4">{content}</p>
            </div>

            <div
              className={
                "medium:flex-row flex flex-col items-center justify-between gap-3"
              }
            >
              <div>
                <Button variant={"secondary"} className={"my-3"}>
                  Started
                </Button>
                <div className={"flex items-center gap-3 "}>
                  <label htmlFor="shipping-plan">
                    <InputField
                      type="checkbox"
                      name="shipping-plan"
                      id={"shipping-plan"}
                    />
                  </label>

                  <p>Mark as completed</p>
                </div>
              </div>
              <div className={"medium:block hidden"}>
                <IconSquare className={"h-32 w-32"} />
              </div>
            </div>
          </Accordion.Item>

          <Accordion.Item
            key={title}
            // @ts-ignore
            title={<AccordionHeader label={title} />}
            value={"test2"}
            headingSize={"large"}
            className={" rounded-lg bg-white p-4"}
          >
            <div className={"py-4"}>
              <div className={"h-[2px] w-full bg-black "}></div>
              <p className="inter-base-regular text-grey-50 mt-4">{content}</p>
            </div>

            <div
              className={
                "medium:flex-row flex flex-col items-center justify-between gap-3"
              }
            >
              <div>
                <Button variant={"secondary"} className={"my-3"}>
                  Started
                </Button>
                <div className={"flex items-center gap-3 "}>
                  <label htmlFor="shipping-plan">
                    <InputField
                      type="checkbox"
                      name="shipping-plan"
                      id={"shipping-plan"}
                    />
                  </label>

                  <p>Mark as completed</p>
                </div>
              </div>
              <div className={"medium:block hidden"}>
                <IconSquare className={"h-32 w-32"} />
              </div>
            </div>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}

export const SetupProduct = () => {
  return (
    <>
      {/* {products?.map((product, i) => {
        if (i === 0) {
          return (
            <CardBar
              defaultValue="expanded"
              key={product.title}
              title={"Add your first product"}
              content={product?.content}
            />
          )
        }
        return (
          <CardBar
            key={product.title}
            title={"Add your first product"}
            content={product?.content}
          />
        )
      })} */}

      <CardBar
        key={"product.title"}
        title={"Add your first product"}
        content={"product?.content"}
      />
    </>
  )
}
