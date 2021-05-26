import axios, {CancelTokenSource} from 'axios';
import {FormikHelpers} from 'formik/dist/types';
import {MutableRefObject, useCallback, useContext, useEffect, useRef} from 'react';

import {AuthContext, IAuthContextValue} from '../../../../../../../../contexts/AuthContext';
import useDashboard from '../../../../../../../../hooks/useDashboard';
import DirectAPI from '../../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../../mechanisms/ErrorReporting';
import {validateResponse} from '../misc/utils';
import IFormValues from '../types/IFormValues';

export default function useFormSubmit() {
  const {user} = useDashboard();
  const requestRef: MutableRefObject<CancelTokenSource | null> = useRef(null);
  const [, updateAuthData]: IAuthContextValue = useContext(AuthContext);

  const formSubmitCallback = useCallback(
    async (values: IFormValues, {setSubmitting, setStatus}: FormikHelpers<IFormValues>) => {
      const request: CancelTokenSource | null = requestRef.current;
      if (request !== null) request.cancel();
      requestRef.current = axios.CancelToken.source();

      try {
        const {data} = await DirectAPI.patch(`users/${user.id}`, {
          data: {password: values.newPassword},
          cancelToken: requestRef.current.token,
        });
        validateResponse(data);
        updateAuthData({
          status: 'SIGNED-IN',
          user: data.user,
        });
        setStatus('success');
        setSubmitting(false);
      } catch (e: unknown) {
        ErrorReporting.captureError(e);
        setStatus('error');
      }
    },
    [updateAuthData, user]
  );

  useEffect(() => {
    const request: CancelTokenSource | null = requestRef.current;
    return () => {
      request !== null && request.cancel();
    };
  }, [requestRef]);

  return formSubmitCallback;
}
