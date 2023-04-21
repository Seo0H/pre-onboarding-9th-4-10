import { useMemo, useState, FormEvent, useEffect, useContext, Children } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Input,
  HStack,
  MenuOptionGroup,
  MenuItemOption,
  MenuItemOptionProps,
} from '@chakra-ui/react';
import { Table, Column, Header } from '@tanstack/react-table';

import { Custom } from 'components/common';
import useParamsFilter, { PARAMS } from 'hooks/useParamsFilter';
import { GlobalFilterContext, initialFilter } from 'pages/MainPage';
import { DataResponse } from 'types';

const FILTER_MENU_TYPE = {
  ALL: 'ALL',
  TRUE: 'true',
  FALSE: 'false',
} as const;

type KEY = keyof typeof FILTER_MENU_TYPE;

const HeadersFilters = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  const { state, updateState: setSearachParams } = useParamsFilter();
  const [isFilterUpdate, setIsFilterUpdate] = useState(true);
  const [searchValue, setSearchValue] = useState(state.search_name);
  const [filteringValue, setFilteringValue] = useState<(typeof FILTER_MENU_TYPE)[KEY]>(
    FILTER_MENU_TYPE.ALL,
  );
  const firstValueType = typeof table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);
  const isFilterGlobalReset = useContext(GlobalFilterContext);

  useEffect(() => {
    table.setColumnFilters([{ id: 'customer_name', value: state.search_name }, initialFilter]);
    setIsFilterUpdate(() => false);
  }, [isFilterUpdate]);

  useEffect(() => {
    column.setFilterValue('');
    setFilteringValue(FILTER_MENU_TYPE.ALL);
  }, [isFilterGlobalReset]);

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const searchBtnHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearachParams(PARAMS.SEARCH_NAME, searchValue);
    setIsFilterUpdate(true);
  };

  const onFilterMackinit = () => {
    setSearachParams(PARAMS.SEARCH_NAME, '');
    setSearchValue('');
    setIsFilterUpdate(true);
  };

  const onClickFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as (typeof FILTER_MENU_TYPE)[KEY];
    name === FILTER_MENU_TYPE.ALL && setSearachParams(PARAMS.FILTER_ORDER, 'ALL');
    name === FILTER_MENU_TYPE.TRUE && setSearachParams(PARAMS.FILTER_ORDER, 'true');
    name === FILTER_MENU_TYPE.FALSE && setSearachParams(PARAMS.FILTER_ORDER, 'false');
    setFilteringValue(name);
    setIsFilterUpdate(true);
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

      {column.id === 'customer_name' ? (
        <MenuList padding='3'>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues
              .slice(0, sortedUniqueValues.length - 1)
              .map((value: typeof firstValueType) => (
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
      ) : (
        <MenuList padding='3'>
          <MenuOptionGroup defaultValue={filteringValue} type='radio' value={filteringValue}>
            {sortedUniqueValues.slice(0, 5000).map(value => (
              <CustomMenuItemOption
                onClick={e => onClickFilterHandler(e)}
                name={value.toString()}
                key={'status key' + value.toString()}
              >
                {value.toString()}
              </CustomMenuItemOption>
            ))}
            <CustomMenuItemOption
              minH='35px'
              name={FILTER_MENU_TYPE.ALL}
              onClick={e => onClickFilterHandler(e)}
            >
              ALL
            </CustomMenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      )}
    </Menu>
  );
};

export default HeadersFilters;

const CustomMenuItemOption = (props: MenuItemOptionProps) => {
  return (
    <MenuItemOption minH='35px' fontSize='md' fontWeight='bold' {...props}>
      {props.children}
    </MenuItemOption>
  );
};
