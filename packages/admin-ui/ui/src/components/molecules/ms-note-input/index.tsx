import React, { useCallback, useRef, useState } from "react"
import MsTextArea from "../ms-textarea";

type NoteInputProps = {
  onSubmit: (note: string | undefined) => void
}

const MsNoteInput: React.FC<NoteInputProps> = ({ onSubmit }) => {
  const [note, setNote] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleAddEmoji = (emoji: string) => {
    setNote(`${note ? note : ""}${emoji}`)
  }

  const handleSubmit = () => {
    if (onSubmit && note) {
      onSubmit(note)
      setNote("")
    }
  }

  const onKeyDownHandler = useCallback(
    (event) => {
      switch (event.key) {
        case "Enter":
          // event.preventDefault()
          // event.stopPropagation()
          // handleSubmit()
          // inputRef.current?.blur()
          break
        case "Esc":
        case "Escape":
          inputRef.current?.blur()
          break
        default:
          break
      }
    },
    [note, setNote, onSubmit]
  )

  return (
    <form>
      <MsTextArea
          label={""}
          rows={3}
          // type="textarea"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="inter-base-regular placeholder:text-grey-40 flex-grow bg-transparent focus:outline-none"
          // ref={inputRef}
          id="note-input"
          autoComplete="off"
          onKeyDown={onKeyDownHandler}
      />
    </form>
  )
}

export default MsNoteInput
