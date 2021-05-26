import axios, {CancelTokenSource} from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';

import DirectAPI from '../../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../../mechanisms/ErrorReporting';
import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../../models/ISuccessResponse';

export default function useButtonClickHandler() {
  const request = useRef<CancelTokenSource>(axios.CancelToken.source());
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');

  const logout = useCallback(async () => {
    try {
      let {token, cancel}: CancelTokenSource = request.current;

      if (status === 'loading') cancel('useLogout: useEffect cleanup');

      setStatus('loading');
      const response = await DirectAPI.post<ISuccessResponse | unknown>('/authentication/logout-everywhere', {
        cancelToken: token,
      });
      const data: ISuccessResponse | unknown = response.data;
      successResponseValidationSchema.validateSync(data);
      setStatus('success');
    } catch (e: unknown) {
      if (axios.isCancel(e)) return;

      ErrorReporting.captureError(e);
      setStatus('error');
    }
  }, [status, setStatus, request]);

  //close
  useEffect(() => {
    let cancelTokenSource: CancelTokenSource = request.current;

    return () => {
      cancelTokenSource.cancel('useLogout: useEffect cleanup');
    };
  }, [request]);

  return {logout, status, setStatus};
}
