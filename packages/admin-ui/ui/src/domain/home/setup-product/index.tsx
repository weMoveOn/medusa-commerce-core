import CircleDottedLine from "../../../components/fundamentals/icons/circle-dotted-line"
import TriangleDown from "../../../components/fundamentals/icons/triangle-down"
import TriangleUp from "../../../components/fundamentals/icons/triangle-up"
import Accordion from "../accordion"

const products = [
  {
    id: 1,
    title: "Step 1",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 2,
    title: "Step 2",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "complete",
  },
  {
    id: 3,
    title: "Step 3",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "current",
  },
  {
    id: 4,
    title: "Step 4",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
  {
    id: 5,
    title: "Step 5",
    content:
      "Write a description, add photos, and set pricing for the products you plan to sell.",
    status: "incoming",
  },
]

const AccordionHeader = ({ label }: { label: string }) => {
  return (
    <>
      <div className="flex items-center  gap-3 ">
        <CircleDottedLine width={40} height={40} />
        <p className="medium:text-2xl text-base font-bold ">{label}</p>
      </div>
    </>
  )
}

export const SetupProduct = () => {
  return (
    <>
      <div className=" mt-4 w-full">
        <Accordion
          defaultValue={[`step1`]}
          type="multiple"
          className="flex flex-col gap-4"
        >
          {products?.map((product, i) => {
            return (
              <Accordion.Item
                key={product.title}
                index={i}
                // @ts-ignore
                title={<AccordionHeader label={product.title} />}
                value={i === 0 ? "step1" : product.title}
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
                          htmlFor="shipping-plan"
                          className="flex items-center gap-3"
                        >
                          <input
                            type="checkbox"
                            name="shipping-plan"
                            id={"shipping-plan"}
                          />
                          <p>Mark as completed</p>
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
    </>
  )
}
