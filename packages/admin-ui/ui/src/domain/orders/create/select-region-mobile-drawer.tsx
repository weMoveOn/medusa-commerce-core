import React, { Dispatch, SetStateAction } from "react"
import { Drawer } from "vaul"
interface IProps {
  openRegionDrawer: boolean
  setOpenRegionDrawer: Dispatch<SetStateAction<boolean>>
}
const SelectRegionMobileDrawer = ({
  openRegionDrawer,
  setOpenRegionDrawer,
}: IProps) => {
  return (
    <>
      <Drawer.Root open={openRegionDrawer} onOpenChange={setOpenRegionDrawer}>
        <Drawer.Trigger className=" justify-start">
          <div className=" gap-y-x small flex w-full flex-col">
            <label
              className="inter-small-semibold text-grey-50"
              htmlFor="select-region"
            >
              Region
            </label>
            <button
              id="select-region"
              className=" rounded-rounded border-gray-20 bg-grey-5 focus-within:shadow-cta focus-within:border-violet-60 pl-small inter-base-regular text-grey-50 box-border flex h-10 items-center overflow-hidden border p-0 text-left transition-colors"
            >
              Select...
            </button>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            blanditiis, excepturi beatae dignissimos rem ea ipsam velit hic
            accusamus ut fugit voluptatibus ipsum quaerat earum, dolorem
            deserunt iure tempora corporis.
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default SelectRegionMobileDrawer
