import { omit } from "lodash"
import qs from "qs"
import { useMemo, useReducer, useState } from "react"
import { relativeDateFormatToTimestamp } from "../../../utils/time"

type MoveonProductDateFilter = null | {
  gt?: string
  lt?: string
}

type MoveonProductFilterAction =
  | { type: "setQuery"; payload: string | null }
  | { type: "setFilters"; payload: MoveonProductFilterState }
  | { type: "reset"; payload: MoveonProductFilterState }
  | { type: "setOffset"; payload: number }
  | { type: "setDefaults"; payload: MoveonProductDefaultFilters | null }
  | { type: "setDate"; payload: MoveonProductDateFilter }
  | { type: "setFeatures"; payload: null | string[] | string }
  | { type: "setFulfillment"; payload: null | string[] | string }
  | { type: "setPayment"; payload: null | string[] | string }

interface MoveonProductFilterState {
  query?: string | null
  region: {
    open: boolean
    filter: null | string[] | string
  }
  salesChannel: {
    open: boolean
    filter: null | string[] | string
  }
  features: {
    open: boolean
    filter: null | string[] | string
  }
  fulfillment: {
    open: boolean
    filter: null | string[] | string
  }
  payment: {
    open: boolean
    filter: null | string[] | string
  }
  date: {
    open: boolean
    filter: MoveonProductDateFilter
  }
  limit: number
  offset: number
  additionalFilters: MoveonProductDefaultFilters | null
}

const allowedFilters = [
  "features",
  "region",
  "fulfillment_status",
  "payment_status",
  "created_at",
  "q",
  "offset",
  "limit",
]

const DefaultTabs = {
  incomplete: {
    fulfillment_status: ["not_fulfilled", "fulfilled"],
    payment_status: ["awaiting"],
  },
  complete: {
    fulfillment_status: ["shipped"],
    payment_status: ["captured"],
  },
}

const formatDateFilter = (filter: MoveonProductDateFilter) => {
  if (filter === null) {
    return filter
  }

  const dateFormatted = Object.entries(filter).reduce((acc, [key, value]) => {
    if (value.includes("|")) {
      acc[key] = relativeDateFormatToTimestamp(value)
    } else {
      acc[key] = value
    }
    return acc
  }, {})

  return dateFormatted
}

const reducer = (
  state: MoveonProductFilterState,
  action: MoveonProductFilterAction
): MoveonProductFilterState => {
  switch (action.type) {
    case "setFilters": {
      return {
        ...state,
        region: action.payload.region,
        salesChannel: action.payload.salesChannel,
        fulfillment: action.payload.fulfillment,
        payment: action.payload.payment,
        features: action.payload.features,
        date: action.payload.date,
        query: action?.payload?.query,
      }
    }
    case "setQuery": {
      return {
        ...state,
        offset: 0, // reset offset when query changes
        query: action.payload,
      }
    }
    case "setDate": {
      const newDateFilters = state.date
      return {
        ...state,
        date: newDateFilters,
      }
    }
    case "setOffset": {
      return {
        ...state,
        offset: action.payload,
      }
    }
    case "reset": {
      return action.payload
    }
    default: {
      return state
    }
  }
}

type MoveonProductDefaultFilters = {
  expand?: string
  fields?: string
}

const eqSet = (as: Set<string>, bs: Set<string>) => {
  if (as.size !== bs.size) {
    return false
  }
  for (const a of as) {
    if (!bs.has(a)) {
      return false
    }
  }
  return true
}

