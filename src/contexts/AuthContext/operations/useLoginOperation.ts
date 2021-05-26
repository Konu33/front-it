import {useContext} from 'react';
import {boolean, object, string} from 'yup';

import DirectAPI from '../../../mechanisms/DirectAPI';
import IUser, {validationSchema as userValidationSchema} from '../../../models/IUser';
import {AuthContext} from '../index';
import {IAuthContextValue, IAuthDataSignedIn, ICredentials} from '../types';
import {savePersistentAuthData} from '../utils';

export interface ILoginOperation {
  (credentials: ICredentials): Promise<void>;
}

interface ILoginOperationResponse {
  status: true;
  message: string;
  token: string;
  user_info: IUser;
}

const validationSchema = object().required().shape({
  status: boolean().required().isTrue(),
  message: string().required(),
  token: string().required(),
  user_info: userValidationSchema,
});

function validateResponseData(responseData: unknown): asserts responseData is ILoginOperationResponse {
  validationSchema.validateSync(responseData);
}

export default function useLoginOperation(): ILoginOperation {
  const [, updateAuthData]: IAuthContextValue = useContext(AuthContext);

  return async (credentials: ICredentials) => {
    const response = await DirectAPI.post('/authentication/login', {data: credentials});

    const data: unknown | ILoginOperationResponse = response.data;
    validateResponseData(data);

    const authData: IAuthDataSignedIn = {
      status: 'SIGNED-IN',
      token: data.token,
      user: data.user_info,
      lastInvalidation: Math.round(new Date().getTime() / 1000),
    };

    DirectAPI.attachAuthorizationToken(data.token);
    savePersistentAuthData(authData);
    updateAuthData(authData);
  };
}
