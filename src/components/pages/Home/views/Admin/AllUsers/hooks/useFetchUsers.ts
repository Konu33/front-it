import axios, {CancelToken, CancelTokenSource} from 'axios';
import qs from 'qs';
import {useCallback, useEffect, useRef, useState} from 'react';

import usePrevious from '../../../../../../../hooks/usePrevious';
import DirectAPI from '../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../mechanisms/ErrorReporting';
import IUser, {Role} from '../../../../../../../models/IUser';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';
import ISortState from '../../../../../../organisms/DataTable/types/ISortState';
import {ITableStatus} from '../../../../../../organisms/DataTable/types/ITableData';
import {defaultUsersPool, IResponse, validateResponse} from '../misc/fetch-users-utils';

export default function useFetchUsers(
  page: number,
  limit: number,
  sortState: ISortState<IUser>,
  filtersState: IFiltersState<IUser>
): [ITableStatus, IItemsPool<IUser>] {
  const prevPage = usePrevious(page);
  const prevLimit = usePrevious(limit);
  const prevSortState = usePrevious(sortState);
  const prevFiltersState = usePrevious(filtersState);
  const argsHasChanged =
    page !== prevPage || limit !== prevLimit || sortState !== prevSortState || filtersState !== prevFiltersState;
  const cancelTokenSourceRef = useRef<CancelTokenSource>(axios.CancelToken.source());
  const [status, setStatus] = useState<ITableStatus>('idle');
  const [ticketsPool, setTicketsPool] = useState<IItemsPool<IUser>>(defaultUsersPool);

  const fetchTickets = useCallback(
    async (cancelToken?: CancelToken) => {
      try {
        const offset = page * limit;
        const filters: Partial<Omit<IFiltersState<IUser>, 'status'> & {status?: number}> = {
          ...filtersState,
          status: undefined,
        };

        const filtersKeys = Object.keys(filters) as (keyof IUser)[];

        filtersKeys.forEach((key: keyof IUser) => (!filters[key] ? delete filters[key] : {}));

        if (filtersState.role === Role.ALL) filters.role = undefined; // fix

        const query: string = qs.stringify({
          limit,
          offset,
          ...sortState,
          ...filters,
        });
        const {data} = await DirectAPI.get<IResponse | unknown>(`/users?` + query, {
          cancelToken,
        });
        validateResponse(data);
        const {users, meta} = data; // filter out fields: status, message etc.
        setTicketsPool({items: users, meta});
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
