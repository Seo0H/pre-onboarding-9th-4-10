import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

function useParamsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    return {
      search_name: searchParams.get('search_name') ?? '',
      page: searchParams.get('page') ?? '1',
      filter_order: searchParams.get('filter_order') ?? 'ALL',
    };
  });

  useEffect(() => {
    if (
      searchParams.get('search_name') !== state.search_name ||
      searchParams.get('page') !== state.page ||
      searchParams.get('filter_order') !== state.filter_order
    ) {
      setSearchParams({
        search_name: state.search_name,
        page: state.page,
        filter_order: state.filter_order,
      });
    }
  }, [state]);

  const updateState = (key: string, value: string | number) => {
    if (typeof value === 'number') value = String(value);
    setState(prevState => {
      const newState = { ...prevState, [key]: value };
      return newState;
    });
  };

  return { state, updateState };
}

export default useParamsFilter;

export const PARAMS = {
  SEARCH_NAME: 'search_name',
  PAGE: 'page',
  FILTER_ORDER: 'filter_order',
} as const;
