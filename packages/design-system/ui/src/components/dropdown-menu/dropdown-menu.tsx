"use client"

import { CheckMini, ChevronRightMini, EllipseMiniSolid } from "@medusajs/icons"
import * as Primitives from "@radix-ui/react-dropdown-menu"
import * as React from "react"

import { clx } from "@/utils/clx"

const Root = Primitives.Root
Root.displayName = "DropdownMenu.Root"

const Trigger = Primitives.Trigger
Trigger.displayName = "DropdownMenu.Trigger"

const Group = Primitives.Group
Group.displayName = "DropdownMenu.Group"

const SubMenu = Primitives.Sub
SubMenu.displayName = "DropdownMenu.SubMenu"

const RadioGroup = Primitives.RadioGroup
RadioGroup.displayName = "DropdownMenu.RadioGroup"

const SubMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Primitives.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof Primitives.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <Primitives.SubTrigger
    ref={ref}
    className={clx(
      "focus:bg-ui-bg-base-pressed data-[state=open]:bg-ui-bg-base-pressed txt-compact-small flex cursor-default select-none items-center rounded-sm px-3 py-2 outline-none",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRightMini className="ml-auto" />
  </Primitives.SubTrigger>
))
SubMenuTrigger.displayName = "DropdownMenu.SubMenuTrigger"

const SubMenuContent = React.forwardRef<
  React.ElementRef<typeof Primitives.SubContent>,
  React.ComponentPropsWithoutRef<typeof Primitives.SubContent>
>(({ className, collisionPadding = 8, ...props }, ref) => (
  <Primitives.Portal>
    <Primitives.SubContent
      ref={ref}
      collisionPadding={collisionPadding}
      className={clx(
        "bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[8rem] overflow-hidden rounded-lg border p-1",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </Primitives.Portal>
))
SubMenuContent.displayName = "DropdownMenu.SubMenuContent"

const Content = React.forwardRef<
  React.ElementRef<typeof Primitives.Content>,
  React.ComponentPropsWithoutRef<typeof Primitives.Content>
>(
  (
    {
      className,
      sideOffset = 8,
      collisionPadding = 8,
      align = "start",
      ...props
    },
    ref
  ) => (
    <Primitives.Portal>
      <Primitives.Content
        ref={ref}
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        className={clx(
          "bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </Primitives.Portal>
  )
)
Content.displayName = "DropdownMenu.Content"

const Item = React.forwardRef<
  React.ElementRef<typeof Primitives.Item>,
  React.ComponentPropsWithoutRef<typeof Primitives.Item>
>(({ className, ...props }, ref) => (
  <Primitives.Item
    ref={ref}
    className={clx(
      "bg-ui-bg-base focus:bg-ui-bg-base-pressed text-ui-fg-base data-[disabled]:text-ui-fg-disabled txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 outline-none transition-colors data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  />
))
Item.displayName = "DropdownMenu.Item"

const CheckboxItem = React.forwardRef<
  React.ElementRef<typeof Primitives.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof Primitives.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <Primitives.CheckboxItem
    ref={ref}
    className={clx(
      "focus:bg-ui-bg-base-pressed text-ui-fg-base data-[disabled]:text-ui-fg-disabled relative flex cursor-pointer select-none items-center rounded-md py-2 pl-10 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-3 flex h-5 w-5 items-center justify-center">
      <Primitives.ItemIndicator>
        <CheckMini />
      </Primitives.ItemIndicator>
    </span>
    {children}
  </Primitives.CheckboxItem>
))
CheckboxItem.displayName = "DropdownMenu.CheckboxItem"

const RadioItem = React.forwardRef<
  React.ElementRef<typeof Primitives.RadioItem>,
  React.ComponentPropsWithoutRef<typeof Primitives.RadioItem>
>(({ className, children, ...props }, ref) => (
  <Primitives.RadioItem
    ref={ref}
    className={clx(
      "focus:bg-ui-bg-base-pressed hover:bg-ui-base-hover bg-ui-bg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-2 pl-10 pr-3 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[state=checked]:font-medium data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-3 flex h-5 w-5 items-center justify-center">
      <Primitives.ItemIndicator>
        <EllipseMiniSolid className="text-ui-fg-base" />
      </Primitives.ItemIndicator>
    </span>
    {children}
  </Primitives.RadioItem>
))
RadioItem.displayName = "DropdownMenu.RadioItem"

const Label = React.forwardRef<
  React.ElementRef<typeof Primitives.Label>,
  React.ComponentPropsWithoutRef<typeof Primitives.Label>
>(({ className, ...props }, ref) => (
  <Primitives.Label
    ref={ref}
    className={clx(
      "text-ui-fg-subtle txt-compact-xsmall-plus px-2 py-1.5",
      className
    )}
    {...props}
  />
))
Label.displayName = "DropdownMenu.Label"

const Separator = React.forwardRef<
  React.ElementRef<typeof Primitives.Separator>,
  React.ComponentPropsWithoutRef<typeof Primitives.Separator>
>(({ className, ...props }, ref) => (
  <Primitives.Separator
    ref={ref}
    className={clx("bg-ui-border-base -mx-1 my-1 h-px", className)}
    {...props}
  />
))
Separator.displayName = "DropdownMenu.Separator"

const Shortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clx(
        "text-ui-fg-subtle txt-compact-small ml-auto tracking-widest",
        className
      )}
      {...props}
    />
  )
}
Shortcut.displayName = "DropdownMenu.Shortcut"

const Hint = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={clx(
        "text-ui-fg-subtle txt-compact-small ml-auto tracking-widest",
        className
      )}
      {...props}
    />
  )
}
Hint.displayName = "DropdownMenu.Hint"

const DropdownMenu = Object.assign(Root, {
  Trigger,
  Group,
  SubMenu,
  SubMenuContent,
  SubMenuTrigger,
  Content,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Label,
  Separator,
  Shortcut,
  Hint,
})

export { DropdownMenu }
