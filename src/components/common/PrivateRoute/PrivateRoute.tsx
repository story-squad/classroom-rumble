import React, { useMemo } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Auth } from '../../../api';
import { auth } from '../../../state';
import { token } from '../../../utils';

/**
 * The `PrivateRoute` component requires a user to be logged in to access
 * a route. The route can be restricted by user roles by passing in a
 * `userTypes` prop.
 *
 * You can control which users have access by passing a list of authorized
 * roles to the `userTypes` prop. I recomment using the `Roles` enum that's
 * exported from the `Auth` api module as follows:
 *
 * ```ts
 * userTypes={[Auth.Roles.user, Auth.Roles.admin]}
 * ```
 *
 * `user`: able to be accessed by students\
 * `teacher`: able to be accessed by teachers\
 * `admin`: able to be accessed by admins
 *
 * > Note: Admins are configured to have access to every resource and do not
 */
const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRouteProps): React.ReactElement => {
  const isLogged = useRecoilValue(auth.isLoggedIn);
  const canAccess = useMemo(() => {
    // User CAN'T access if they're not logged in (no token stored)
    const tokenFromLocalStorage = token.get();
    if (!tokenFromLocalStorage) return false;

    // User CAN access if route is unrestricted by type
    if (rest.userType === undefined) return true;

    // Otherwise, user must be admin OR match given type
    const type = token.getUser()?.roleId;
    return type === Auth.Roles.admin || rest.userType === type;
  }, [isLogged]);

  return (
    <Route
      {...rest}
      render={(props) =>
        canAccess ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps>;
  userType?: Auth.Roles & number;
}

export default PrivateRoute;
