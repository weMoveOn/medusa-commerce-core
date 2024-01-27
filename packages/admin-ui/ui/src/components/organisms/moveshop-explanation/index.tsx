import React from "react"

import { Icon } from "../../../domain/home"

const ICON_SIZE = 20

const Video = () => {
  return (
    <div className=" bg-grey-30  h-[200px] w-[350px]   rounded-xl p-12">
      Video
    </div>
  )
}

const SuggestedCard = () => {
  return (
    <div className="mt-5 flex items-center justify-between gap-5">
      <div>
        <Icon size={10} />
      </div>

      <div>
        <h2 className="text-xl font-bold">Browse 100 of theme</h2>
        <p>Here’s a guide to get started. As your business grows.</p>
        <div className="flex items-center gap-2  underline">
          <p>View Theme Store</p>
          <Icon size={6} />
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
    <div className=" mt-7 border-t-2">
      <div className=" mb-5 flex items-center justify-between gap-2  underline">
        <p>Is it free?</p>
        <Icon size={6} />
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

          <Icon size={6} />
        </div>
        <p>Questions & answers that might help you with MoveShop</p>
      </div>

      <FaqCard />
      <FaqCard />
      <FaqCard />
      <FaqCard />
    </div>
  )
}

const Join = () => {
  return (
    <div className=" mt-12 w-[350px]   rounded-xl bg-[#F4F4F4] p-5">
      <SuggestedCard />
      <SuggestedCard />
      <SuggestedCard />
    </div>
  )
}

const SidebarMoveShopExplanation: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto  ">
      <div className="min-w-sidebar bg-gray-0 border-grey-20 py-base  mx-[50px] h-screen max-w-[400px]">
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
