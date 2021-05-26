import {IAuthData} from '../contexts/AuthContext';
import useAuthData from './useAuthData';

export default function useIsLoggedIn(): boolean {
  const authData: IAuthData = useAuthData();
  return authData.status === 'SIGNED-IN';
}
