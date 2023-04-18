import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(() => {
    return {
      search: searchParams.get('search') ?? '',
      page: searchParams.get('page') ?? '1',
    };
  });

  useEffect(() => {
    if (searchParams.get('search') !== state.search || searchParams.get('page') !== state.page) {
      setSearchParams({
        search: state.search,
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
