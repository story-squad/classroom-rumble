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
import { TermsOfService } from './components/common/TermsOfService';
import { CleverPage } from './components/pages/CleverPage';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
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
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/tos" component={TermsOfService} />

        {/* OAuth Redirects */}
        <Route exact path="/oauth/clever" component={CleverPage} />

        {/* Private Routes */}
        {/* Commenting these out until we have something built
        <PrivateRoute
          path="/dashboard/student"
          component={StudentDashboard}
          userType={Auth.Roles.user}
        />
        <PrivateRoute
          path="/dashboard/admin"
          component={AdminDashboard}
          userType={Auth.Roles.admin}
        /> */}
        {/* <PrivateRoute
          path="/dashboard/teacher"
          component={TeacherDashboard}
          userType={Auth.Roles.teacher}
        /> */}
        <PrivateRoute
          path="/"
          component={() => <TestComponent thing="something" />}
        />

        {/* Fallback Route */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

/**
 * The app falls back to display thsi component after login for now,
 * it will attempt to route to the corerct dashboard endpoint but if
 * it doesn't exist it will render this instead
 */
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
