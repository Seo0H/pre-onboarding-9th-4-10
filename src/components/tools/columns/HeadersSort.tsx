import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Th } from '@chakra-ui/react';
import { flexRender, Header, Table } from '@tanstack/react-table';

import { Custom } from 'components/common';

import NameSearch from './NameSearch';
import StatusFilter from './StatusFilter';
import type { DataResponseId } from 'hooks/useColums';
import type { DataResponse } from 'types';

export interface TableProps {
  headers: Header<DataResponse, unknown>[];
  table: Table<DataResponse>;
}

type KeyOfDataRes = keyof DataResponseId;

const HeadersSort = ({ headers, table }: TableProps) => {
  return (
    <>
      {headers.map(
        header =>
          header.id !== 'date' && (
            <Th key={'header-key' + header.id}>
              {header.isPlaceholder ? null : (
                <>
                  {header.id === 'id' || header.id === 'time' ? (
                    <Custom.TextBtn
                      {...{
                        cursor: 'pointer',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ChevronUpIcon />,
                        desc: <ChevronDownIcon />,
                      }[header.column.getIsSorted() as string] ?? ' -'}
                    </Custom.TextBtn>
                  ) : header.id === 'customer_name' ? (
                    <NameSearch header={header} column={header.column} table={table} />
                  ) : header.id === 'status' ? (
                    <StatusFilter header={header} column={header.column} table={table} />
                  ) : (
                    <Custom.TextBtn>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Custom.TextBtn>
                  )}
                </>
              )}
            </Th>
          ),
      )}
    </>
  );
};

export default HeadersSort;
