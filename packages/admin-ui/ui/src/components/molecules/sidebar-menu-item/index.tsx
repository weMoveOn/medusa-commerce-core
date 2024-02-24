import React, { ReactNode, useCallback, useState } from "react"
import Collapsible from "react-collapsible"
import { NavLink } from "react-router-dom"
import Badge from "../../fundamentals/badge"
import ChevronUpIcon from "../../fundamentals/icons/chevron-up"
import ChevronDownIcon from "../../fundamentals/icons/chevron-down"

type SidebarMenuSubitemProps = {
  pageLink: string
  text: string
}

type SidebarMenuItemProps = {
  pageLink: string
  text: string
  icon: ReactNode
  triggerHandler: () => any
  subItems?: SidebarMenuSubitemProps[]
  isNew?: boolean
}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> & {
  SubItem: (props: SidebarMenuSubitemProps) => JSX.Element
} = ({
  pageLink,
  icon,
  text,
  triggerHandler,
  subItems = [],
  isNew,
}: SidebarMenuItemProps) => {
  const [isExpand, setIsExpand] = useState(false)

  const onExpand = (str?: any) => {
    setIsExpand(!isExpand)
  }
  const styles =
    "group py-1.5 my-0.5 rounded-rounded flex font-bold justify-between text-large text-grey-50 hover:bg-grey-10 items-center px-2"
  const activeStyles = "bg-grey-10 is-active"
  const classNameFn = useCallback(({ isActive }: any) => {
    const str = isActive ? `${styles} ${activeStyles}` : styles
    return str
  }, [])

  const isExpandIcon =
    !pageLink.includes("home") &&
    !pageLink.includes("customers") &&
    !pageLink.includes("settings") &&
    !pageLink.includes("help")

  return (
    <Collapsible
      transitionTime={150}
      transitionCloseTime={150}
      {...triggerHandler()}
      trigger={
        <NavLink className={classNameFn} to={pageLink} onClick={onExpand}>
          <div className="flex items-center gap-3">
            <span className="">{icon}</span>
            <span className="group-[.is-active]:text-grey-90">{text}</span>
          </div>
          <div>
            <span className="group-[.is-active]:text-grey-90">
              {isExpandIcon ? (
                isExpand ? (
                  <ChevronDownIcon />
                ) : (
                  <ChevronUpIcon />
                )
              ) : (
                ""
              )}
            </span>
          </div>
          {isNew && (
            <Badge variant={"new-feature"} className="ml-auto">
              New
            </Badge>
          )}
        </NavLink>
      }
    >
      <div className="flex flex-col gap-3">
        {subItems?.length > 0 &&
          subItems.map(({ pageLink, text }) => (
            <SubItem key={text} pageLink={pageLink} text={text} />
          ))}
      </div>
    </Collapsible>
  )
}

const SubItem = ({ pageLink, text }: SidebarMenuSubitemProps) => {
  const styles = "py-0.5 px-1 my-0.5 rounded-base flex  "
  const activeStyles = "bg-grey-10 font-semibold"
  const classNameFn = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    ({ isActive }: any) => (isActive ? `${styles} ${activeStyles}` : styles),
    []
  )

  return (
    <NavLink className={classNameFn} to={pageLink}>
      <span className="text-grey-90 text-large ml-10">{text}</span>
    </NavLink>
  )
}

SidebarMenuItem.SubItem = SubItem

export default SidebarMenuItem
