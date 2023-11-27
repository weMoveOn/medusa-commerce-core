import clsx from "clsx"
import React, { forwardRef, useCallback, useEffect, useRef } from "react"
import { ButtonProps } from "../Button"
import ModalHeader from "./Header"
import ModalFooter from "./Footer"
import useKeyboardShortcut from "../../hooks/use-keyboard-shortcut"
import { useModal } from "../../providers/Modal"

export type ModalProps = {
  className?: string
  title?: string
  actions?: ButtonProps[]
  modalContainerClassName?: string
  contentClassName?: string
  onClose?: React.ReactEventHandler<HTMLDialogElement>
  open?: boolean
  footerContent?: React.ReactNode
} & Omit<React.ComponentProps<"dialog">, "ref">

const Modal = forwardRef<HTMLDialogElement, ModalProps>(function Modal(
  {
    className,
    title,
    actions,
    children,
    contentClassName,
    modalContainerClassName,
    onClose,
    open = true,
    footerContent,
    ...props
  },
  passedRef
) {
  const { closeModal } = useModal()
  const ref = useRef<HTMLDialogElement | null>(null)

  const setRefs = useCallback(
    (node: HTMLDialogElement) => {
      // Ref's from useRef needs to have the node assigned to `current`
      ref.current = node
      if (typeof passedRef === "function") {
        passedRef(node)
      } else if (passedRef && "current" in passedRef) {
        passedRef.current = node
      }
    },
    [passedRef]
  )

  useKeyboardShortcut({
    metakey: false,
    checkEditing: false,
    shortcutKeys: ["escape"],
    action: () => {
      if (open) {
        ref.current?.close()
      }
    },
  })

  const handleClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    // close modal when the user clicks outside the content
    if (e.target === ref.current) {
      closeModal()
      onClose?.(e)
    }
  }

  const handleClose = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    onClose?.(e)
    closeModal()
  }

  useEffect(() => {
    if (open) {
      document.body.setAttribute("data-modal", "opened")
    } else {
      document.body.removeAttribute("data-modal")
    }
  }, [open])

  return (
    <dialog
      {...props}
      className={clsx(
        "fixed top-0 left-0 flex h-screen w-screen items-center justify-center",
        "bg-medusa-bg-overlay dark:bg-medusa-bg-overlay-dark z-[500]",
        "hidden open:flex border-0 p-0",
        className
      )}
      onClick={handleClick}
      ref={setRefs}
      onClose={handleClose}
      open={open}
    >
      <div
        className={clsx(
          "bg-medusa-bg-base dark:bg-medusa-bg-base-dark rounded-sm",
          "border-medusa-border-base dark:border-medusa-border-base-dark border border-solid",
          "shadow-modal dark:shadow-modal-dark",
          "w-[90%] md:h-auto md:w-[75%] lg:w-[560px]",
          modalContainerClassName
        )}
      >
        {title && <ModalHeader title={title} />}
        <div className={clsx("overflow-auto py-1.5 px-2", contentClassName)}>
          {children}
        </div>
        {actions && actions?.length > 0 && <ModalFooter actions={actions} />}
        {footerContent && <ModalFooter>{footerContent}</ModalFooter>}
      </div>
    </dialog>
  )
})

export default Modal
