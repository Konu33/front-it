import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, {memo, useCallback} from 'react';

import IColumn from '../types/IColumn';
import ISortState from '../types/ISortState';
import {ITableStatus} from '../types/ITableData';
import ITableItem from '../types/ITableItem';
import ColumnSort from './ColumnSort';

export interface IDataTableHeadProps<I extends ITableItem> {
  columns: IColumn<I>[];
  status: ITableStatus;
  sortState: ISortState<I>;
  onSortChange: (column: IColumn<I>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstHeadRow: {
      height: 83,
      [theme.breakpoints.up('sm')]: {
        height: 57,
      },
    },
    secondHeadRow: {
      padding: 0,
      top: 83,
      [theme.breakpoints.up('sm')]: {
        top: 57,
      },
    },
    filterCell: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    linearProgress: ({status}: IDataTableHeadProps<any>) => ({
      visibility: status === 'loading' ? 'visible' : 'hidden',
    }),
  })
);

function DataTableHead<I extends ITableItem>(props: IDataTableHeadProps<I>) {
  const {columns, status, sortState, onSortChange} = props;
  const classes = useStyles(props);

  const createSortHandler = useCallback(
    (column: IColumn<I>) => () => {
      onSortChange(column);
    },
    [onSortChange]
  );

  return (
    <TableHead>
      <TableRow className={classes.firstHeadRow}>
        {columns.map((column: IColumn<I>) => (
          <TableCell
            key={column.id.toString()}
            align={column.align}
            style={{width: column.width}}
            sortDirection={column.sortable && sortState.orderBy === column.id ? sortState.orderDirection : undefined}
            onClick={createSortHandler(column)}
          >
            {column.sortable ? <ColumnSort<I> column={column} sortState={sortState} /> : column.label}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} className={classes.secondHeadRow}>
          <Fade in={status === 'loading'} timeout={500}>
            {/*style={{transitionDelay: '250ms'}}*/}
            <LinearProgress color={'secondary'} className={classes.linearProgress} />
          </Fade>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default memo(DataTableHead) as typeof DataTableHead;