export const useMoveonProductFilters = (
  existing?: string,
  defaultFilters: MoveonProductDefaultFilters | null = null
) => {
  if (existing && existing[0] === "?") {
    existing = existing.substring(1)
  }

  const initial = useMemo(
    () => parseQueryString(existing, defaultFilters),
    [existing, defaultFilters]
  )

  const initialTabs = useMemo(() => {
    const storageString = localStorage.getItem("moveonProducts::filters")
    if (storageString) {
      const savedTabs = JSON.parse(storageString)

      if (savedTabs) {
        return Object.entries(savedTabs).map(([key, value]) => {
          return {
            label: key,
            value: key,
            removable: true,
            representationString: value,
          }
        })
      }
    }

    return []
  }, [])

  const [state, dispatch] = useReducer(reducer, initial)
  const [tabs, setTabs] = useState(initialTabs)

  const setDateFilter = (filter: MoveonProductDateFilter | null) => {
    dispatch({ type: "setDate", payload: filter })
  }

  const setFulfillmentFilter = (filter: string[] | string | null) => {
    dispatch({ type: "setFulfillment", payload: filter })
  }

  const setPaymentFilter = (filter: string[] | string | null) => {
    dispatch({ type: "setPayment", payload: filter })
  }

  const setFeaturesFilter = (filter: string[] | string | null) => {
    dispatch({ type: "setFeatures", payload: filter })
  }

  const setDefaultFilters = (filters: MoveonProductDefaultFilters | null) => {
    dispatch({ type: "setDefaults", payload: filters })
  }

  const paginate = (direction: 1 | -1) => {
    if (direction > 0) {
      const nextOffset = state.offset + state.limit

      dispatch({ type: "setOffset", payload: nextOffset })
    } else {
      const nextOffset = Math.max(state.offset - state.limit, 0)
      dispatch({ type: "setOffset", payload: nextOffset })
    }
  }

  const reset = () => {
    dispatch({
      type: "setFilters",
      payload: {
        ...state,
        offset: 0,
        region: {
          open: false,
          filter: null,
        },
        payment: {
          open: false,
          filter: null,
        },
        fulfillment: {
          open: false,
          filter: null,
        },
        features: {
          open: false,
          filter: null,
        },
        salesChannel: {
          open: false,
          filter: null,
        },
        date: {
          open: false,
          filter: null,
        },
        query: null,
      },
    })
  }

  const setFilters = (filters: MoveonProductFilterState) => {
    dispatch({ type: "setFilters", payload: filters })
  }

  const setQuery = (queryString: string | null) => {
    dispatch({ type: "setQuery", payload: queryString })
  }

  const getQueryObject = () => {
    const toQuery: any = { ...state.additionalFilters }
    for (const [key, value] of Object.entries(state)) {
      if (key === "query") {
        if (value && typeof value === "string") {
          toQuery["q"] = value
        }
      } else if (key === "offset" || key === "limit") {
        toQuery[key] = value
      } else if (value.open) {
        if (key === "date") {
          toQuery[stateFilterMap[key]] = formatDateFilter(
            value.filter as MoveonProductDateFilter
          )
        } else {
          toQuery[stateFilterMap[key]] = value.filter
        }
      }
    }

    return toQuery
  }

  const getQueryString = () => {
    const obj = getQueryObject()
    return qs.stringify(obj, { skipNulls: true })
  }

  const getRepresentationObject = (fromObject?: MoveonProductFilterState) => {
    const objToUse = fromObject ?? state

    const toQuery: any = {}
    for (const [key, value] of Object.entries(objToUse)) {
      if (key === "query") {
        if (value && typeof value === "string") {
          toQuery["q"] = value
        }
      } else if (key === "offset" || key === "limit") {
        toQuery[key] = value
      } else if (value.open) {
        toQuery[stateFilterMap[key]] = value.filter
      }
    }

    return toQuery
  }

  const getRepresentationString = () => {
    const obj = getRepresentationObject()
    return qs.stringify(obj, { skipNulls: true })
  }

  const queryObject = useMemo(() => getQueryObject(), [state])
  const representationObject = useMemo(() => getRepresentationObject(), [state])
  const representationString = useMemo(() => getRepresentationString(), [state])

  const activeFilterTab = useMemo(() => {
    const clean = omit(representationObject, ["limit", "offset"])
    const stringified = qs.stringify(clean)

    const existsInSaved = tabs.find(
      (el) => el.representationString === stringified
    )
    if (existsInSaved) {
      return existsInSaved.value
    }

    for (const [tab, conditions] of Object.entries(DefaultTabs)) {
      let match = true

      if (Object.keys(clean).length !== Object.keys(conditions).length) {
        continue
      }

      for (const [filter, value] of Object.entries(conditions)) {
        if (filter in clean) {
          if (Array.isArray(value)) {
            match =
              Array.isArray(clean[filter]) &&
              eqSet(new Set(clean[filter]), new Set(value))
          } else {
            match = clean[filter] === value
          }
        } else {
          match = false
        }

        if (!match) {
          break
        }
      }

      if (match) {
        return tab
      }
    }

    return null
  }, [representationObject, tabs])

  const availableTabs = useMemo(() => {
    return [
      {
        label: "Complete",
        value: "complete",
      },
      {
        label: "Incomplete",
        value: "incomplete",
      },
      ...tabs,
    ]
  }, [tabs])

  const setTab = (tabName: string) => {
    let tabToUse: object | null = null
    if (tabName in DefaultTabs) {
      tabToUse = DefaultTabs[tabName]
    } else {
      const tabFound = tabs.find((t) => t.value === tabName)
      if (tabFound) {
        tabToUse = qs.parse(tabFound.representationString)
      }
    }

    if (tabToUse) {
      const toSubmit = {
        ...state,
        date: {
          open: false,
          filter: null,
        },
        payment: {
          open: false,
          filter: null,
        },
        fulfillment: {
          open: false,
          filter: null,
        },
        features: {
          open: false,
          filter: null,
        },
      }

      for (const [filter, val] of Object.entries(tabToUse)) {
        toSubmit[filterStateMap[filter]] = {
          open: true,
          filter: val,
        }
      }
      dispatch({ type: "setFilters", payload: toSubmit })
    }
  }

  const saveTab = (tabName: string, filters: MoveonProductFilterState) => {
    const repObj = getRepresentationObject({ ...filters })
    const clean = omit(repObj, ["limit", "offset"])
    const repString = qs.stringify(clean, { skipNulls: true })


    const storedString = localStorage.getItem("moveonProducts::filters")

    let existing: null | object = null

    if (storedString) {
      existing = JSON.parse(storedString)
    }

    if (existing) {
      existing[tabName] = repString
      localStorage.setItem("moveonProducts::filters", JSON.stringify(existing))
    } else {
      const newFilters = {}
      newFilters[tabName] = repString
      localStorage.setItem("moveonProducts::filters", JSON.stringify(newFilters))
    }

    setTabs((prev) => {
      return [
        ...prev,
        {
          label: tabName,
          value: tabName,
          representationString: repString,
          removable: true,
        },
      ]
    })

    dispatch({ type: "setFilters", payload: filters })
  }

  const removeTab = (tabValue: string) => {
    const storedString = localStorage.getItem("moveonProducts::filters")

    let existing: null | object = null

    if (storedString) {
      existing = JSON.parse(storedString)
    }

    if (existing) {
      delete existing[tabValue]
      localStorage.setItem("moveonProducts::filters", JSON.stringify(existing))
    }

    setTabs((prev) => {
      const newTabs = prev.filter((p) => p.value !== tabValue)
      return newTabs
    })
  }

  return {
    ...state,
    filters: {
      ...state,
    },
    removeTab,
    saveTab,
    setTab,
    availableTabs,
    activeFilterTab,
    representationObject,
    representationString,
    queryObject,
    paginate,
    getQueryObject,
    getQueryString,
    setQuery,
    setFilters,
    setDefaultFilters,
    setDateFilter,
    setFulfillmentFilter,
    setPaymentFilter,
    setFeaturesFilter,
    reset,
  }
}

