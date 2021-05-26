import IUser, {Role} from '../../../../../../../models/IUser';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import ISortState, {OrderDirection} from '../../../../../../organisms/DataTable/types/ISortState';

export const defaultSortState: ISortState<IUser> = {orderBy: 'id', orderDirection: OrderDirection.DESC};

export const defaultFiltersState: IFiltersState<IUser> = {
  id: '',
  name: '',
  role: Role.ALL,
};
