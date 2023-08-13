import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IConfigurator, IInventoryQuery } from '../types/inventoryProduct';
import { defaultMoveonInventoryFilter } from '../utils/filters';

type UseFiltersReturnType = {
  filters: IInventoryQuery;
  isFirstCall: boolean;
  handleFilterChange: (fields: IInventoryQuery) => void;
  handleFilterClear: () => void;
  isFetched: boolean;
  setIsFetched: (value: boolean) => void;
  initializeFilter: () => void;
  initializeAvailableFilter: (data: IConfigurator) => void;
  initializeAvailableFilterWithoutParams: (data: IInventoryQuery) => void;
  setIsLatestCollection: (value: boolean) => void;
  isLatestCollection: boolean;
  handelAllFilterClear: () => void;
  updateQueryParams: (items: IInventoryQuery) => void;
  updateQueryWithoutParams: (items: IInventoryQuery) => string;
  setFilters: (filters: IInventoryQuery) => void;
};

const useInventoryProductFilters = (): UseFiltersReturnType => {
  const [filters, setFilters] = useState<IInventoryQuery>(defaultMoveonInventoryFilter);
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

  const initializeAvailableFilterWithoutParams = (data: IInventoryQuery): void => {
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

    const offset = params['offset'];

    if (offset) {
      initialFilter.offset = offset;
    } else initialFilter.offset = 0;

    const limit = params['limit'];

    if (limit) {
      initialFilter.limit = limit;
    } else initialFilter.limit = defaultMoveonInventoryFilter.limit;



    Object.keys(data).forEach((key) => {
     if(params[key])initialFilter[key] = params[key];
    });
    setFilters(initialFilter);
    setIsFetched(true);
  };

  const updateQueryParams = (items: IInventoryQuery): void => {
    const params = queryString.stringify({ ...filters, ...items },  { encode: false, skipEmptyString: true, skipNull: true });
    navigate(`?${params}`);
  };

  const updateQueryWithoutParams = (items: IInventoryQuery): string => {
    return queryString.stringify({ ...filters, ...items },  { encode: false, skipEmptyString: true, skipNull: true });
  };

  const handleFilterChange = (fields: IInventoryQuery): void => {
    let newFields = fields;
  
    if (newFields?.pr ) {
      if (filters?.pr) {
        const prevPr = filters['pr'] as string;
        const [min, max] = prevPr.split('-');
        
        if (typeof newFields['pr'] === 'object' && newFields['pr']?.tag === 'min') {
          newFields = { ...newFields, pr: newFields['pr'].val + '-' + max };
        }
        
        if (typeof newFields['pr'] === 'object' && newFields['pr']?.tag === 'max') {
          newFields = { ...newFields, pr: min + '-' + newFields['pr'].val };
        }
      } else {
        if (typeof newFields['pr'] === 'object' && newFields['pr'].tag === 'min') {
          newFields = { ...newFields, pr: newFields['pr'].val + '-' };
        }
        
        if (typeof newFields['pr'] === 'object' && newFields['pr']?.tag === 'max') {
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
    
    initialFilter.limit = defaultMoveonInventoryFilter.limit;

    initialFilter.offset = 0;
  
    const paramsValue = queryString.stringify({ ...initialFilter},  { encode: false, skipEmptyString: true, skipNull: true });

    const queryParams = new URLSearchParams(paramsValue).toString();

    navigate(`/a/moveon-inventory?${queryParams}`);
  };

  const handelAllFilterClear = (): void => {
    const newFilter: IInventoryQuery = {};
    Object.keys(filters).forEach((el) => {
      newFilter[el as keyof IInventoryQuery] = undefined;
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