const filterStateMap = {
  features: "features",
  fulfillment_status: "fulfillment",
  payment_status: "payment",
  created_at: "date",
  region_id: "region",
  sales_channel_id: "salesChannel",
}

const stateFilterMap = {
  region: "region_id",
  salesChannel: "sales_channel_id",
  features: "features",
  fulfillment: "fulfillment_status",
  payment: "payment_status",
  date: "created_at",
}

const parseQueryString = (
  queryString?: string,
  additionals: MoveonProductDefaultFilters | null = null
): MoveonProductFilterState => {
  const defaultVal: MoveonProductFilterState = {
    features: {
      open: false,
      filter: null,
    },
    fulfillment: {
      open: false,
      filter: null,
    },
    region: {
      open: false,
      filter: null,
    },
    salesChannel: {
      open: false,
      filter: null,
    },
    payment: {
      open: false,
      filter: null,
    },
    date: {
      open: false,
      filter: null,
    },
    offset: 0,
    limit: 15,
    additionalFilters: additionals,
  }

  if (queryString) {
    const filters = qs.parse(queryString)
    for (const [key, value] of Object.entries(filters)) {
      if (allowedFilters.includes(key)) {
        switch (key) {
          case "offset": {
            if (typeof value === "string") {
              defaultVal.offset = parseInt(value)
            }
            break
          }
          case "limit": {
            if (typeof value === "string") {
              defaultVal.limit = parseInt(value)
            }
            break
          }
          case "q": {
            if (typeof value === "string") {
              defaultVal.query = value
            }
            break
          }
          case "features": {
            if (typeof value === "string" || Array.isArray(value)) {
              defaultVal.features = {
                open: true,
                filter: value,
              }
            }
            break
          }
          case "fulfillment_status": {
            if (typeof value === "string" || Array.isArray(value)) {
              defaultVal.fulfillment = {
                open: true,
                filter: value,
              }
            }
            break
          }
          case "region_id": {
            if (typeof value === "string" || Array.isArray(value)) {
              defaultVal.region = {
                open: true,
                filter: value,
              }
            }
            break
          }
          case "sales_channel_id": {
            if (typeof value === "string" || Array.isArray(value)) {
              defaultVal.salesChannel = {
                open: true,
                filter: value,
              }
            }
            break
          }
          case "payment_status": {
            if (typeof value === "string" || Array.isArray(value)) {
              defaultVal.payment = {
                open: true,
                filter: value,
              }
            }
            break
          }
          case "created_at": {
            defaultVal.date = {
              open: true,
              filter: value,
            }
            break
          }
          default: {
            break
          }
        }
      }
    }
  }

  return defaultVal
}
