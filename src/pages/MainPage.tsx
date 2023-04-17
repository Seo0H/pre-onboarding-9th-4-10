import { createContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import MainTable from 'components/table/MainTable';
import { getOrderListDataApi } from 'utils/api';
import InfoContainer from 'components/tools/InfoContainer';
import useColums from 'hooks/useColums';
import useTableOptions from 'hooks/useTableOptions';
import { PagenationBar } from 'components';
import { FILTER_DATE } from 'types/constans';
import { useSearchParams } from 'react-router-dom';

export const GlobalFilterContext = createContext(false);
export const initialFilter = { id: 'date', value: FILTER_DATE.TODAY } as const;

const MainPage = () => {
  const { data } = useQuery({
    queryKey: ['orderList'],
    queryFn: getOrderListDataApi,
    suspense: true,
  });
  const [query, setQuery] = useSearchParams();
  const [isFilterReset, setIsFilterRest] = useState(false);
  const columns = useColums();
  const table = useTableOptions({ data, columns });

  const onResetFilterUIHandler = () => {
    table.setColumnFilters([initialFilter]);
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };
  useEffect(() => {
    table.setColumnFilters([{ id: 'customer_name', value: query.get('search') }, initialFilter]);
  }, []);
  return (
    <LayoutWrapper>
      <InfoContainer />
      <PagenationBar table={table} onResetFilterUIHandler={onResetFilterUIHandler} />
      <GlobalFilterContext.Provider value={isFilterReset}>
        <MainTable {...{ table }} />
      </GlobalFilterContext.Provider>
    </LayoutWrapper>
  );
};

export default MainPage;
