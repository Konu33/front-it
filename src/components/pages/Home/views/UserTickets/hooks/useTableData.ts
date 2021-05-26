import {useMemo} from 'react';

import IFiltersState from '../../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../../organisms/DataTable/types/ITableData';
import IUserTicket from '../types/IUserTicket';
import useFetchTickets from './useFetchTickets';

export default function useTableData(
  page: number,
  limit: number,
  sortState: ISortState<IUserTicket>,
  filtersState: IFiltersState<IUserTicket>
): ITableData<IUserTicket> {
  const [ticketsStatus, ticketsPool] = useFetchTickets(page, limit, sortState, filtersState);

  return useMemo(
    () =>
      ({
        status: ticketsStatus,
        itemsPool: ticketsPool,
      } as ITableData<IUserTicket>),
    [ticketsStatus, ticketsPool]
  );
}
