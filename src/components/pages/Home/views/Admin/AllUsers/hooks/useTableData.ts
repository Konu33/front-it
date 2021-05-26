import {useMemo} from 'react';

import IUser from '../../../../../../../models/IUser';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import ISortState from '../../../../../../organisms/DataTable/types/ISortState';
import ITableData from '../../../../../../organisms/DataTable/types/ITableData';
import useFetchUsers from './useFetchUsers';

export default function useTableData(
  page: number,
  limit: number,
  sortState: ISortState<IUser>,
  filtersState: IFiltersState<IUser>
): ITableData<IUser> {
  const [usersStatus, usersPool] = useFetchUsers(page, limit, sortState, filtersState);

  return useMemo(
    () =>
      ({
        status: usersStatus,
        itemsPool: usersPool,
      } as ITableData<IUser>),
    [usersStatus, usersPool]
  );
}
