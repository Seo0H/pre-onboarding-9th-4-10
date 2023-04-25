import { useEffect, useState } from 'react';

import { ColumnFiltersState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

import { initialFilter } from 'constant';

function useParamsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    return {
      customer_name: searchParams.get('customer_name') ?? '',
      page: searchParams.get('page') ?? '1',
      status: searchParams.get('status') ?? 'ALL',
    };
  });
  //[{id, val} , .. ]
  const [filterState, setFilterState] = useState<ColumnFiltersState>([
    { id: 'status', value: '' },
    { id: 'customer_name', value: '' },
    initialFilter,
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
  }, [state, filterState]);

  const updateState = (key: string, value: string | number) => {
    if (typeof value === 'number') value = String(value);
    setState(prevState => {
      const newState = { ...prevState, [key]: value };
      return newState;
    });

    setFilterState(prevFilter => {
      if (value === 'ALL') value = '';
      return prevFilter.map(filter => {
        if (filter.id === key) return { id: key, value: value };
        return { ...filter };
      });
    });
  };

  const reSeatStatae = () => {
    const resetState = { customer_name: '', page: '1', status: 'ALL' };
    setState(resetState);
    setFilterState(prevFilter => {
      return prevFilter.map(({ id }) => ({ id, value: '' }));
    });
  };

  return { state, filterState, updateState, reSeatStatae };
}

export default useParamsFilter;

export const PARAMS = {
  CUSTOMER_NAME: 'customer_name',
  PAGE: 'page',
  STATUS: 'status',
} as const;
