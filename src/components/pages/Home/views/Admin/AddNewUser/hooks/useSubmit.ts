import axios, {CancelTokenSource} from 'axios';
import {FormikHelpers} from 'formik/dist/types';
import {MutableRefObject, useCallback, useEffect, useRef} from 'react';
import {useHistory} from 'react-router';

import DirectAPI from '../../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../../mechanisms/ErrorReporting';
import {isBadRequestResponse} from '../../../../../../../models/IBadRequestResponse';
import {isAxiosError} from '../../../../../../../utils/axios-utils';
import {getRandomInteger} from '../../../../../../../utils/random-utils';
import colors from '../misc/colors';
import * as utils from '../misc/utils';

interface IUser {
  email: string;
  password: string;
  name: string;
  surname: string;
  iconColor?: string;
  accountType: number;
}
enum SendError {
  CREATE_ERROR = 'Taki użytkownik już istnieje',
}

export default function useSubmitFn() {
  const requestRef: MutableRefObject<CancelTokenSource | null> = useRef(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (values: typeof utils.formInitialValues, helpers: FormikHelpers<typeof utils.formInitialValues>) => {
      const request: CancelTokenSource | null = requestRef.current;
      if (request !== null) request.cancel();
      requestRef.current = axios.CancelToken.source();

      try {
        const userModel: IUser = {
          name: values.name,
          email: values.email,
          password: values.password,
          surname: values.surname,
          accountType: values.accountType,
          iconColor: colors[getRandomInteger(0, colors.length - 1)],
        };

        const {data} = await DirectAPI.post('/users', {data: userModel});
        utils.validateSubmitUserResponse(data);
        history.push('/home/add-ticket');
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response && e.response.status === 400 && isBadRequestResponse(e.response.data)) {
          switch (e.response.data.message) {
            case SendError.CREATE_ERROR: {
              helpers.setFieldError('account', 'Create new account problem');
              return;
            }
          }
        }
        ErrorReporting.captureError(e);
        helpers.setStatus('error');
      }
    },
    [history]
  );

  useEffect(() => {
    const request: CancelTokenSource | null = requestRef.current;
    return () => {
      request !== null && request.cancel();
    };
  }, [requestRef]);

  return handleSubmit;
}
