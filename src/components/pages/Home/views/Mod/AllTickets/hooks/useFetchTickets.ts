import axios, {CancelToken, CancelTokenSource} from 'axios';
import qs from 'qs';
import {useCallback, useEffect, useRef, useState} from 'react';

import usePrevious from '../../../../../../../hooks/usePrevious';
import DirectAPI from '../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../mechanisms/ErrorReporting';
import ITicket, {TicketStatus} from '../../../../../../../models/ITicket';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';
import ISortState from '../../../../../../organisms/DataTable/types/ISortState';
import {ITableStatus} from '../../../../../../organisms/DataTable/types/ITableData';
import {defaultTicketsPool, IResponse, validateResponse} from '../misc/fetch-tickets-utils';
import ILinkedTicket from '../types/ILinkedTicket';

export default function useFetchTickets(
  page: number,
  limit: number,
  sortState: ISortState<ILinkedTicket>,
  filtersState: IFiltersState<ILinkedTicket>
): [ITableStatus, IItemsPool<ITicket>] {
  const prevPage = usePrevious(page);
  const prevLimit = usePrevious(limit);
  const prevSortState = usePrevious(sortState);
  const prevFiltersState = usePrevious(filtersState);
  const argsHasChanged =
    page !== prevPage || limit !== prevLimit || sortState !== prevSortState || filtersState !== prevFiltersState;
  const cancelTokenSourceRef = useRef<CancelTokenSource>(axios.CancelToken.source());
  const [status, setStatus] = useState<ITableStatus>('idle');
  const [ticketsPool, setTicketsPool] = useState<IItemsPool<ITicket>>(defaultTicketsPool);

  const fetchTickets = useCallback(
    async (cancelToken?: CancelToken) => {
      try {
        const offset = page * limit;
        const filters: Partial<Omit<IFiltersState<ITicket>, 'status'> & {status?: number}> = {
          ...filtersState,
          status: undefined,
        };

        const filtersKeys = Object.keys(filters) as (keyof ITicket)[];

        filtersKeys.forEach((key: keyof ITicket) => (!filters[key] ? delete filters[key] : {}));

        if (filtersState.status !== undefined && filtersState.status !== TicketStatus[TicketStatus.ALL])
          filters.status = TicketStatus[filtersState.status as keyof typeof TicketStatus]; // fix

        const query: string = qs.stringify({
          limit,
          offset,
          ...sortState,
          ...filters,
        });
        const {data} = await DirectAPI.get<IResponse | unknown>('/tickets?' + query, {
          cancelToken,
        });
        validateResponse(data);
        const {tickets, meta} = data; // filter out fields: status, message etc.
        setTicketsPool({items: tickets, meta});
        setStatus('idle');
      } catch (e: unknown) {
        if (axios.isCancel(e)) {
          setStatus('idle');
        } else {
          ErrorReporting.captureError(e);
          setStatus('error');
        }
      }
    },
    [limit, page, sortState, filtersState, setTicketsPool, setStatus]
  );

  // to start
  useEffect(() => {
    let cancelTokenSource: CancelTokenSource = cancelTokenSourceRef.current;

    if (status === 'idle' && argsHasChanged) {
      setStatus('loading');
      fetchTickets(cancelTokenSource.token);
    }

    return () => {};
  }, [cancelTokenSourceRef, status, argsHasChanged, ticketsPool, fetchTickets]);

  // to cancel
  useEffect(() => {
    let cancelTokenSource: CancelTokenSource = cancelTokenSourceRef.current;
    return () => {
      cancelTokenSource.cancel('useFetchTickets: useEffect cleanup');
      setStatus('idle');
    };
  }, [cancelTokenSourceRef]);

  return [status, ticketsPool];
}
