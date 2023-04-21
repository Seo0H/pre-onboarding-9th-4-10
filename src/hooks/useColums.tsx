import { useMemo } from 'react';

import { Tag } from '@chakra-ui/react';
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
        cell: info => (
          <Tag size='md' colorScheme={info.getValue() === 'true' ? 'green' : 'red'}>
            {info.getValue() === 'true' ? '완료' : '진행중'}
          </Tag>
        ),
      }),
      columnHelper.accessor('transaction_time', {
        id: 'date',
        header: '거래 날짜',
        cell: info => info.getValue().split(' ')[0],
      }),
      columnHelper.accessor('transaction_time', {
        id: 'time',
        header: '거래 시간',
        cell: info => info.getValue().split(' ')[1],
      }),
    ],
    [],
  );

  return columns;
}

export default useColums;
