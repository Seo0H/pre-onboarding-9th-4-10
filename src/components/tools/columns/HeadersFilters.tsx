import { useMemo, useState, FormEvent, useEffect, useContext, Children } from 'react';
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
  MenuItemProps,
  MenuItemOptionProps,
} from '@chakra-ui/react';
import { DataResponse } from 'types';
import { Custom } from 'components/common';
import { GlobalFilterContext, initialFilter } from 'pages/MainPage';
import useFilter from 'hooks/useFilters';

const FILTER_MENU_TYPE = {
  ALL: 'ALL',
  TRUE: 'true',
  FALSE: 'false',
} as const;

const SEARCH_NAME = 'search_name';

const HeadersFilters = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  // const [query, setSearachParams] = useSearchParams();
  const { state, updateState: setSearachParams } = useFilter();
  const [isUpdate, setIsUpdate] = useState(true);
  // Colum의 Row 속성 검색 필터링을 위해 사용
  const [searchValue, setSearchValue] = useState<string>(state.search_name);

  // Colum의 Row 속성이 선택 필터링을 위해 사용
  const [selectedValue, setSelectedValue] = useState<string>(FILTER_MENU_TYPE.ALL);
  const firstValueType = typeof table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  // Filter 전체 초기화 시 부분 적용 필터 시각적 초기화를 위한 변수
  const isFilterGlobalReset = useContext(GlobalFilterContext);

  useEffect(() => {
    table.setColumnFilters([{ id: 'customer_name', value: state.search_name }, initialFilter]);
    setIsUpdate(false);
  }, [isUpdate]);

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
    setSearachParams(SEARCH_NAME, searchValue);
    setIsUpdate(true);
  };

  const onFilterMackinit = () => {
    setSearachParams(SEARCH_NAME, '');
    setSearchValue('');
    setIsUpdate(true);
  };

  const onMenuChangeHandler = (val: string | string[]) => {
    console.log(val);
    if (typeof val === 'object') return;
    val === FILTER_MENU_TYPE.TRUE
      ? column.setFilterValue(true)
      : val === FILTER_MENU_TYPE.FALSE
      ? column.setFilterValue(false)
      : column.setFilterValue('');
    setSelectedValue(val);
  };

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.name);
    const name = e.currentTarget.name;
    // name === BTN_NAME.FIRST_PAGE && setSearachParams(PAGE, '1');/
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

      {firstValueType === 'string' ? (
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
          <MenuOptionGroup
            defaultValue={selectedValue}
            type='radio'
            onChange={val => onMenuChangeHandler(val)}
            value={selectedValue}
          >
            {sortedUniqueValues.slice(0, 5000).map((value: string) => (
              <CustomMenuItemOption
                onClick={e => onClickHandler(e)}
                name={value.toString()}
                key={'status key' + value.toString()}
              >
                {value.toString()}
              </CustomMenuItemOption>
            ))}
            <CustomMenuItemOption minH='35px' name={FILTER_MENU_TYPE.ALL}>
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
