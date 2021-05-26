import axios, {CancelToken, CancelTokenSource} from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';

import usePrevious from '../../../../../../../hooks/usePrevious';
import DirectAPI from '../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../mechanisms/ErrorReporting';
import ITicket from '../../../../../../../models/ITicket';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';
import {ITableStatus} from '../../../../../../organisms/DataTable/types/ITableData';
import {
  calculateMissingUsersIds,
  defaultUsersPool,
  IResponse,
  IUsersPool,
  validateResponse,
} from '../misc/fetch-users-utils';
import useUniqueUsersIds from './useUniqueUsersIds';

export default function useUsersCache(ticketsPool: IItemsPool<ITicket>): [ITableStatus, IUsersPool] {
  const usersIds = useUniqueUsersIds(ticketsPool);
  const prevUsersIds = usePrevious(usersIds);
  const argsHasChanged = usersIds !== prevUsersIds;
  const cancelTokenSourceRef = useRef<CancelTokenSource>(axios.CancelToken.source());
  const [usersPool, setUsersPool] = useState<IUsersPool>(defaultUsersPool);
  const [status, setStatus] = useState<ITableStatus>('idle');

  const updateUsersPool = useCallback(
    (newUsersPool: IUsersPool) => {
      setUsersPool({
        users: usersPool.users.concat(newUsersPool.users),
        meta: {
          total: newUsersPool.meta.total,
        },
      });
    },
    [usersPool, setUsersPool]
  );

  const fetchUsers = useCallback(
    async (missingUsersIds: number[], cancelToken?: CancelToken) => {
      try {
        const query: string = 'id=' + missingUsersIds.join(',');
        const {data} = await DirectAPI.get<IResponse | unknown>('/users?' + query, {
          cancelToken,
        });
        validateResponse(data);
        const {users, meta} = data; // filter out fields: status, message etc.
        updateUsersPool({users, meta});
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
    [updateUsersPool, setStatus]
  );

  // to start
  useEffect(() => {
    let cancelTokenSource: CancelTokenSource = cancelTokenSourceRef.current;

    if (status === 'idle' && argsHasChanged && usersIds.length > 0) {
      const missingUsersIds: number[] = calculateMissingUsersIds(usersPool, usersIds);
      if (missingUsersIds.length > 0) {
        setStatus('loading');
        fetchUsers(missingUsersIds, cancelTokenSource.token);
      }
    }

    return () => {};
  }, [cancelTokenSourceRef, status, argsHasChanged, usersIds, usersPool, fetchUsers]);

  // to cancel
  useEffect(() => {
    let cancelTokenSource: CancelTokenSource = cancelTokenSourceRef.current;
    return () => {
      cancelTokenSource.cancel('useUsersCache: useEffect cleanup');
      setStatus('idle');
    };
  }, [cancelTokenSourceRef]);

  return [status, usersPool];
}
