import IUser from '../../models/IUser';

export interface ICredentials {
  email: string;
  password: string;
}

export interface IAuthDataSignedIn {
  status: 'SIGNED-IN';
  /*
   * Token autoryzacji
   */
  token: string;
  /**
   * To pole będzie puste, jeżeli mamy token, ale nie zweryfikowany (nie został jeszcze zwalidowany).
   * Pole `lastInvalidation` również będzie puste.
   */
  user?: IUser;
  /*
   * Epoch Unix Timestamp
   * To pole jest `undefined`, jeżeli nie dokonano do tej pory żadnej invalidacji.
   * Pole `user` również będzie puste.
   */
  lastInvalidation?: number;
}
export interface IAuthDataGuest {
  status: 'GUEST';
}
export type IAuthData = IAuthDataSignedIn | IAuthDataGuest;
export type UpdatableAuthData =
  | (Pick<IAuthDataSignedIn, 'status'> & Partial<Omit<IAuthDataSignedIn, 'status'>>)
  | IAuthDataGuest;
export type IAuthContextValue = [authData: IAuthData, updateAuthData: (newAuthData: UpdatableAuthData) => void];
export type IPersistentAuthData = Pick<IAuthDataSignedIn, 'token'>;
