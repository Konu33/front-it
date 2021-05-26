import TableSortLabel from '@material-ui/core/TableSortLabel';
import React, {memo} from 'react';

import IColumn from '../types/IColumn';
import ISortState from '../types/ISortState';
import ITableItem from '../types/ITableItem';

export interface IColumnSortProps<I extends ITableItem> {
  column: IColumn<I>;
  sortState: ISortState<I>;
}

function ColumnSort<I extends ITableItem>(props: IColumnSortProps<I>) {
  const {column, sortState} = props;

  return (
    <TableSortLabel
      active={sortState.orderBy === column.id}
      direction={sortState.orderBy === column.id ? sortState.orderDirection : undefined}
    >
      {column.label}
    </TableSortLabel>
  );
}

export default memo(ColumnSort) as typeof ColumnSort;
