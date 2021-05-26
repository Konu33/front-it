import axios, {CancelTokenSource} from 'axios';
import {Dispatch, MutableRefObject, useCallback, useEffect, useRef} from 'react';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import {IResponse, validateResponse} from '../misc/use-fetch-user-utils';
import useLocalState, {Action, ILocalState} from './useLocalState';

export default function useFetchUser(params: Record<string, number | unknown>): ILocalState {
  const requestRef: MutableRefObject<CancelTokenSource | null> = useRef(null);
  const [state, dispatch]: [ILocalState, Dispatch<Action>] = useLocalState();

  const fetchUser = useCallback(async () => {
    const request: CancelTokenSource | null = requestRef.current;
    if (request !== null) request.cancel();
    requestRef.current = axios.CancelToken.source();

    try {
      const response = await DirectAPI.get<IResponse | unknown>('/users?id=' + params.id);
      const data: unknown | IResponse = response.data;
      validateResponse(data);

      dispatch({type: 'fulfillState', payload: data.users[0] ?? null});
    } catch (e) {
      ErrorReporting.captureError(e);
      dispatch({type: 'rejectState', payload: undefined});
    }
  }, [dispatch, params]);

  // startup
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // cleanup
  useEffect(() => {
    const request: CancelTokenSource | null = requestRef.current;
    return () => {
      request !== null && request.cancel();
    };
  }, [requestRef]);

  return state;
}
