import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type Filters = {
  [key: string]: string | undefined;
};

type UseFiltersReturnType = {
  filters: Filters | null;
  isFirstCall: boolean;
  handleFilterChange: (fields: Filters) => void;
  handleFilterClear: () => void;
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
  initializeFilter: () => void;
  initializeAvailableFilter: (data: Filters) => void;
  initializeAvailableFilterWithoutParams: (data: Filters) => void;
  setIsLatestCollection: (value: boolean) => void;
  isLatestCollection: boolean;
  handelAllFilterClear: () => void;
  updateQueryParams: (items: Filters) => void;
  updateQueryWithoutParams: (items: Filters) => string;
  setFilters: (filters: Filters) => void;
};

const useFilters = (): UseFiltersReturnType => {
  const [filters, setFilters] = useState<Filters | null>(null);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLatestCollection, setIsLatestCollection] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const initializeFilter = (): void => {
    const params = queryString.parse((window.location.search).substring(1)) as Filters;
    setFilters(params);
    setIsFirstCall(true);
  };

  useEffect(() => {
    if (!isFirstCall) {
      initializeFilter();
    }
  }, [isFirstCall]);

  const initializeAvailableFilterWithoutParams = (data: Filters): void => {
    setFilters(data);
    setIsFetched(true);
  };

  const initializeAvailableFilter = (data: Filters): void => {
    const params = queryString.parse((window.location.search).substring(1)) as Filters;
    const initialFilter: Filters = { ...params };

    const keywordSearch = params['keyword'];

    if (keywordSearch) {
      initialFilter.keyword = keywordSearch;
    }

    const shopId = params['shop_id'];

    if (shopId) {
      initialFilter.shop_id = shopId;
    }

    const itemId = params['item_id'];

    if (itemId) {
      initialFilter.item_id = itemId;
    }

    Object.keys(data).forEach((key) => {
      initialFilter[key] = params[key] ? params[key] : undefined;
    });
    setFilters(initialFilter);
    setIsFetched(true);
  };

  const updateQueryParams = (items: Filters): void => {
    const params = queryString.stringify({ ...filters, ...items }, { encode: false, encodeValuesOnly: true });
    navigate(`?${params}`);
  };

  const updateQueryWithoutParams = (items: Filters): string => {
    return queryString.stringify({ ...filters, ...items }, { encode: false, encodeValuesOnly: true });
  };

  const handleFilterChange = (fields: Filters): void => {
    let newFields = fields;

    if (newFields?.pr) {
      if (filters?.pr) {
        const prevPr = filters['pr'];
        const [min, max] = prevPr.split('-');
        if (newFields['pr']?.tag === 'min') {
          newFields = { ...newFields, pr: newFields['pr'].val + '-' + max };
        }
        if (newFields['pr']?.tag === 'max') {
          newFields = { ...newFields, pr: min + '-' + newFields['pr'].val };
        }
      } else {
        if (newFields['pr'].tag === 'min') {
          newFields = { ...newFields, pr: newFields['pr'].val + '-' };
        }
        if (newFields['pr']?.tag === 'max') {
          newFields = { ...newFields, pr: '-' + newFields['pr'].val };
        }
      }
    }

    setFilters({
      ...filters,
      ...newFields,
    });
    updateQueryWithoutParams(newFields);
  };

  const handleFilterClear = (): void => {
    const params = queryString.parse((window.location.search).substring(1)) as Filters;
    const initialFilter: Filters = {};

    const keywordSearch = params['keyword'];

    if (keywordSearch) {
      initialFilter.keyword = keywordSearch;
    }

    const shopId = params['shop_id'];

    if (shopId) {
      initialFilter.shop_id = shopId;
    }

    const paramsValue = queryString.stringify({ ...initialFilter }, { encode: false, encodeValuesOnly: true });

    navigate('/products', { search: `?${paramsValue}` });
  };

  const handelAllFilterClear = (): void => {
    navigate({ search: '' });
    const newFilter: Filters = {};
    Object.keys(filters).forEach((el) => {
      newFilter[el] = undefined;
    });
    setFilters(newFilter);
  };

  return {
    filters,
    isFirstCall,
    handleFilterChange,
    handleFilterClear,
    isFetched,
    setIsFetched,
    initializeFilter,
    initializeAvailableFilter,
    initializeAvailableFilterWithoutParams,
    setIsLatestCollection,
    isLatestCollection,
    handelAllFilterClear,
    updateQueryParams,
    updateQueryWithoutParams,
    setFilters,
  };
};

export default useFilters;
