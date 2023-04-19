import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    return {
      search_name: searchParams.get('search_name') ?? '',
      page: searchParams.get('page') ?? '1',
      filterOrder: searchParams.get('filter_order') ?? '',
    };
  });

  useEffect(() => {
    if (
      searchParams.get('search_name') !== state.search_name ||
      searchParams.get('page') !== state.page
    ) {
      setSearchParams({
        search_name: state.search_name,
        page: state.page,
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

export default useFilter;
