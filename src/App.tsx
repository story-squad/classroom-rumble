import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  CookiePopup,
  LogoutPopup,
  PrivateRoute,
  ReadTokenData,
  SEO,
} from './components/common/';
import { AuthPage } from './components/pages/AuthPage';
import { CleverPage } from './components/pages/CleverPage';
import { auth } from './state';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <ReadTokenData />
      <SEO />
      <CookiePopup />
      <LogoutPopup />
      <Switch>
        {/* Public Routes */}
        <Route exact path="/login" component={AuthPage} />

        {/* Private Routes */}
        <PrivateRoute
          path="/test"
          component={() => <TestComponent thing="something" />}
        />

        {/* Clever Routes */}
        <Route exact path="/oauth/clever" component={CleverPage} />
        <Route exact path="/oauth/clever/login" component={() => <></>} />
        <Route exact path="/oauth/clever/signup" component={() => <></>} />

        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/test" />} />
      </Switch>
    </div>
  );
};

const TestComponent = (props: { thing: string }): React.ReactElement => {
  const setLogoutOpen = useSetRecoilState(auth.logoutModalOpen);
  return (
    <div>
      <p>{props.thing}</p>
      <button onClick={() => setLogoutOpen(true)}>Log Out</button>
    </div>
  );
};

export default App;
