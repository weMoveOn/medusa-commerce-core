import React from "react"

import { ArrowLongRight } from "@medusajs/icons"
import { FAQ } from "./faq"

const Video = () => {
  return (
    <div>
      <h1 className="text-lg font-bold">MoveShop Exploration</h1>
      <div className=" mt-3  border ">
        <div className="inline-flex h-[210px] w-[436px] items-center justify-center rounded-lg bg-black py-[69px] shadow">
          <div className="relative flex h-[72px] w-[72px] flex-col items-start justify-start rounded-[48px] border-2 border-white bg-white bg-opacity-20 backdrop-blur-lg" />
        </div>
      </div>
    </div>
  )
}

const SuggestedCard = ({
  title,
  content,
  linkText,
}: {
  title: string
  content: string
  linkText: string
}) => {
  return (
    <div className="border-b-2py-3 flex items-start  justify-between gap-5">
      <img
        className="h-12 w-12 rounded-lg"
        src="https://source.unsplash.com/user/c_v_r/48x48"
      />

      <div>
        <p className=" mb-3 text-sm font-semibold leading-normal text-black">
          {title}
        </p>
        <p className="text-sm font-normal leading-tight text-neutral-700">
          {content}
        </p>
        <div className="mt-4 flex items-center gap-3  ">
          <div className=" text-sm font-medium leading-tight text-black">
            {linkText}
          </div>
          <ArrowLongRight />
        </div>
      </div>
    </div>
  )
}
const Suggested = () => {
  return (
    <div className=" rounded-lg  bg-white  p-5 shadow">
      <div>
        <h3 className=" text-base font-semibold leading-normal text-black">
          Suggested for you
        </h3>
        <p className=" font-['Inter'] text-sm font-normal leading-tight text-black">
          Here’s a guide to get started. As your business grows.
        </p>
      </div>

      <div className="mt-8 ">
        <SuggestedCard
          linkText="View Theme Store"
          title="Join our facebook group"
          content="Here’s a guide to get started. As your business grows."
        />
        <hr className="my-3" />
        <SuggestedCard
          linkText="View Theme Store"
          title="Join our facebook group"
          content="Here’s a guide to get started. As your business grows."
        />
      </div>
    </div>
  )
}

const Join = () => {
  return (
    <div className=" rounded-lg  bg-white p-5 shadow">
      <SuggestedCard
        linkText="View Theme Store"
        title="Join our facebook group"
        content="Here’s a guide to get started. As your business grows."
      />
      <hr className="my-3" />
      <SuggestedCard
        linkText="View Theme Store"
        title="Join our facebook group"
        content="Here’s a guide to get started. As your business grows."
      />
      <hr className="my-3" />
      <SuggestedCard
        linkText="View Theme Store"
        title="Join our facebook group"
        content="Here’s a guide to get started. As your business grows."
      />
      <div className="mb-32"></div>
    </div>
  )
}

const SidebarMoveShopExplanation: React.FC = () => {
  return (
    // overflow-y-auto
    <div className="medium:block hidden    ">
      {/* min-w-sidebar bg-gray-0 border-grey-20  pr-xlarge pl-base    h-screen max-w-[400px] */}
      <div className=" mb-5 flex min-w-[436px] flex-col gap-6 ">
        <Video />
        <Suggested />
        <FAQ />
        <Join />
      </div>
    </div>
  )
}

export default SidebarMoveShopExplanation
