import { useEffect, useState } from "react"
import FilterDropdownContainer from "../../../components/molecules/filter-dropdown/container"
import Button from "../../fundamentals/button"
import FilterIcon from "../../fundamentals/icons/filter-icon"
import { IConfigurator, IInventoryQuery } from "../../../types/inventoryProduct"
import FilterDropdownItem from "../../molecules/filter-dropdown/item"
import InputField from "../../molecules/input"
import { useLocation } from "react-router-dom"
import queryString from "query-string"

interface IInventoryFilterProps {
  filtersData: IConfigurator | null
  submitFilters: () => void
  clearFilters: () => void
  handleFilterChange: (filter: IInventoryQuery) => void, 
}
const InventoryProductFilters = ({
  filtersData,
  submitFilters,
  clearFilters,
  handleFilterChange,
}: IInventoryFilterProps) => {
  const DisplayItem = 10
  const params = queryString.parse((window.location.search).substring(1)) as any;
  const range = params.pr;
  let minPrice = "";
  let maxPrice = "";
  if(range){
    [minPrice, maxPrice] = range.split('-');
  }

  const [tempState, setTempState] = useState(filtersData)
  const [cidPaginate, setCidPaginate]=useState({startIndex:0, endIndex:DisplayItem})
  const [attrValue, setAttrValue] = useState<string[]>([])
  const [minValue, setMinValue] = useState<string>(minPrice)
  const [maxValue, setMaxValue] = useState<string>(maxPrice)

  useEffect(() => {
    if (filtersData && filtersData.features) {
      filtersData.features = { ...filtersData.features, open: filtersData.features.values.some(x=>x.selected)  }
    }

    if (filtersData && filtersData.cid) {
      filtersData.cid = { ...filtersData.cid, open: filtersData.cid.values.some(x=>x.selected) }
    }

    if (filtersData && filtersData.attr) {
      filtersData.attr = {
        ...filtersData.attr,
        open: filtersData.attr.values.some(x=>x.selected),
        values: filtersData.attr.values.map((x) => {
          return { ...x, open: x.selected }
        }),
      }
    }

    setTempState(filtersData)
  }, [filtersData])

  const onShowCidNext = () =>{ 
    if(tempState?.cid ){ 
      setCidPaginate({startIndex:0, endIndex:tempState.cid.values.length-1})
    }
  }
  const onShowCidPrev = ()=> { 
    if(tempState?.cid ){ 
      setCidPaginate({startIndex:0, endIndex:10})
    }
  }

  useEffect(()=>{ 
    if(attrValue.length>0){ 
      handleFilterChange({attr: attrValue.join(";")})
    }
  }, [attrValue])

  return (
    <div className="flex space-x-1">
      <FilterDropdownContainer
        submitFilters={submitFilters}
        clearFilters={clearFilters}
        triggerElement={
          <Button
            icon={<FilterIcon size={20} style={{ marginTop: "4px" }} />}
            className="mr-2 flex  flex-row items-center justify-center px-6"
            variant="secondary"
            size="small"
            spanClassName="text-center text-sm font-small text-slate-700"
          >
            Filter
          </Button>
        }
      >

    <div className="mb-2 mt-2 p-2 flex justify-between gap-6">
     <InputField
      label="Min Price"
      type="number"
      name="minPrice"
      value={minValue}
      className="w-[338px]"
      placeholder="Min Price"
      onChange={(e) =>{
       const val = e.target.value;
       setMinValue(val);
       handleFilterChange({pr: {val, tag:"min"}})
       }}
      /> 
      <InputField
       label="Max Price"
       type="number"
       name="maxPrice"
       value={maxValue}
       className="w-[338px]"
       placeholder="Min Price"
       onChange={(e) =>{
        const val = e.target.value;
        setMaxValue(val);
        handleFilterChange({pr: {val, tag:"max"}})
        }}
       />  
     </div> 

        {tempState?.cid && (
          <FilterDropdownItem
            hasMore={tempState?.cid.values.length > cidPaginate.endIndex + 1}
            hasPrev={cidPaginate.endIndex === tempState.cid.values.length - 1}
            onShowNext={onShowCidNext}
            onShowPrev={onShowCidPrev}
            filterTitle={tempState?.cid.title}
            options={tempState?.cid.values.slice(cidPaginate.startIndex, cidPaginate.endIndex).map((f) => ({
              value: f.value,
              label: f.label,
            })) || []}
            filters={tempState?.cid.values
              .filter((x) => x.selected)
              .map((x) => x.value)}
            open={tempState.cid.open}
            setFilter={(val: { open: boolean; filter: string[]} ) => {
              handleFilterChange({ cid: val.filter[val.filter.length - 1] })
              if (filtersData && filtersData.cid) {
                //  @ts-ignore
                setTempState((prevState) => ({
                  ...prevState,
                  cid: { ...prevState?.cid, open: val.open },
                }))
              }
            }}
            isLoading={undefined} />
         )}
 
        {tempState?.features &&
          <FilterDropdownItem
          filterTitle={tempState?.features.title}
          options={tempState?.features.values?.map((f) => ({
            value: f.value,
            label: f.label,
          })) || []}
          filters={tempState?.features.values
            ?.filter((x) => x.selected)
            .map((x) => x.value)}
          open={tempState?.features.open}
          setFilter={(val: { open: boolean; filter: string[]} ) => {
            if (filtersData && filtersData.features) {
              handleFilterChange({ features: val.filter.join(',') })
              //  @ts-ignore
              setTempState((prevState) => ({
                ...prevState,
                features: { ...prevState?.features, open: val.open },
              }))
            }
          }}
          isLoading={undefined} hasMore={undefined} hasPrev={undefined} onShowNext={undefined} onShowPrev={undefined} />
        }


        {tempState?.attr && tempState?.attr.values.map((x, index) => {
          return (
            <FilterDropdownItem
              key={index}
              filterTitle={x.label}
              options={x.values?.map((f) => ({
                value: f.value,
                label: f.label,
              })) || []}
              filters={x.values?.filter((x) => x.selected).map((x) => x.value)}
              open={x.open}
              setFilter={(val: { open: boolean; filter: string[]} ) => {
                if (filtersData && filtersData.attr) {
                  setAttrValue((pre) => {
                    return [...pre, ...val.filter]
                  })
                  setTempState((prevState) => {
                    const attr = prevState?.attr
                    if (!attr) {
                      return prevState // Return the unchanged state if 'attr' is undefined
                    }
                    const values = attr.values || []
                    const updatedValues = [...values] // Create a copy of the values array
                    if (index >= 0 && index < updatedValues.length) {
                      updatedValues[index] = {
                        ...updatedValues[index],
                        open: val.open, // Update the 'open' field of the object at the specified index
                      }
                    }
                    return {
                      ...prevState,
                      attr: {
                        ...attr,
                        values: updatedValues, // Update the 'values' array with the modified version
                      },
                    }
                  })
                }
              } } isLoading={undefined} hasMore={undefined} hasPrev={undefined} onShowNext={undefined} onShowPrev={undefined}            />
          )
        })}
      </FilterDropdownContainer>
    </div>
  )
}

export default InventoryProductFilters
