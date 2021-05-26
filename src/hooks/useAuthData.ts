import {useContext} from 'react';

import {AuthContext, IAuthData} from '../contexts/AuthContext';

export default function useAuthData(): IAuthData {
  return useContext(AuthContext)[0];
}
