import {createContext, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';

import DirectAPI from '../../mechanisms/DirectAPI';
import useInvalidateOperation from './operations/useInvalidateOperation';
import {IAuthContextValue, IAuthData, UpdatableAuthData} from './types';
import * as utils from './utils';

export * from './types';

// Specjalnie tutaj są jakieś dane wstawione na start, żeby typescript nie krzyczał potem, że jest null
const initialAuthData = utils.generateInitialAuthData();
const defaultContextValue: IAuthContextValue = [
  initialAuthData,
  () => console.warn('AuthContext is not initialized yet!'),
];
export const AuthContext = createContext<IAuthContextValue>(defaultContextValue);

export const AuthProvider = function (props: {children: ReactNode}) {
  const {children} = props;
  const [authData, setAuthData] = useState<IAuthData>(initialAuthData);

  const updateAuthData = useCallback(
    (newAuthData: UpdatableAuthData) => {
      if (newAuthData.status === 'GUEST') setAuthData(newAuthData);
      else setAuthData({...authData, ...newAuthData} as IAuthData);
    },
    [authData, setAuthData]
  );

  const invalidationOperation = useInvalidateOperation(updateAuthData);

  useEffect(() => {
    if (authData.status === 'SIGNED-IN' && !DirectAPI.isAuthorizationTokenAttached()) {
      DirectAPI.attachAuthorizationToken(authData.token);
    }
  }, [authData]);

  /*
   * Sprawdzenia tokenu i pobrania aktualnych danych usera.
   * Robimy invalidacje od razu po wejściu do dashboardu **bezpośrednio**.
   * Jeśli będziemy przechodzili przez stronę logowania, to pole `lastInvalidation` będzie
   * miało wartość i invalidacja się nie odpali.
   */
  useEffect(() => {
    if (authData.status === 'SIGNED-IN' && authData.lastInvalidation === undefined)
      invalidationOperation(updateAuthData);
  }, [authData, updateAuthData, invalidationOperation]);

  const contextValue: IAuthContextValue = useMemo(() => [authData, updateAuthData], [authData, updateAuthData]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
