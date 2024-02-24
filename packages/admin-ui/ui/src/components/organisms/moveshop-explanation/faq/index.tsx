import Accordion from "../accordion"

const products = [
  {
    id: 1,
    title: "Step 1",
    label: "Is there a free trial available?",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 2,
    title: "Step 2",
    label: "Can I customize my theme?",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 3,
    title: "Step 3",
    label: "Can I customize my theme?",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "current",
  },
  {
    id: 4,
    title: "Step 4",
    label: "Can I customize my theme?",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
  {
    id: 5,
    title: "Step 5",
    label: "Can I customize my theme?",

    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
]

const AccordionTitle = ({
  label,
  isComplete,
}: {
  label: string
  isComplete: Boolean
}) => {
  return (
    <>
      <p className=" text-base font-medium leading-normal text-gray-900">
        {label}
      </p>
    </>
  )
}

export const FAQ = () => {
  return (
    <div className="rounded-lg  bg-white  p-5 shadow">
      <div>
        <h4 className=" text-large  w-full font-semibold leading-normal text-black">
          FAQ
        </h4>
        <p>
          Questions & answers that might help <br /> you with MoveShop
        </p>
      </div>
      <div>
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
                  <AccordionTitle
                    label={product.label}
                    isComplete={product.status === "complete"}
                  />
                }
                value={i === 0 ? "initialExpanded" : product.title}
                headingSize={"large"}
                className={" rounded-lg bg-white "}
              >
                <div className="flex items-center justify-between ">
                  <div>
                    <p className="inter-base-regular text-grey-50  ">
                      {product.content}
                    </p>
                  </div>
                </div>
              </Accordion.Item>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
