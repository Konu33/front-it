import React, {memo, useCallback, useState} from 'react';
import {useHistory} from 'react-router';

import DataTable from '../../../../../organisms/DataTable/DataTable';
import IFiltersState from '../../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../../organisms/DataTable/types/ITableData';
import useStyles from './hooks/useStyles';
import useTableData from './hooks/useTableData';
import useTableHandlers from './hooks/useTableHandlers';
import columns from './misc/columns';
import {defaultFiltersState, defaultSortState} from './misc/defaults';
import ILinkedTicket from './types/ILinkedTicket';

function AllTickets() {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [sortState, setSortState] = useState<ISortState<ILinkedTicket>>(defaultSortState);
  const [filtersState, setFiltersState] = useState<IFiltersState<ILinkedTicket>>(defaultFiltersState);
  const {status, itemsPool}: ITableData<ILinkedTicket> = useTableData(page, rowsPerPage, sortState, filtersState);
  const history = useHistory();
  const tableHandlers = useTableHandlers<ILinkedTicket>({
    sortState,
    filtersState,
    setPage,
    setRowsPerPage,
    setSortState,
    setFiltersState,
  });

  const onRowClick = useCallback(
    (ticket: ILinkedTicket) => {
      history.push(`/home/tickets/${ticket.id}`);
    },
    [history]
  );

  return (
    <div className={classes.root}>
      <DataTable<ILinkedTicket>
        title={'All tickets'}
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

export default memo(AllTickets);
