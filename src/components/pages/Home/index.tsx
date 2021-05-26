import React, {memo} from 'react';
import {Route, Switch} from 'react-router-dom';

import RoleBasedRoute from '../../../ad-hocs/RoleBasedRoute';
import {IAuthData} from '../../../contexts/AuthContext';
import {LoadingBarProvider} from '../../../contexts/LoadingBarContext';
import useAuthData from '../../../hooks/useAuthData';
import IUser, {Role} from '../../../models/IUser';
import LoadingBar from '../../atoms/LoadingBar';
import Dashboard from '../../layouts/Dashboard';
import AddTicket from '../Home/views/AddTicket/index';
import AddNewUser from './views/Admin/AddNewUser';
import AllUsers from './views/Admin/AllUsers';
import EditTicket from './views/EditTicket';
import AllTickets from './views/Mod/AllTickets';
import MyAccount from './views/MyAccount';
import SingleTicket from './views/SingleTicket';
import SingleUser from './views/SingleUser';
import UserTickets from './views/UserTickets';
import Welcome from './views/Welcome';

const MODERATION_ROLES = [Role.MOD, Role.ADMIN];
const ADMIN_ROLE = [Role.ADMIN];

function Home() {
  const authData: IAuthData = useAuthData();
  const user: IUser | null = authData.status === 'SIGNED-IN' && authData.user ? authData.user : null;
  const lastInvalidation: number | undefined = authData.status === 'SIGNED-IN' ? authData.lastInvalidation : undefined;

  return (
    <LoadingBarProvider>
      <Dashboard>
        <Switch>
          <Route exact path={'/home/my-account'} component={MyAccount} />
          <Route exact path={'/home/my-tickets'} component={UserTickets} />
          <Route exact path={'/home/add-ticket'} component={AddTicket} />
          <Route exact path={'/home/tickets/:id/edit'} component={EditTicket} />
          <Route exact path={'/home/tickets/:id'} component={SingleTicket} />
          <RoleBasedRoute
            allowedRoles={MODERATION_ROLES}
            role={user?.role}
            exact
            path={'/home/mod/tickets'}
            component={AllTickets}
          />
          <RoleBasedRoute
            allowedRoles={ADMIN_ROLE}
            role={user?.role}
            exact
            path={'/home/admin/users'}
            component={AllUsers}
          />
          <RoleBasedRoute
            allowedRoles={MODERATION_ROLES}
            role={user?.role}
            exact
            path={'/home/users/:id'}
            component={SingleUser}
          />
          <RoleBasedRoute
            allowedRoles={ADMIN_ROLE}
            role={user?.role}
            exact
            path={'/home/admin/users/add-new'}
            component={AddNewUser}
          />
          <Route path={'*'} component={Welcome} />
        </Switch>
      </Dashboard>
      {!lastInvalidation && <LoadingBar />}
    </LoadingBarProvider>
  );
}

export default memo(Home);
