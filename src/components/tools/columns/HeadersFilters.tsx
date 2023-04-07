import { useMemo, useState, FormEvent, useEffect, useContext } from 'react';
import { Table, Column, Header } from '@tanstack/react-table';
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
} from '@chakra-ui/react';
import { DataResponse } from 'types';
import { Custom } from 'components/common';
import { GlobalFilterContext } from 'pages/MainPage';

const FILTER_MENU_TYPE = {
  ALL: 'ALL',
  TRUE: 'true',
  FALSE: 'false',
} as const;

const HeadersFilters = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  // Colum의 Row 속성 검색 필터링을 위해 사용
  const [searchValue, setSearchValue] = useState<string>();

  // Colum의 Row 속성이 선택 필터링을 위해 사용
  const [selectedValue, setSelectedValue] = useState<string>(FILTER_MENU_TYPE.ALL);

  // Col의 첫번째 row인자를 통해 해당 Col의 속성 파악
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  // Filter 전체 초기화 시 부분 적용 필터 시각적 초기화를 위한 변수
  const isFilterGlobalReset = useContext(GlobalFilterContext);

  useEffect(() => {
    column.setFilterValue('');
    setSelectedValue(FILTER_MENU_TYPE.ALL);
  }, [isFilterGlobalReset]);

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  const searchBtnHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    column.setFilterValue(searchValue);
    setSearchValue('');
  };

  const onFilterMackinit = () => {
    setSearchValue('');
    column.setFilterValue('');
  };

  const onMenuChangeHandler = (val: string | string[]) => {
    if (typeof val === 'object') return;
    val === FILTER_MENU_TYPE.TRUE
      ? column.setFilterValue(true)
      : val === FILTER_MENU_TYPE.FALSE
      ? column.setFilterValue(false)
      : column.setFilterValue('');
    setSelectedValue(val);
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

      {typeof firstValue === 'string' ? (
        <MenuList padding='3'>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues
              .slice(0, sortedUniqueValues.length - 1)
              .map((value: typeof firstValue) => (
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
          <MenuOptionGroup
            defaultValue={selectedValue}
            type='radio'
            onChange={val => onMenuChangeHandler(val)}
            value={selectedValue}
          >
            {sortedUniqueValues.slice(0, 5000).map((value: string) => (
              <MenuItemOption
                minH='35px'
                fontSize='md'
                fontWeight='bold'
                value={value.toString()}
                key={'status key' + value.toString()}
              >
                {value.toString()}
              </MenuItemOption>
            ))}
            <MenuItemOption
              minH='35px'
              fontSize='md'
              fontWeight='bold'
              value={FILTER_MENU_TYPE.ALL}
            >
              ALL
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      )}
    </Menu>
  );
};

export default HeadersFilters;
