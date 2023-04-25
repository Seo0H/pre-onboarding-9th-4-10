import { useEffect } from 'react';

import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';

import { initialFilter } from 'constant';
import { DataResponse } from 'types';

function useTableOptions({
  data,
  columns,
}: {
  data: DataResponse[];
  columns: ColumnDef<DataResponse, any>[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });

  useEffect(() => {
    table.setPageSize(50);
    table.setColumnFilters(initialFilter);
  }, []);

  return table;
}

export default useTableOptions;
