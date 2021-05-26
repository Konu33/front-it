import {boolean, object, string} from 'yup';

import DirectAPI from '../../../mechanisms/DirectAPI';
import IUser, {validationSchema as userValidationSchema} from '../../../models/IUser';
import {IAuthContextValue, IAuthDataGuest, IAuthDataSignedIn} from '../types';
import {purgePersistentAuthData, savePersistentAuthData} from '../utils';

export interface IInvalidateOperation {
  (updateAuthData: IAuthContextValue[1]): Promise<void>;
}

interface IInvalidateOperationResponse {
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

function validateResponseData(responseData: unknown): asserts responseData is IInvalidateOperationResponse {
  validationSchema.validateSync(responseData);
}

/*
 * W argumentach jest wstrzykiwany `updateAuthData`,
 * żeby `AuthProvider` mógł korzystać z tej operacji samodzielnie.
 */
export default function useInvalidateOperation(updateAuthData: IAuthContextValue[1]): IInvalidateOperation {
  return async () => {
    /*
     * Ta sama mechanika działania, co przy logowaniu, tyle, że jeśli wcześniej
     * nie mieliśmy pól `user`, czy `lastInvalidation`, to teraz zostaną dodane.
     */
    try {
      const response = await DirectAPI.post('/authentication/invalidate');

      const data: unknown | IInvalidateOperationResponse = response.data;
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
    } catch (e: unknown) {
      DirectAPI.detachAuthorizationToken();
      purgePersistentAuthData();
      updateAuthData({status: 'GUEST'} as IAuthDataGuest);
    }
  };
}
