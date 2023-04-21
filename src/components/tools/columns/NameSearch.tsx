import { FormEvent, useEffect, useMemo, useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { Table, Column, Header } from '@tanstack/react-table';

import { Custom } from 'components/common';
import useParamsFilter, { PARAMS } from 'hooks/useParamsFilter';

import type { DataResponse } from 'types';

const NameSearch = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  const { state, filterState, updateState: setSearachParams } = useParamsFilter();
  const [searchValue, setSearchValue] = useState(state.customer_name);

  useEffect(() => {
    table.setColumnFilters(filterState);
  }, [state]);

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const searchBtnHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearachParams(PARAMS.CUSTOMER_NAME, searchValue);
  };

  const onFilterMackinit = () => {
    setSearachParams(PARAMS.CUSTOMER_NAME, '');
    setSearchValue('');
  };

  return (
    <Menu closeOnSelect={false}>
      <Custom.TextBtn>
        <>{header.column.columnDef.header}</>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<SearchIcon />}
          variant='outline'
          size='sm'
          marginBottom='1'
          marginLeft='3'
        />
      </Custom.TextBtn>
      <MenuList padding='3'>
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.slice(0, sortedUniqueValues.length - 1).map(value => (
            <option value={value} key={'option-key' + value} />
          ))}
        </datalist>
        <form onSubmit={e => searchBtnHandler(e)}>
          <HStack>
            <Input
              type='text'
              list={column.id + 'list'}
              value={searchValue as string}
              placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Custom.OutlinBtn type='submit'>검색</Custom.OutlinBtn>
            <Custom.OutlinBtn onClick={onFilterMackinit}>초기화</Custom.OutlinBtn>
          </HStack>
        </form>
      </MenuList>
    </Menu>
  );
};

export default NameSearch;
