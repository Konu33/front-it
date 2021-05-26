import {useMemo} from 'react';

import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../../../organisms/DataTable/types/ITableData';
import {identifyTableStatus} from '../misc/table-data-utils';
import ILinkedTicket from '../types/ILinkedTicket';
import useFetchTickets from './useFetchTickets';
import useLinkedTicketsPool from './useLinkedTicketsPool';
import useUsersCache from './useUsersCache';

export default function useTableData(
  page: number,
  limit: number,
  sortState: ISortState<ILinkedTicket>,
  filtersState: IFiltersState<ILinkedTicket>
): ITableData<ILinkedTicket> {
  const [ticketsStatus, ticketsPool] = useFetchTickets(page, limit, sortState, filtersState);
  const [usersStatus, usersPool] = useUsersCache(ticketsPool);
  const linkedTicketsPool = useLinkedTicketsPool(ticketsPool, usersPool);

  return useMemo(
    () =>
      ({
        status: identifyTableStatus(ticketsStatus, usersStatus),
        itemsPool: linkedTicketsPool,
      } as ITableData<ILinkedTicket>),
    [ticketsStatus, usersStatus, linkedTicketsPool]
  );
}
