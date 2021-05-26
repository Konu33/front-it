import {Location} from 'history';
import React from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';

interface IPrivateRouteProps extends Omit<RouteProps, 'location'> {
  location?: Location<{from?: string} | undefined>;
  component: any;
  path: any;
  isLoggedIn: boolean;
}

/*
 * Blokuje wejście niezalogowanym userom na stronę chronioną tym ad-hoc'iem.
 */
export default function PrivateRoute(props: IPrivateRouteProps) {
  const {isLoggedIn, component: Component, location, ...restOfProps} = props;

  // Jest zalogowany, ale miał wcześniej ustawiony "redirect po zalogowaniu"
  if (isLoggedIn && location && location.state && location.state.from) {
    return (
      <Route
        render={(props) => <Redirect {...props} to={{pathname: location?.state?.from, state: {from: undefined}}} />}
        {...restOfProps}
      />
    );
  }
  // Nie jest zalogowany i znajduje się na innej stronie niż /signin
  else if (!isLoggedIn && location && location.pathname !== '/signin') {
    return (
      <Route
        render={(props) => <Redirect {...props} to={{pathname: '/signin', state: {from: props.location}}} />}
        {...restOfProps}
      />
    );
  } else {
    /*
     * Wszystkie inne przypadki, w tym:
     * * Jest zalogowany i nie ma ustawionego "redirectu po zalogowaniu"
     * * Nie jest zalogowany, ale jest na stronie /signin więc nie ma gdzie indziej go przekierować (edge-case)
     */
    return <Route render={(props) => <Component {...props} />} {...restOfProps} />;
  }
}
