import { createContext, useEffect, useState } from 'react';
import { flexRender, Table } from '@tanstack/react-table';
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Box,
  Text,
  Divider,
  Th,
  VStack,
} from '@chakra-ui/react';
import { HeadersSort, PagenationBar } from 'components/tools';
import { FILTER_DATE } from 'types/constans';
import { DataResponse } from 'types';
import { Custom } from 'components/common';
import { S } from '.';

interface MainTableProps {
  table: Table<DataResponse>;
  dataUpdatedAt: number;
}
export const GlobalFilterContext = createContext(false);
export const initialFilter = { id: 'date', value: FILTER_DATE.TODAY } as const;

const MainTable = ({ table, dataUpdatedAt }: MainTableProps) => {
  const [tableFilter, setTableFilter] = useState(initialFilter);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [isFilterReset, setIsFilterRest] = useState(false);

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters([tableFilter]);
  }, []);

  const onResetFilterHandler = () => {
    table.setColumnFilters([initialFilter]);
    setIsFilterRest(true);
    setTimeout(() => setIsFilterRest(false), 1000);
  };

  return (
    <TableContainer test-id='Table-Container' overflow='hidden' height='75vh'>
      <VStack marginBottom='8' alignItems='flex-start'>
        <Custom.TagGray>
          <strong>Today :</strong>
          <Text fontWeight='md'> &nbsp;{tableFilter.value}</Text>
        </Custom.TagGray>
        <Custom.TagGray>
          <strong>The last sync</strong>
          <Text fontWeight='md'>&nbsp;{new Date(dataUpdatedAt).toLocaleTimeString()}</Text>
        </Custom.TagGray>
      </VStack>
      <PagenationBar table={table} onResetFilterHandler={onResetFilterHandler} />
      <Divider marginTop='20px' orientation='horizontal' />
      <Box overflowY='auto' height='60vh'>
        <S.StyleAlineTd>
          <ChakraTable colorScheme='gray'>
            <GlobalFilterContext.Provider value={isFilterReset}>
              <Thead>
                {table.getHeaderGroups().map(headerGroup => (
                  <Tr key={headerGroup.id}>
                    <Th>Index</Th>
                    <HeadersSort headers={headerGroup.headers} table={table} />
                  </Tr>
                ))}
              </Thead>
            </GlobalFilterContext.Provider>
            <Tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <>
                  <Tr key={row.id}>
                    <Td>{idx + 1}</Td>
                    {row.getVisibleCells().map(
                      cell =>
                        !cell.id.includes('date') && (
                          <Td key={cell.id} test-id='Table-Row'>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </Td>
                        ),
                    )}
                  </Tr>
                </>
              ))}
            </Tbody>
          </ChakraTable>
        </S.StyleAlineTd>
      </Box>
    </TableContainer>
  );
};

export default MainTable;
