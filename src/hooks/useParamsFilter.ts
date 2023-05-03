import { useEffect, useState } from 'react';

import { ColumnFiltersState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

import { FILTER_DATE, initialFilter } from 'constant';
import { CUSTOMER_NAME, FILTER_MENU_TYPE, PAGE, STATUS } from 'constant/paramsKey';

function useParamsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    return {
      customer_name: searchParams.get('customer_name') ?? '',
      page: searchParams.get('page') ?? '1',
      status: searchParams.get('status') ?? 'ALL',
    };
  });

  const [filterState, setFilterState] = useState<ColumnFiltersState>([
    {
      id: STATUS,
      value:
        searchParams.get('status') === 'ALL' || !searchParams.get(STATUS)
          ? ''
          : searchParams.get('status'),
    },
    { id: CUSTOMER_NAME, value: searchParams.get('customer_name') || '' },
    { id: 'date', value: FILTER_DATE.TODAY },
  ]);

  useEffect(() => {
    if (
      searchParams.get('customer_name') !== state.customer_name ||
      searchParams.get('page') !== state.page ||
      searchParams.get('status') !== state.status
    ) {
      setSearchParams({
        ...state,
        customer_name: state.customer_name,
        page: state.page,
        status: state.status,
      });
    }
  }, [state]);
  type KeyType = typeof PAGE | typeof STATUS | typeof CUSTOMER_NAME;
  type StatusType = (typeof FILTER_MENU_TYPE)[keyof typeof FILTER_MENU_TYPE];

  const updateState = (key: KeyType, updateVal: string | number) => {
    if (typeof updateVal === 'number') updateVal = String(updateVal);

    setState(prevState => {
      const newState = { ...prevState, [key]: updateVal };
      return newState;
    });

    // TO-DO: 기존 FILTER는 유지하며, 변경된 필터만 추가...
    setFilterState(prevFilter => {
      if (updateVal === FILTER_MENU_TYPE.ALL) updateVal = '';
      return prevFilter.map(filter => {
        if (filter.id === key) return { id: filter.id, value: updateVal };
        return { ...filter };
      });
    });
  };

  function resetState() {
    // const resetState = { customer_name: '', page: '1', status: 'ALL' };
    setSearchParams({ customer_name: '', page: '1', status: 'ALL' });
    setFilterState(() => initialFilter);
  }

  return { state, filterState, updateState, resetState };
}

export default useParamsFilter;
