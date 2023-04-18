import { Table } from '@tanstack/react-table';
import { Select, HStack, Box, VStack, Button } from '@chakra-ui/react';
import { CustomIcon } from 'components/common';
import { DataResponse } from 'types';
import { Custom } from 'components/common';
import { useEffect } from 'react';
import useFilter from 'hooks/useFilters';

const BTN_NAME = {
  FIRST_PAGE: 'first-page',
  LAST_PAGE: 'last-page',
  NEXT_PAGE: 'next-page',
  BEFORE_PAGE: 'before-page',
} as const;

const PAGE = 'page' as const;

const PaginationBar = ({
  table,
  onResetFilterUIHandler,
}: {
  table: Table<DataResponse>;
  onResetFilterUIHandler: () => void;
}) => {
  const { state, updateState: setSearchParams } = useFilter();
  const tablePageSize = table.getPageCount();
  const currentPageIdx = Number(state.page) - 1;

  useEffect(() => table.setPageIndex(currentPageIdx), [setSearchParams]);

  const pageNationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    const pageNum = currentPageIdx + 1;
    name === BTN_NAME.FIRST_PAGE && setSearchParams(PAGE, '1');
    name === BTN_NAME.LAST_PAGE && setSearchParams(PAGE, tablePageSize);
    name === BTN_NAME.NEXT_PAGE && pageNum < tablePageSize && setSearchParams(PAGE, pageNum + 1);
    name === BTN_NAME.BEFORE_PAGE && pageNum > 1 && setSearchParams(PAGE, pageNum - 1);
  };

  const pagenationIdxBtnHandler = (idx: number) => setSearchParams(PAGE, idx + 1);

  return (
    <>
      <HStack flexDir='row' justifyContent='space-around'>
        <VStack align='center'>
          <HStack gap='1'>
            <Custom.IconBtn
              name={BTN_NAME.FIRST_PAGE}
              onClick={e => pageNationHandler(e)}
              disabled={!table.getCanPreviousPage()}
              aria-label=''
              icon={<CustomIcon.LeftArrowTwice minW='50px' />}
            />
            <Custom.IconBtn
              name={BTN_NAME.BEFORE_PAGE}
              onClick={e => pageNationHandler(e)}
              disabled={!table.getCanPreviousPage()}
              aria-label=''
              icon={<CustomIcon.LeftArrowOnce />}
            />
            <strong>
              {currentPageIdx + 1} / {tablePageSize}
            </strong>
            <Custom.IconBtn
              name={BTN_NAME.NEXT_PAGE}
              onClick={e => pageNationHandler(e)}
              disabled={!table.getCanNextPage()}
              aria-label=''
              icon={<CustomIcon.RightArrowOnce />}
            />
            <Custom.IconBtn
              name={BTN_NAME.LAST_PAGE}
              onClick={e => pageNationHandler(e)}
              disabled={!table.getCanNextPage()}
              aria-label=''
              icon={<CustomIcon.RightArrowTwice minW='50px' />}
            />
          </HStack>
          <HStack>
            {Array.from({ length: tablePageSize }, _ => 0).map(
              (e, idx) =>
                idx < tablePageSize && (
                  <Custom.TagGray
                    fontWeight='bold'
                    key={'Pagenation-num' + idx}
                    onClick={() => pagenationIdxBtnHandler(idx)}
                    cursor='pointer'
                    bg={currentPageIdx === idx ? 'gray.300' : 'gray.100'}
                  >
                    {idx + 1}
                  </Custom.TagGray>
                ),
            )}
          </HStack>
        </VStack>
        <Box flex='1' />
        <HStack>
          <Box flex='1' />
          <Button onClick={() => onResetFilterUIHandler()} color='gray.500' fontWeight='bold'>
            모든 필터 초기화
          </Button>
        </HStack>
        <HStack gap='5px'>
          <Select
            maxW={'150px'}
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {/* Visible Row Count Option */}
            {[5, 10, 50].map(pageSize => (
              <option key={'pageSize-key' + pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </HStack>
      </HStack>
    </>
  );
};

export default PaginationBar;
