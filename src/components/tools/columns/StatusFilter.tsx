import React, { useEffect, useMemo, useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuList, MenuOptionGroup } from '@chakra-ui/react';
import { Column, Header, Table } from '@tanstack/react-table';

import { Custom } from 'components/common';
import useParamsFilter, { PARAMS } from 'hooks/useParamsFilter';
import { initialFilter } from 'pages/MainPage';
import { DataResponse } from 'types';

const FILTER_MENU_TYPE = {
  ALL: 'ALL',
  TRUE: 'true',
  FALSE: 'false',
} as const;

type KEY = keyof typeof FILTER_MENU_TYPE;

const StatusFilter = ({
  header,
  column,
  table,
}: {
  header: Header<DataResponse, unknown>;
  column: Column<any, unknown>;
  table: Table<DataResponse>;
}) => {
  const { state, filterState, updateState: setSearachParams } = useParamsFilter();
  const [filteringValue, setFilteringValue] = useState<(typeof FILTER_MENU_TYPE)[KEY]>(
    FILTER_MENU_TYPE.ALL,
  );

  const sortedUniqueValues = useMemo(
    () => Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()],
  );

  useEffect(() => {
    table.setColumnFilters([...filterState]);
  }, [state]);

  const onClickFilterHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as (typeof FILTER_MENU_TYPE)[KEY];
    name === FILTER_MENU_TYPE.ALL && setSearachParams(PARAMS.STATUS, 'ALL');
    name === FILTER_MENU_TYPE.TRUE && setSearachParams(PARAMS.STATUS, 'true');
    name === FILTER_MENU_TYPE.FALSE && setSearachParams(PARAMS.STATUS, 'false');
    setFilteringValue(name);
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
        <MenuOptionGroup defaultValue={filteringValue} type='radio' value={filteringValue}>
          {sortedUniqueValues.slice(0, 5000).map(value => (
            <Custom.MenuItemOptionBlock
              onClick={e => onClickFilterHandler(e)}
              name={value.toString()}
              key={'status key' + value.toString()}
            >
              {value.toString()}
            </Custom.MenuItemOptionBlock>
          ))}
          <Custom.MenuItemOptionBlock
            minH='35px'
            name={FILTER_MENU_TYPE.ALL}
            onClick={e => onClickFilterHandler(e)}
          >
            ALL
          </Custom.MenuItemOptionBlock>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default StatusFilter;
