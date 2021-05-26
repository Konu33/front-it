import {useCallback, useEffect, useState} from 'react';

import DirectAPI from '../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../mechanisms/ErrorReporting';
import IUser from '../../../../models/IUser';
import {IResponse, validateResponse} from '../misc/use-fetch-users-utils';

export default function useFetchUsers() {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await DirectAPI.get<IResponse | unknown>('/users?role=MOD,ADMIN');
      const data: unknown | IResponse = response.data;
      validateResponse(data);
      setUsers(data.users);
    } catch (e) {
      ErrorReporting.captureError(e);
    }
  }, []);

  //Fetch users
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return users;
}
