import { Custom } from 'components/common';
import { flexRender, Header, Table } from '@tanstack/react-table';
import { Th } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { DataResponse } from 'types';
import HeadersFilters from './HeadersFilters';

interface TableProps {
  headers: Header<DataResponse, unknown>[];
  table: Table<DataResponse>;
}

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
                  ) : header.id === 'customer_name' || header.id === 'status' ? (
                    <HeadersFilters header={header} column={header.column} table={table} />
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
