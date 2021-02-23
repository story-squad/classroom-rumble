import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  CookiePopup,
  PrivateRoute,
  ReadTokenData,
  SEO,
} from './components/common/';
import { AuthPage } from './components/pages/AuthPage';
import { CleverPage } from './components/pages/CleverPage';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <ReadTokenData />
      <SEO />
      <CookiePopup />
      <Switch>
        {/* Public Routes */}
        <Route path="/login" component={AuthPage} />

        {/* Private Routes */}
        <PrivateRoute
          path="/testroute"
          component={() => <TestComponent thing="something" />}
        />

        {/* Clever Routes */}
        <Route path="/oauth/clever/login" component={() => <></>} />
        <Route path="/oauth/clever/signup" component={() => <></>} />
        <Route path="/oauth/clever" component={CleverPage} />

        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/testroute" />} />
      </Switch>
    </div>
  );
};

const TestComponent = (props: { thing: string }): React.ReactElement => (
  <div>{props.thing}</div>
);

export default App;
