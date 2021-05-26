import {useContext} from 'react';
import {boolean, object, string} from 'yup';

import UnauthorizedException from '../../../exceptions/UnauthorizedException';
import DirectAPI from '../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../mechanisms/ErrorReporting';
import {AuthContext} from '../index';
import {IAuthContextValue, IAuthDataGuest} from '../types';
import {purgePersistentAuthData} from '../utils';

export interface ILogoutOperation {
  (): Promise<void>;
}

interface ILogoutOperationResponse {
  status: true;
  message: string;
}

const validationSchema = object().required().shape({
  status: boolean().required().isTrue(),
  message: string().required(),
});

function validateResponseData(responseData: unknown): asserts responseData is ILogoutOperationResponse {
  validationSchema.validateSync(responseData);
}

export default function useLogoutOperation(): ILogoutOperation {
  const [authData, updateAuthData]: IAuthContextValue = useContext(AuthContext);

  return async () => {
    try {
      const response = await DirectAPI.post('/authentication/logout');
      const data: unknown | ILogoutOperationResponse = response.data;
      validateResponseData(data);

      DirectAPI.detachAuthorizationToken();
      purgePersistentAuthData();
      updateAuthData({status: 'GUEST'} as IAuthDataGuest);
    } catch (e: unknown) {
      /*
       * Robimy captureError, tylko wtedy, jeśli to jest faktycznie niespodziewany error.
       * Jeżeli dostaliśmy z API `403 Unauthroized`, a do tej pory nie było żadnej inwalidacji to DirectAPI
       * wyrzuci `UnauthorizedException` i jest to przewidzina sytuacja zgodnie z planem.
       */
      if (
        !(
          e instanceof UnauthorizedException &&
          authData.status === 'SIGNED-IN' &&
          authData.lastInvalidation === undefined
        )
      )
        ErrorReporting.captureError(e);

      /*
       * Nie ważne, czy request się udał, czy nie - wylogowujemy "na siłę".
       */
      DirectAPI.detachAuthorizationToken();
      purgePersistentAuthData();
      updateAuthData({status: 'GUEST'});
    }
  };
}
