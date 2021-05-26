import {ChangeEvent, MouseEvent} from 'react';

import {OverrideClassesProp} from '../../../../utils/styling-utils';
import useStyles from '../hooks/useStyles';
import IColumn from './IColumn';
import IFiltersState from './IFiltersState';
import IItemsPool from './IItemsPool';
import ISortState from './ISortState';
import {ITableStatus} from './ITableData';
import ITableItem from './ITableItem';

export default interface IDataTableProps<I extends ITableItem> {
  title: string;
  columns: IColumn<I>[];
  status: ITableStatus;
  itemsPool: IItemsPool<I>;
  page: number;
  onChangePage: (e: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  sortState: ISortState<I>;
  onSortChange: (column: IColumn<I>) => void;
  filtersState: IFiltersState<I>;
  onFiltersChange: (newFilters: Partial<IFiltersState<I>>) => void;
  onRowClick?: (item: I) => void;
  classes?: OverrideClassesProp<typeof useStyles>;
  className?: string;
}
