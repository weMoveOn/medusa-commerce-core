import React from "react"
import IconCircle from "../../fundamentals/icon-circle"
import IconSquare from "../../fundamentals/icon-square"

const ICON_SIZE = 20

const Video = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">MoveShop Exploration</h1>
      <div className=" mt-3    border ">
        <video
          width={350}
          height={200}
          src="https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4"
          controls
        ></video>
      </div>
    </div>
  )
}

const SuggestedCard = () => {
  return (
    <div className="flex items-center justify-between gap-5 border-b-2 py-3">
      <div>
        <IconSquare className="h-10 w-10" />
      </div>

      <div>
        <h2 className="text-xl font-bold">Browse 100 of theme</h2>
        <p>Here’s a guide to get started. As your business grows.</p>
        <div className="flex items-center gap-2  underline">
          <p>View Theme Store</p>
          <IconSquare className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
const Suggested = () => {
  return (
    <div className=" mt-12 w-[350px]   rounded-xl bg-[#F4F4F4] p-5">
      <div>
        <h1 className="text-xl font-bold">Suggested for you</h1>
        <p>Here’s a guide to get started. As your business grows.</p>
      </div>

      <SuggestedCard />
      <SuggestedCard />
    </div>
  )
}

const FaqCard = () => {
  return (
    <div className=" border-t-2">
      <div className="  flex items-center justify-between gap-2  py-3 underline">
        <p>Is it free?</p>
        <IconSquare className="h-4 w-4" />
      </div>
    </div>
  )
}

const FAQ = () => {
  return (
    <div className=" mt-12 w-[350px]   rounded-xl bg-[#F4F4F4] p-5">
      <div>
        <h1 className="text-xl font-bold">FAQ</h1>
        <p>Questions & answers that might help you with MoveShop</p>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-bold">View Theme Store</h1>

          <IconCircle />
        </div>
        <p>Questions & answers that might help you with MoveShop</p>
      </div>

      <div className="flex flex-col ">
        <FaqCard />
        <FaqCard />
        <FaqCard />
        <FaqCard />
      </div>
    </div>
  )
}

const Join = () => {
  return (
    <div className=" mt-12 w-[350px] rounded-xl bg-[#F4F4F4] p-5 ">
      <SuggestedCard />
      <SuggestedCard />
      <SuggestedCard />
    </div>
  )
}

const SidebarMoveShopExplanation: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto  ">
      <div className="min-w-sidebar bg-gray-0 border-grey-20  pr-xlarge pl-base   mt-5 h-screen max-w-[400px]">
        <Video />
        <Suggested />
        <FAQ />
        <Join />
        <div className="h-20"></div>
      </div>
    </div>
  )
}

export default SidebarMoveShopExplanation
