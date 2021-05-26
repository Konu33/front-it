import collect from 'collect.js';
import {object, string} from 'yup';

import ErrorReporting from '../../mechanisms/ErrorReporting';
import LocalStorage from '../../mechanisms/LocalStorage';
import {IAuthData, IAuthDataSignedIn, IPersistentAuthData} from './types';

const LOCAL_STORAGE_AUTH_DATA_KEY = 'auth-data';
const persistentAuthDataValidationSchema = object().required().nullable(false).shape({
  token: string().required(),
});

function validatePersistentAuthData(obj: unknown): asserts obj is {token: string} {
  persistentAuthDataValidationSchema.validateSync(obj, {strict: true, stripUnknown: true});
}

export function retrievePersistentAuthData(): IPersistentAuthData | null {
  if (!LocalStorage.isItemSet(LOCAL_STORAGE_AUTH_DATA_KEY)) return null;

  let authData: null | {token: string} = LocalStorage.getJsonItem(LOCAL_STORAGE_AUTH_DATA_KEY);

  if (authData === null) return null;

  try {
    validatePersistentAuthData(authData);
    return authData;
  } catch (e: unknown) {
    ErrorReporting.emitWarn('Auth-data found in local-storage was corrupted. Persistent auth data will be purged.');
    purgePersistentAuthData();
    return null;
  }
}

export function transformAuthDataToPersistent(authData: IAuthData): IPersistentAuthData | null {
  return authData.status === 'SIGNED-IN'
    ? ((collect<IAuthDataSignedIn>(authData).only(['token']).all() as object) as IPersistentAuthData)
    : null;
}

export function savePersistentAuthData(authData: IAuthData): void {
  LocalStorage.setJsonItem(LOCAL_STORAGE_AUTH_DATA_KEY, transformAuthDataToPersistent(authData));
}

export function purgePersistentAuthData(): void {
  LocalStorage.unsetItem(LOCAL_STORAGE_AUTH_DATA_KEY);
}

export function generateInitialAuthData(): IAuthData {
  const persistentAuthData = retrievePersistentAuthData();
  return persistentAuthData ? {status: 'SIGNED-IN', ...persistentAuthData} : {status: 'GUEST'};
}
