import Chip from '@material-ui/core/Chip';

import IUser, {allUserRoles, userRoleColorMap} from '../../../../../../../models/IUser';
import UserAvatar from '../../../../../../atoms/UserAvatar';
import IColumn from '../../../../../../organisms/DataTable/types/IColumn';

const columns: IColumn<IUser>[] = [
  {
    id: 'id',
    label: 'ID',
    width: 60,
    align: 'left',
    sortable: true,
    filterable: {type: 'numeric'},
  },
  {
    id: 'name',
    label: 'Name',
    filterable: {type: 'text'},
    sortable: true,
    format: (user: IUser) => (
      <div style={{display: 'flex', flexFlow: 'row nowrap', alignItems: 'center'}}>
        <UserAvatar user={user} style={{marginRight: 16}} />
        {`${user.name} ${user.surname}`}
      </div>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    filterable: {type: 'text'},
    sortable: true,
  },
  {
    id: 'role',
    label: 'Role',
    width: 160,
    sortable: true,
    filterable: {type: 'select', values: allUserRoles},
    format: (user: IUser) => (
      <Chip
        variant={'default'}
        size={'small'}
        label={user.role}
        style={{
          width: '100%',
          cursor: 'inherit',
          backgroundColor: userRoleColorMap.get(user.role),
          color: 'white',
        }}
      />
    ),
  },
];

export default columns;
