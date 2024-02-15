import { clx } from "../../../../utils/clx"

const StepContentHeader = () => {
  return (
    <>
      <div className="text-center">
        <p className={clx("text-large ")}>
          Hey Ahsan, we’re excited to have you!
        </p>
        <h1 className={clx("mt-3 text-2xl font-semibold ")}>
          Where would you like to sell?
        </h1>
      </div>
    </>
  )
}

export default StepContentHeader
