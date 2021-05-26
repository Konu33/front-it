import {IAuthData} from '../contexts/AuthContext';
import IUser from '../models/IUser';
import useAuthData from './useAuthData';

export default function useUser(): IUser | null {
  const authData: IAuthData = useAuthData();
  return authData.status === 'SIGNED-IN' && authData.user ? authData.user : null;
}
