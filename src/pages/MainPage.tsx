import { createContext, useEffect, useState } from 'react';
import useColums from 'hooks/useColums';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import MainTable from 'components/table/MainTable';
import { getOrderListDataApi } from 'utils/api';
import { useQuery } from '@tanstack/react-query';
import InfoContainor from 'components/tools/InfoContainor';
import useTableOptions from 'hooks/useTableOptions';
import { PagenationBar } from 'components';
import { FILTER_DATE } from 'types/constans';

export const GlobalFilterContext = createContext(false);
export const initialFilter = { id: 'date', value: FILTER_DATE.TODAY } as const;

const MainPage = () => {
  const { data } = useQuery({
    queryKey: ['orderList'],
    queryFn: getOrderListDataApi,
    suspense: true,
  });
  const [isFilterReset, setIsFilterRest] = useState(false);

  const columns = useColums();
  const table = useTableOptions({ data, columns });

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters([initialFilter]);
  }, []);

  const onResetFilterHandler = () => {
    table.setColumnFilters([initialFilter]);
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };

  return (
    <LayoutWrapper>
      <InfoContainor />
      <PagenationBar table={table} onResetFilterHandler={onResetFilterHandler} />
      <GlobalFilterContext.Provider value={isFilterReset}>
        <MainTable {...{ table }} />
      </GlobalFilterContext.Provider>
    </LayoutWrapper>
  );
};

export default MainPage;
