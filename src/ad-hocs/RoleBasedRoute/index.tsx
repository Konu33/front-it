import React from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';

import {Role} from '../../models/IUser';

interface IRoleBasedRouteProps extends RouteProps {
  component: any;
  path: any;
  role?: Role;
  allowedRoles: Role[];
}

/*
 * Blokuje wejście userom z nieprawidłową rolą na stronę chronioną tym ad-hoc'iem.
 */
export default function RoleBasedRoute(props: IRoleBasedRouteProps) {
  const {role, allowedRoles, component: Component, ...restOfProps} = props;

  // Jeżeli rola znajduje się w tablicy dozwolonych ról to puść dalej..
  if (role && allowedRoles.includes(role)) {
    return <Route render={(props) => <Component {...props} />} {...restOfProps} />;
  }
  // w przeciwnym wypadku redirect na `/home`
  else {
    return <Route render={(props) => <Redirect {...props} to={'/home'} />} {...restOfProps} />;
  }
}
