import IconCircle from "../../../../../components/fundamentals/icon-circle"
import { StepCard } from "../../step-card"
import StepContentHeader from "../../step-content-header"

export const Step2 = () => {
  return (
    <>
      <div>
        <StepContentHeader />
        <div className="mt-4">
          <p className="mt-12">What are you planning to sell in your store?</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <StepCard
              name={"business4"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online11"}
            />
            <StepCard
              name={"business5"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online22"}
            />

            <StepCard
              name={"business6"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online33"}
            />
            <StepCard
              name={"business7"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online44"}
            />
          </div>
        </div>
      </div>
    </>
  )
}
