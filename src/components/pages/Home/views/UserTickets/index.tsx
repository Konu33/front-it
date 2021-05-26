import React, {memo, useCallback, useState} from 'react';
import {useHistory} from 'react-router';

import DataTable from '../../../../organisms/DataTable/DataTable';
import IFiltersState from '../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../organisms/DataTable/types/ITableData';
import useTableData from '../Mod/AllTickets/hooks/useTableData';
import useTableHandlers from '../Mod/AllTickets/hooks/useTableHandlers';
import useStyles from './hooks/useStyles';
import columns from './misc/columns';
import {defaultFiltersState, defaultSortState} from './misc/defaults';
import IUserTicket from './types/IUserTicket';

function UserTickets() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortState, setSortState] = useState<ISortState<IUserTicket>>(defaultSortState);
  const [filtersState, setFiltersState] = useState<IFiltersState<IUserTicket>>(defaultFiltersState);
  const {status, itemsPool}: ITableData<IUserTicket> = useTableData(page, rowsPerPage, sortState, filtersState);
  const history = useHistory();
  const tableHandlers = useTableHandlers<IUserTicket>({
    sortState,
    filtersState,
    setPage,
    setRowsPerPage,
    setSortState,
    setFiltersState,
  });

  const onRowClick = useCallback(
    (ticket: IUserTicket) => {
      history.push(`/home/tickets/${ticket.id}`);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <DataTable<IUserTicket>
        title={'My tickets'}
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

export default memo(UserTickets);
