import React, {memo, useCallback, useState} from 'react';
import {useHistory} from 'react-router';

import IUser from '../../../../../../models/IUser';
import DataTable from '../../../../../organisms/DataTable/DataTable';
import IFiltersState from '../../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../../organisms/DataTable/types/ITableData';
import useTableHandlers from '../../Mod/AllTickets/hooks/useTableHandlers';
import useStyles from './hooks/useStyles';
import useTableData from './hooks/useTableData';
import columns from './misc/columns';
import {defaultFiltersState, defaultSortState} from './misc/defaults';

function AllUsers() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortState, setSortState] = useState<ISortState<IUser>>(defaultSortState);
  const [filtersState, setFiltersState] = useState<IFiltersState<IUser>>(defaultFiltersState);
  const {status, itemsPool}: ITableData<IUser> = useTableData(page, rowsPerPage, sortState, filtersState);
  const history = useHistory();
  const tableHandlers = useTableHandlers<IUser>({
    sortState,
    filtersState,
    setPage,
    setRowsPerPage,
    setSortState,
    setFiltersState,
  });

  const onRowClick = useCallback(
    (user: IUser) => {
      history.push(`/home/users/${user.id}`);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <DataTable<IUser>
        title={'All users'}
        columns={columns}
        status={status}
        itemsPool={itemsPool}
        page={page}
        rowsPerPage={rowsPerPage}
        sortState={sortState}
        filtersState={filtersState}
        onRowClick={onRowClick}
        {...tableHandlers}
      />
    </div>
  );
}

export default memo(AllUsers);
