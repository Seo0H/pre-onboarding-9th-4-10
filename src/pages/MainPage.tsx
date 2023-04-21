import { createContext, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { PagenationBar } from 'components';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import MainTable from 'components/table/MainTable';
import InfoContainer from 'components/tools/InfoContainer';
import useColums from 'hooks/useColums';
import useOrderList from 'hooks/useOrderList';
import useTableOptions from 'hooks/useTableOptions';
import { FILTER_DATE } from 'types/constans';

export const GlobalFilterContext = createContext(false);
export const initialFilter = { id: 'date', value: FILTER_DATE.TODAY } as const;

const MainPage = () => {
  const data = useOrderList();
  const [isFilterReset, setIsFilterRest] = useState(false);
  const columns = useColums();
  const table = useTableOptions({ data, columns });

  const onResetFilterUIHandler = () => {
    table.setColumnFilters([initialFilter]);
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };

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
