import React, { ReactNode, useReducer } from "react"
import { ILayeredModalContext } from "../../../components/molecules/modal/layered-modal"
import { ModalProps } from "../../../components/molecules/modal"

export enum SteppedActions {
  ENABLENEXTPAGE,
  DISABLENEXTPAGE,
  GOTONEXTPAGE,
  GOTOPREVIOUSPAGE,
  SETPAGE,
  SUBMIT,
  RESET,
}

export type ISteppedContext = {
  currentStep: number
  nextStepEnabled: boolean
  enableNextPage: () => void
  disableNextPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  submit: () => void
  reset: () => void
  setPage: (page: number) => void
}

export const defaultContext: ISteppedContext = {
  currentStep: 0,
  nextStepEnabled: true,
  enableNextPage: () => {},
  disableNextPage: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  submit: () => {},
  reset: () => {},
  setPage: (page) => {},
}

export type SteppedProps = {
  context: ISteppedContext
  title?: string
  onSubmit: () => void
  lastScreenIsSummary?: boolean
  steps: ReactNode[]
  layeredContext?: ILayeredModalContext
} & ModalProps

export const SteppedContext = React.createContext(defaultContext)

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SteppedActions.ENABLENEXTPAGE: {
      return { ...state, nextStepEnabled: true }
    }
    case SteppedActions.DISABLENEXTPAGE: {
      return { ...state, nextStepEnabled: false }
    }
    case SteppedActions.GOTONEXTPAGE: {
      return { ...state, currentStep: state.currentStep + 1 }
    }
    case SteppedActions.GOTOPREVIOUSPAGE: {
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) }
    }
    case SteppedActions.SETPAGE: {
      return {
        ...state,
        currentStep: action.payload > 0 ? action.payload : state.currentStep,
      }
    }
    case SteppedActions.SUBMIT: {
      return { ...state }
    }
    case SteppedActions.RESET: {
      return { ...state, currentStep: 0, nextStepEnabled: true }
    }
  }
}

export const SteppedProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultContext)
  return (
    <SteppedContext.Provider
      value={{
        ...state,
        enableNextPage: () => {
          dispatch({ type: SteppedActions.ENABLENEXTPAGE })
        },
        disableNextPage: () => {
          dispatch({ type: SteppedActions.DISABLENEXTPAGE })
        },
        goToNextPage: () => {
          dispatch({ type: SteppedActions.GOTONEXTPAGE })
        },
        goToPreviousPage: () => {
          dispatch({ type: SteppedActions.GOTOPREVIOUSPAGE })
        },
        submit: () => {
          dispatch({ type: SteppedActions.SUBMIT })
        },
        setPage: (page: number) => {
          dispatch({ type: SteppedActions.SETPAGE, payload: page })
        },
        reset: () => {
          dispatch({ type: SteppedActions.RESET })
        },
      }}
    >
      {children}
    </SteppedContext.Provider>
  )
}
