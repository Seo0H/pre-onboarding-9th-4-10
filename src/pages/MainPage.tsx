import { createContext, useEffect, useState } from 'react';

import { PaginationBar } from 'components';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import MainTable from 'components/table/MainTable';
import InfoContainer from 'components/tools/InfoContainer';
import useColums from 'hooks/useColums';
import useOrderList from 'hooks/useOrderList';
import useParamsFilter from 'hooks/useParamsFilter';
import useTableOptions from 'hooks/useTableOptions';

export const GlobalFilterContext = createContext(false);

const MainPage = () => {
  const data = useOrderList();
  const [isFilterReset, setIsFilterRest] = useState(false);

  const columns = useColums();
  const table = useTableOptions({ data, columns });
  const { filterState, reSeatStatae } = useParamsFilter();

  const onResetFilterUIHandler = () => {
    table.setColumnFilters(filterState);
    reSeatStatae();
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };

  useEffect(() => {
    table.setColumnFilters(filterState);
  }, []);

  return (
    <LayoutWrapper>
      <InfoContainer />
      <PaginationBar table={table} onResetFilterUIHandler={onResetFilterUIHandler} />
      <GlobalFilterContext.Provider value={isFilterReset}>
        <MainTable {...{ table }} />
      </GlobalFilterContext.Provider>
    </LayoutWrapper>
  );
};

export default MainPage;
