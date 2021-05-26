import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';

import PrivateRoute from '../../../ad-hocs/PrivateRoute';
import PublicRoute from '../../../ad-hocs/PublicRoute';
import useIsLoggedIn from '../../../hooks/useIsLoggedIn';
import Home from '../../pages/Home';
import NotFound from '../../pages/NotFound';
import SignIn from '../../pages/SignIn';

export default function Router() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from={'/'} to={'/signin'} />
        <PrivateRoute path={'/home'} component={Home} isLoggedIn={isLoggedIn} />
        <PublicRoute exact path={'/signin'} component={SignIn} fallback={'/home'} isLoggedIn={isLoggedIn} />
        <Route path={'*'} component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
