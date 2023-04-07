import { flexRender, Table } from '@tanstack/react-table';
import { Table as ChakraTable, Thead, Tbody, Tr, Td, Box, Divider, Th } from '@chakra-ui/react';
import { HeadersSort } from 'components/tools';
import { DataResponse } from 'types';
import { S } from '.';

const MainTable = ({ table }: { table: Table<DataResponse> }) => {
  return (
    <>
      <Divider marginTop='20px' orientation='horizontal' />
      <Box overflowY='scroll' height='50vh'>
        <S.StyleAlineTd>
          <ChakraTable colorScheme='gray'>
            <Thead>
              {table.getHeaderGroups().map(headerGroup => (
                <Tr key={'headerGroup-key' + headerGroup.id}>
                  <Th>Index</Th>
                  <HeadersSort headers={headerGroup.headers} table={table} />
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <Tr key={'row-key' + row.id}>
                  <Td>{idx + 1}</Td>
                  {row.getVisibleCells().map(
                    cell =>
                      !cell.id.includes('date') && (
                        <Td key={'cell-key' + cell.id} test-id='Table-Row'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                      ),
                  )}
                </Tr>
              ))}
            </Tbody>
          </ChakraTable>
        </S.StyleAlineTd>
      </Box>
    </>
  );
};

export default MainTable;
