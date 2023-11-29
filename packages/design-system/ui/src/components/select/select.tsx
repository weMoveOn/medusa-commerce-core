"use client"

import { ChevronUpDown, EllipseMiniSolid } from "@medusajs/icons"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva } from "class-variance-authority"
import * as React from "react"

import { clx } from "@/utils/clx"

interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  size?: "base" | "small"
}

type SelectContextValue = {
  size: "base" | "small"
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

const useSelectContext = () => {
  const context = React.useContext(SelectContext)

  if (context === null) {
    throw new Error("useSelectContext must be used within a SelectProvider")
  }

  return context
}

const Root = ({ children, size = "base", ...props }: SelectProps) => {
  return (
    <SelectContext.Provider value={React.useMemo(() => ({ size }), [size])}>
      <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
    </SelectContext.Provider>
  )
}

const Group = SelectPrimitive.Group

const Value = SelectPrimitive.Value

const triggerVariants = cva(
  clx(
    "bg-ui-bg-field txt-compact-medium shadow-buttons-neutral transition-fg flex w-full select-none items-center justify-between rounded-md outline-none",
    "data-[placeholder]:text-ui-fg-muted text-ui-fg-base",
    "hover:bg-ui-bg-field-hover",
    "focus:shadow-borders-interactive-with-active data-[state=open]:!shadow-borders-interactive-with-active",
    "aria-[invalid=true]:border-ui-border-error aria-[invalid=true]:shadow-borders-error",
    "invalid::border-ui-border-error invalid:shadow-borders-error",
    "disabled:!bg-ui-bg-disabled disabled:!text-ui-fg-disabled",
    "group/trigger"
  ),
  {
    variants: {
      size: {
        base: "h-10 px-3 py-[9px]",
        small: "h-8 px-2 py-[5px]",
      },
    },
  }
)

const Trigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { size } = useSelectContext()

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={clx(triggerVariants({ size }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronUpDown className="text-ui-fg-muted group-disabled/trigger:text-ui-fg-disabled" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
Trigger.displayName = SelectPrimitive.Trigger.displayName

const Content = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(
  (
    {
      className,
      children,
      position = "popper",
      sideOffset = 8,
      collisionPadding = 24,
      ...props
    },
    ref
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={clx(
          "bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout relative max-h-[200px] min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          {
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1":
              position === "popper",
          },
          className
        )}
        position={position}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={clx(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)
Content.displayName = SelectPrimitive.Content.displayName

const Label = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={clx(
      "txt-compact-xsmall-plus text-ui-fg-subtle px-3 py-2",
      className
    )}
    {...props}
  />
))
Label.displayName = SelectPrimitive.Label.displayName

const Item = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const { size } = useSelectContext()

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={clx(
        "txt-compact-medium bg-ui-bg-base grid cursor-pointer grid-cols-[20px_1fr] gap-x-2 rounded-md px-3 py-2 outline-none transition-colors",
        "hover:bg-ui-bg-base-hover focus:bg-ui-bg-base-hover",
        {
          "txt-compact-medium data-[state=checked]:txt-compact-medium-plus":
            size === "base",
          "txt-compact-small data-[state=checked]:txt-compact-medium-plus":
            size === "small",
        },
        className
      )}
      {...props}
    >
      <span className="flex h-5 w-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <EllipseMiniSolid />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
Item.displayName = SelectPrimitive.Item.displayName

const Separator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={clx("bg-ui-border-base -mx-1 my-1 h-px", className)}
    {...props}
  />
))
Separator.displayName = SelectPrimitive.Separator.displayName

const Select = Object.assign(Root, {
  Group,
  Value,
  Trigger,
  Content,
  Label,
  Item,
  Separator,
})

export { Select }
