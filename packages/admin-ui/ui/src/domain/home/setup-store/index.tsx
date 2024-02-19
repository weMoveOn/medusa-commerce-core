/* eslint-disable no-undef */
import { Check } from "@medusajs/icons"
import Step from "../../onboarding/onboarding-stepper/step"
import { v4 as uuidv4 } from "uuid"

const stepperData = [
  { id: 1, title: "Step 1", content: "Add Product", status: "complete" },
  { id: 2, title: "Step 2", content: "Shipping", status: "complete" },
  { id: 3, title: "Step 3", content: "Payments", status: "current" },
  { id: 4, title: "Step 4", content: "Online Store", status: "incoming" },
  { id: 5, title: "Step 5", content: "Launch", status: "incoming" },
]

export const SetupStore = () => {
  return (
    <div className="mt-9">
      <div className="mb-3 mt-5">
        <h1 className="text-xl font-bold">SetupStore with your store</h1>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
      </div>

      <>
        <div className=" relative left-[12px] mb-[18px] flex justify-between rounded-lg px-4  ">
          {stepperData?.map((item, i) => {
            if (item.status === "complete") {
              return (
                <Step
                  key={uuidv4()}
                  icon={<Check />}
                  textColor="text-white"
                  label="Complete Step"
                  color="green"
                />
              )
            }

            if (item.status === "current") {
              return (
                <Step
                  key={uuidv4()}
                  label="Current Step"
                  color="black"
                  textColor="text-white"
                />
              )
            }

            return (
              <Step key={uuidv4()} label="Coming Step" textColor="text-black" />
            )
          })}
        </div>
      </>
    </div>
  )
}
