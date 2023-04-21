import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getOrderListDataApi } from 'utils/api';

import type { DataResponse } from 'types';

function useOrderList() {
  const { data: datas = [] } = useQuery({
    queryKey: ['orderList'],
    queryFn: getOrderListDataApi,
    refetchInterval: 5000,
  });

  const statusToStringData: DataResponse[] = useMemo(() => {
    return datas.map(data => {
      return { ...data, status: data.status.toString() };
    });
  }, [datas]);

  return statusToStringData;
}

export default useOrderList;
