import {
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { DataResponse } from 'types';
import { ColumnDef } from '@tanstack/react-table';
import { initialFilter } from 'pages/MainPage';
import { useEffect } from 'react';

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
    table.setColumnFilters([initialFilter]);
  }, []);

  return table;
}

export default useTableOptions;
