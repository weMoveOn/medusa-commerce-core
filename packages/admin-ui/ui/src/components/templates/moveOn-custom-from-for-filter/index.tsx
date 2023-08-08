import React, { useState } from 'react';
import qs from 'query-string';


const CustomFormElement = (props:any) => {
  const { type, label, name, handleChange, fieldValue, options, separator } = props;

  const params = qs.parse(window.location.search.substring(1));

  const [showMore, setShowMore] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
// @ts-ignore
  const handleShowMore = (itemValue) => {
    if (selectedValue) {
      setSelectedValue((state) => {
        state = itemValue;
        return state;
      });
      if (selectedValue === itemValue) {
        setShowMore(!showMore);
      } else if (selectedValue !== itemValue) {
        setShowMore(true);
      }
    } else {
      setSelectedValue((state) => {
        state = itemValue;
        return state;
      });
      setShowMore(true);
    }
  };

  let fieldInput = (
    <input
      type="text"
      defaultValue={fieldValue}
      onChange={(e) => handleChange({ [name]: e.target.value })}
      className="border rounded p-2"
    />
  );

  if (type === 'checkbox') {
    // @ts-ignore
    const getLastCharacterOfParams = params?.features?.slice(-1);
    const splitDefaultValue = params?.features?.split(getLastCharacterOfParams);
    // @ts-check
    let makeOption = options?.map((item:any) => ({
      label: item.image ? (
        <div className="filter_image">
          <div className="filter_image__thumb">
            <img src={item.image} alt={item.label} className="filter_image__thumb__image" />
          </div>
        </div>
      ) : (
        item.label
      ),
      value: item.value,
    }));

    fieldInput = (
      <>
        <select
          multiple
          defaultValue={splitDefaultValue}
          onChange={(e) => handleChange({ [name]: [...e.target.options].filter((o) => o.selected).map((o) => o.value).join(separator) })}
          className="border rounded p-2"
        >
          {makeOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <hr className="my-2" />
      </>
    );
  } else if (type === 'attribute') {
    fieldInput = null;
  } else if (type === 'tree') {
    const numberOfItems = showMore ? options?.length : 4;

    let makeOption = options?.slice(0, numberOfItems)?.map((item) => ({
      label: item.image ? (
        <div className="filter_image">
          <div className="filter_image__thumb">
            <img src={item.image} alt={item.label} className="filter_image__thumb__image" />
          </div>
        </div>
      ) : (
        item.label
      ),
      value: item.value,
    }));

    fieldInput = (
      <>
        <select
          defaultValue={params?.cid}
          onChange={(e) => handleChange({ [name]: e.target.value })}
          className="border rounded p-2"
        >
          {makeOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {options?.length > 4 && (
          <div className="view_more_customer_order">
            <div onClick={() => setShowMore(!showMore)}>
              {showMore ? (
                <>
                  <hr className="my-2" />
                  <div className="customize_order">
                    <img src="/assets/icons/filter_down.svg" width={18} height={18} alt="Down Arrow" className="mr-2" />
                    <span className="customize_order__title">View Less</span>
                  </div>
                </>
              ) : (
                <>
                  <hr className="my-2" />
                  <div className="customize_order">
                    <img src="/assets/icons/filter_up.svg" width={18} height={18} alt="Up Arrow" className="mr-2" />
                    <span className="customize_order__title">View More</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <hr className="my-2" />
      </>
    );
  } else if (type === 'range') {
    const splitDefaultValue = params?.pr?.split('-');

    fieldInput = (
      <div className="price_range">
        <input
          type="number"
          placeholder="Min Price"
          defaultValue={params?.pr ? splitDefaultValue[0] : ''}
          onChange={(e) => handleChange({ [name]: { val: e.target.value, tag: 'min' } })}
          className="border rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          defaultValue={params?.pr ? splitDefaultValue[1] : ''}
          onChange={(e) => handleChange({ [name]: { val: e.target.value, tag: 'max' } })}
          className="border rounded p-2"
        />
        <hr className="my-2" />
      </div>
    );
  }

  return (
    <div className="form_element">
      <div className="mb-2">
        {type !== 'attribute' && <label className="mr-2">{label}</label>}
        {fieldInput}
      </div>
      {type === 'attribute' && (
        <>
          {options?.map((item, index) => {
            const numberOfItems = selectedValue === item?.value && showMore ? item?.length ?? item?.values?.length : 4;

            const splitDefaultValue = params?.attr?.split(';');

            let makeOption = item?.values?.slice(0, numberOfItems)?.map((item) => ({
              label: item.image ? (
                <div className="filter_image">
                  <div className="filter_image__thumb">
                    <img src={item.image} alt={item.label} className="filter_image__thumb__image" />
                  </div>
                </div>
              ) : (
                item.label
              ),
              value: item.value,
            }));

            return (
              <div key={`itemIndex${index}`}>
                <div className="mb-2">
                  <label className="mr-2">{item?.label}</label>
                  <select
                    multiple
                    defaultValue={splitDefaultValue}
                    onChange={(e) => handleChange({ [name]: [...e.target.options].filter((o) => o.selected).map((o) => o.value).join(separator) })}
                    className="border rounded p-2"
                  >
                    {makeOption.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {item?.values?.length > 4 && (
                  <div className="view_more_customer_order">
                    <div onClick={() => handleShowMore(item?.value)}>
                      {showMore && selectedValue === item?.value ? (
                        <>
                          <hr className="my-2" />
                          <div className="customize_order">
                            <img src="/assets/icons/filter_down.svg" width={18} height={18} alt="Down Arrow" className="mr-2" />
                            <span className="customize_order__title">View Less</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <hr className="my-2" />
                          <div className="customize_order">
                            <img src="/assets/icons/filter_up.svg" width={18} height={18} alt="Up Arrow" className="mr-2" />
                            <span className="customize_order__title">View More</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
                <hr className="my-2" />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CustomFormElement;
