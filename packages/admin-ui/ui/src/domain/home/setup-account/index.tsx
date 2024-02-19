import { Link } from "react-router-dom"
import CopyToClipboard from "../../../components/atoms/copy-to-clipboard"
import CopyIcon from "../../../components/fundamentals/icons/copy-icon"
import ProgressCircle from "../progress-circle"
import { useState } from "react"

const copy_value = "raptorshopping.moveshop.store"
export const SetupAccount = () => {
  const [stepsCompleted, setStepsCompleted] = useState(1)

  const handleStepCompletion = () => {
    if (stepsCompleted < 5) {
      setStepsCompleted((c) => stepsCompleted + 1)
    }
  }
  return (
    <>
      <div className="rounded-lg border bg-white p-4 shadow">
        <div className="  ">
          <div className="medium:items-center medium:flex-row flex flex-col items-start justify-between gap-4">
            <div className="medium:items-center medium:flex-row flex flex-col  items-start gap-3">
              <div>
                <div className="-ml-2 -mt-2">
                  <ProgressCircle stepsCompleted={stepsCompleted} />
                </div>
              </div>
              <div>
                <p className=" text-xl font-medium">
                  Set up your MoveShop Account
                </p>
                <button onClick={handleStepCompletion}>
                  {stepsCompleted}/5 steps completed
                </button>
              </div>
            </div>

            <div className=" flex flex-col ">
              <div className="flex flex-col space-y-2">
                <Link
                  to={"/a/home"}
                  className="rounded-lg border bg-white p-3 text-base"
                >
                  Updated Profile
                </Link>
              </div>
            </div>
          </div>

          <p className="mb-2 mt-6 text-xl font-semibold">Raptor Shop</p>
          <div className=" inline-flex  h-11 w-[442px] items-center justify-between rounded-lg bg-neutral-100 py-1 pl-4 pr-1">
            <div className="font-['Inter'] text-base font-normal leading-normal text-black">
              raptorshopping.moveshop.store
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="relative h-6 w-6">
                <div className="absolute left-[4px] top-[4px] flex h-4 w-4 items-center">
                  <CopyToClipboard
                    icon={<CopyIcon />}
                    value={copy_value}
                    onCopy={() => {}}
                  />
                </div>
              </div>
              <Link
                to={"raptorshopping.moveshop.store"}
                className="flex items-center justify-center gap-2.5 rounded border border-neutral-200 bg-white px-4 py-2"
              >
                <div className="font-['Inter'] text-sm font-medium leading-tight text-black">
                  Share Shop
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
