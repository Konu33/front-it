import React from 'react';
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';

/*
 * Blokuje wejście zalogowanym już userom na stronę chronioną tym ad-hoc'iem.
 */
export interface IPublicRouteProps extends RouteProps {
  component: any;
  path: any;
  // jeżeli user wbije na stronę publiczną, a jest zalogowany już, to wyrzuci go do strony `fallback`
  fallback: string;
  isLoggedIn: boolean;
}

export default function PublicRoute(props: IPublicRouteProps) {
  const {isLoggedIn, component: Component, fallback, location, ...restOfProps} = props;

  /**
   * Jest zalogowany i aktualna strona jest inna niż strona do której ma zostać przekierowany
   */
  if (isLoggedIn && location && location.pathname !== fallback)
    return <Route render={(props) => <Redirect {...props} to={{pathname: fallback}} />} {...restOfProps} />;

  return <Route render={(props) => <Component {...props} />} {...restOfProps} />;
}
