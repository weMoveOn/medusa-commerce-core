import { CheckIcon } from "@heroicons/react/solid"

const steps = [
  { id: "01", name: "Job details", href: "#", status: "complete" },
  { id: "02", name: "Application form", href: "#", status: "current" },
  { id: "03", name: "Preview", href: "#", status: "upcoming" },
]

export default function Panels() {
  // /* This example requires Tailwind CSS v2.0+ */

  return (
    <>
      <div className="ml-20 mt-20">
        <ol
          role="list"
          className=" flex "
        >
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative border bg-black md:flex md:flex text-white" 
            style={{ clipPath: 'polygon(80% 0, 100% 50%, 80% 100%, 0 100%, 20% 50%, 0 0)' }}>


              
              {step.status === "complete" ? (
                <div className="group flex w-full items-center  ">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                      <CheckIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="ml-4 text-sm font-medium ">
                      {step.name}
                    </span>
                  </span>
                </div>
              ) : step.status === "current" ? (
                <div
                  className="flex items-center px-6 py-4 text-sm font-medium"
                  aria-current="step"
                >
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">
                    {step.name}
                  </span>
                </div>
              ) : (
                <div className="group flex items-center">
                  <span className="flex items-center px-6 py-4 text-sm font-medium">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                      <span className="text-gray-500 group-hover:text-gray-900">
                        {step.id}
                      </span>
                    </span>
                    <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                      {step.name}
                    </span>
                  </span>
                </div>
              )}

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="absolute right-0 top-0 hidden h-full w-5 md:block"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
