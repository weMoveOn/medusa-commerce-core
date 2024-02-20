import Checkbox, { CheckboxProps } from "../../../components/atoms/checkbox"
import CheckCircleSolid from "../../../components/fundamentals/icons/check-circle-solid"
import CircleDottedLine from "../../../components/fundamentals/icons/circle-dotted-line"

import Accordion from "../accordion"
import { Control, Controller, useForm, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

const products = [
  {
    id: 1,
    title: "Step 1",
    label: "Add your first product",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 2,
    title: "Step 2",
    label: "Setup your shipping plan",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 3,
    title: "Step 3",
    label: "Enable payments",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "current",
  },
  {
    id: 4,
    title: "Step 4",
    label: "Create your business store",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
  {
    id: 5,
    title: "Step 5",
    label: "Launch your business",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
]

const AccordionHeader = ({
  label,
  isComplete,
}: {
  label: string
  isComplete: Boolean
}) => {
  return (
    <>
      <div className="flex items-center  gap-3 ">
        {isComplete ? (
          <CheckCircleSolid width={40} height={40} />
        ) : (
          <CircleDottedLine width={40} height={40} />
        )}

        <p className="text-large  font-semibold ">{label}</p>
      </div>
    </>
  )
}

type ControlledCheckboxProps = {
  control: Control
  name: string
  id: string
  index: number
} & CheckboxProps

const ControlledCheckbox = ({
  control,
  name,
  id,
  index,
  value,
  ...props
}: ControlledCheckboxProps) => {
  const variants = useWatch({
    control,
    name,
  })

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Checkbox
            className="inter-small-regular shrink-0"
            {...props}
            {...field}
          />
        )
      }}
    />
  )
}

export const SetupProduct = () => {
  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      "Step 1": false,
      "Step 2": false,
      "Step 3": false,
      "Step 4": false,
      "Step 5": false,
    },
  })

  const onSubmit = (data: any) => {
    console.log("data :>> ", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" mt-4 w-full">
        <Accordion
          defaultValue={[`initialExpanded`]}
          type="multiple"
          className="flex flex-col gap-4"
        >
          {products?.map((product, i) => {
            return (
              <Accordion.Item
                key={product.title}
                index={i}
                // @ts-ignore
                title={
                  <AccordionHeader
                    label={product.label}
                    isComplete={product.status === "complete"}
                  />
                }
                value={i === 0 ? "initialExpanded" : product.title}
                headingSize={"large"}
                className={" rounded-lg bg-white "}
              >
                <div className={"h-[1px] w-full bg-[#E3E3E3] "}></div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <p className="inter-base-regular text-grey-50  ">
                      {product.content}
                    </p>
                    <div className="mt-6">
                      <button className=" h-10 w-[127px]  rounded-lg border bg-zinc-900  text-white">
                        Get Started
                      </button>
                      <div className={" mt-[14px] "}>
                        <label
                          htmlFor={product.title}
                          className="flex items-center gap-3"
                        >
                          <ControlledCheckbox
                            control={control}
                            label="Mark as completed"
                            name={product.title}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div
                    className={"medium:block hidden h-[100px] w-[101.45px] "}
                  >
                    <img
                      className="w-full rounded-lg"
                      src="https://source.unsplash.com/user/c_v_r/100x100"
                    />
                  </div>
                </div>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  )
}
