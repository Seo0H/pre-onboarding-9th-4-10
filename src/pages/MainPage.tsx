import { Suspense, useMemo } from 'react';
import useOrderList from 'hooks/useOrderList';
import useColums from 'hooks/useColums';
import LayoutWrapper from 'components/layout/LayoutWrapper';
import CustomSkeleton from 'components/common/CustomSkeleton';
import MainTable from 'components/table/MainTable';
import { getOrderListDataApi } from 'utils/api';
import { useQuery } from '@tanstack/react-query';
import InfoContainor from 'components/tools/InfoContainor';

const MainPage = () => {
  const { data } = useQuery({
    queryKey: ['orderList'],
    queryFn: getOrderListDataApi,
    suspense: true,
  });
  const columns = useColums();

  return (
    <LayoutWrapper>
      <InfoContainor />
      <MainTable
        {...{
          data,
          columns,
        }}
      />
    </LayoutWrapper>
  );
};

export default MainPage;
