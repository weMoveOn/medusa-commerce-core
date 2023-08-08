import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IConfigurator } from '../types/inventoryProduct';


type UseFiltersReturnType = {
  filters: IConfigurator | null;
  isFirstCall: boolean;
  handleFilterChange: (fields: IConfigurator) => void;
  handleFilterClear: () => void;
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
  initializeFilter: () => void;
  initializeAvailableFilter: (data: IConfigurator) => void;
  initializeAvailableFilterWithoutParams: (data: IConfigurator) => void;
  setIsLatestCollection: (value: boolean) => void;
  isLatestCollection: boolean;
  handelAllFilterClear: () => void;
  updateQueryParams: (items: IConfigurator) => void;
  updateQueryWithoutParams: (items: IConfigurator) => string;
  setFilters: (filters: IConfigurator) => void;
};

const useInventoryProductFilters = (): UseFiltersReturnType => {
  const [filters, setFilters] = useState<IConfigurator | null>(null);
  const [isFirstCall, setIsFirstCall] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isLatestCollection, setIsLatestCollection] = useState(false);
  const navigate: NavigateFunction = useNavigate();

  const initializeFilter = (): void => {
    const params = queryString.parse((window.location.search).substring(1)) as any;
    setFilters(params);
    setIsFirstCall(true);
  };

  useEffect(() => {
    if (!isFirstCall) {
      initializeFilter();
    }
  }, [isFirstCall]);

  const initializeAvailableFilterWithoutParams = (data: IConfigurator): void => {
    setFilters(data);
    setIsFetched(true);
  };

  const initializeAvailableFilter = (data: IConfigurator): void => {
    const params = queryString.parse((window.location.search).substring(1)) as any;
    const initialFilter: any = { ...params };

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

  const updateQueryParams = (items: IConfigurator): void => {
    const params = queryString.stringify({ ...filters, ...items }, { encode: false, encodeValuesOnly: true });
    navigate(`?${params}`);
  };

  const updateQueryWithoutParams = (items: IConfigurator): string => {
    return queryString.stringify({ ...filters, ...items }, { encode: false, encodeValuesOnly: true });
  };

  const handleFilterChange = (fields: IConfigurator): void => {
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
    const params = queryString.parse((window.location.search).substring(1)) as any;
    const initialFilter: any = {} ;

    const keywordSearch = params['keyword'];

    if (keywordSearch) {
      initialFilter.keyword = keywordSearch;
    }

    const shopId = params['shop_id'];

    if (shopId) {
      initialFilter.shop_id = shopId;
    }

    const paramsValue = queryString.stringify({ ...initialFilter}, { encode: false, encodeValuesOnly: true });

    navigate('/a/moveon-inventory', { search: `?${paramsValue}` });
  };

  const handelAllFilterClear = (): void => {
    const newFilter: IConfigurator = {} as IConfigurator;
    Object.keys(filters).forEach((el) => {
      newFilter[el] = undefined;
    });
    setFilters(newFilter);
    navigate({ search: '' });
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

export default useInventoryProductFilters;
