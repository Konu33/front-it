import {useMemo} from 'react';

import IUser from '../../../../../../../../models/IUser';
import IFormValues from '../types/IFormValues';

export default function useInitialValues(user: IUser): IFormValues {
  return useMemo(
    () => ({
      name: user.name,
      surname: user.surname,
    }),
    [user]
  );
}
