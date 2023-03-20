import { useMemo } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataResponse } from 'types';

function useColums() {
  const columnHelper = createColumnHelper<DataResponse>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: '주문 번호',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('customer_id', {
        header: '고객 번호',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('customer_name', {
        header: '고객 이름',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('currency', {
        header: '가격',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: '주문 처리 상태',
        cell: info => info.getValue().toString(),
      }),
      columnHelper.accessor('transaction_time', {
        header: '거래 날짜',
        cell: info => info.getValue().split(' ')[0],
      }),
      columnHelper.accessor('transaction_time', {
        header: '거래 시간',
        cell: info => info.getValue().split(' ')[1],
      }),
    ],
    [],
  );

  return columns;
}

export default useColums;
