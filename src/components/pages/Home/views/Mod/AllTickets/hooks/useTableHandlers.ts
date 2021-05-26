import {ChangeEvent, MouseEvent, useCallback, useMemo} from 'react';

import {toggleOrderDirection} from '../../../../../../organisms/DataTable/misc/utils';
import IColumn from '../../../../../../organisms/DataTable/types/IColumn';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import ISortState, {OrderDirection} from '../../../../../../organisms/DataTable/types/ISortState';
import ITableItem from '../../../../../../organisms/DataTable/types/ITableItem';

export interface ITableHandlersArgs<I extends ITableItem> {
  sortState: ISortState<I>;
  filtersState: IFiltersState<I>;
  setPage: (newPage: number) => void;
  setRowsPerPage: (newRowsPerPage: number) => void;
  setSortState: (newSortState: ISortState<I>) => void;
  setFiltersState: (newFiltersState: IFiltersState<I>) => void;
}

export default function useTableHandlers<I extends ITableItem>(args: ITableHandlersArgs<I>) {
  const {sortState, filtersState, setPage, setRowsPerPage, setSortState, setFiltersState} = args;

  const onChangePage = useCallback(
    (e: MouseEvent<HTMLButtonElement> | null, page: number) => {
      setPage(page);
    },
    [setPage]
  );
  const onChangeRowsPerPage = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const val = e.target.value;
      setPage(0);
      setRowsPerPage(parseInt(val));
    },
    [setPage, setRowsPerPage]
  );
  const onSortChange = useCallback(
    (column: IColumn<I>) => {
      setSortState({
        orderBy: column.id,
        orderDirection:
          sortState.orderBy === column.id ? toggleOrderDirection(sortState.orderDirection) : OrderDirection.DESC,
      });
    },
    [sortState, setSortState]
  );

  const onFiltersChange = useCallback(
    (newFiltersState: Partial<IFiltersState<I>>) => {
      setFiltersState({
        ...filtersState,
        ...newFiltersState,
      });
    },
    [filtersState, setFiltersState]
  );

  return useMemo(() => ({onChangePage, onChangeRowsPerPage, onSortChange, onFiltersChange}), [
    onChangePage,
    onChangeRowsPerPage,
    onFiltersChange,
    onSortChange,
  ]);
}
