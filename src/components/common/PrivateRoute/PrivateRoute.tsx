import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { auth } from '../../../state';

const PrivateRoute = ({
  component: Component,
  ...rest
}: {
  component: React.ComponentType<RouteComponentProps>;
} & RouteProps): React.ReactElement => {
  const [isLogged, login] = useRecoilState(auth.isLoggedIn);

  useEffect(() => {
    login(undefined);
  }, [isLogged]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
