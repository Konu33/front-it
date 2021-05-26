import {createStyles, makeStyles} from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, {memo, MouseEvent, useCallback} from 'react';

import IColumn from '../types/IColumn';
import IItemsPool from '../types/IItemsPool';
import ITableItem from '../types/ITableItem';

export interface IDataTableBodyProps<I extends ITableItem> {
  columns: IColumn<I>[];
  itemsPool: IItemsPool<I>;
  onRowClick?: (item: I) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    row: {
      cursor: 'pointer',
    },
  })
);

function DataTableBody<I extends ITableItem>(props: IDataTableBodyProps<I>) {
  const {columns, itemsPool, onRowClick} = props;
  const classes = useStyles();

  const handleRowClick = useCallback(
    (e: MouseEvent<HTMLTableRowElement>) => {
      e.stopPropagation();
      const dataItemVal = e.currentTarget.dataset['itemId'];
      if (dataItemVal === undefined) throw new Error("One of the rows doesn't have `data-item-id` attribute.");

      const itemId = parseInt(dataItemVal);
      if (isNaN(itemId))
        throw new Error(
          `Row with attribute \`data-item-id=\`${dataItemVal} has invalid value, as this is not integer.`
        );

      const item: I | undefined = itemsPool.items.find((item: I) => item.id === itemId);

      if (item === undefined) throw new Error(`Internal error: cannot find in memory item (ID:${itemId}).`);

      onRowClick?.(item);
    },
    [itemsPool, onRowClick]
  );

  return (
    <TableBody>
      {itemsPool.items.map((item: I) => {
        return (
          <TableRow hover key={item.id} className={classes.row} data-item-id={item.id} onClick={handleRowClick}>
            {columns.map((column: IColumn<I>) => {
              return (
                <TableCell key={column.id.toString()} align={column.align}>
                  {typeof column.format === 'function' ? column.format(item) : item[column.id.toString()]?.toString()}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export default memo(DataTableBody) as typeof DataTableBody;
