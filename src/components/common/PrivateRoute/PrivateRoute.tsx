import React, { useMemo } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { auth } from '../../../state';
import { token } from '../../../utils';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<RouteComponentProps>;
} & RouteProps): React.ReactElement => {
  const isLogged = useRecoilValue(auth.isLoggedIn);
  const t = useMemo(() => token.get(), [isLogged]);

  return (
    <Route
      {...rest}
      render={(props) =>
        t ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
