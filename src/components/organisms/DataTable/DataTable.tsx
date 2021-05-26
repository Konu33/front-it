import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import classNames from 'classnames';
import React, {memo} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import DataTableBody from './components/DataTableBody';
import DataTableHead from './components/DataTableHead';
import DataTableToolbar from './components/DataTableToolbar';
import useStyles from './hooks/useStyles';
import IDataTableProps from './types/IDataTableProps';
import ITableItem from './types/ITableItem';

function DataTable<I extends ITableItem>(props: IDataTableProps<I>) {
  const {
    classes: _classes,
    className,
    title,
    columns,
    status,
    itemsPool,
    page,
    onChangePage,
    rowsPerPage,
    onChangeRowsPerPage,
    sortState,
    onSortChange,
    filtersState,
    onFiltersChange,
    onRowClick,
  } = props;
  const classes = useMergeClasses(useStyles(props), _classes);

  return (
    <Paper className={classNames(classes.root, className)}>
      <DataTableToolbar<I>
        columns={columns}
        title={title}
        filtersState={filtersState}
        onFiltersChange={onFiltersChange}
      />
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <DataTableHead<I> columns={columns} status={status} sortState={sortState} onSortChange={onSortChange} />
          <DataTableBody<I> columns={columns} itemsPool={itemsPool} onRowClick={onRowClick} />
        </Table>
      </TableContainer>
      <Divider />
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component={'div'}
        count={itemsPool.meta.total}
        page={page}
        onChangePage={onChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={onChangeRowsPerPage}
        labelRowsPerPage={'Rows per page:'}
      />
    </Paper>
  );
}

export default memo(DataTable) as typeof DataTable;
