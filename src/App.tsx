import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  CookiePopup,
  Header,
  LandingPageWrapper,
  LoadUserData,
  LogoutPopup,
  PrivateRoute,
  SEO,
} from './components/common/';
import { TermsOfService } from './components/common/TermsOfService';
import { CleverRedirect } from './components/pages/CleverRedirect';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { StudentDashboard } from './components/pages/StudentDashboard';
import { TeacherDashboard } from './components/pages/TeacherDashboard';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <LoadUserData />
      <SEO />
      <CookiePopup />
      <LogoutPopup />
      <PrivateRoute component={Header} />
      <Switch>
        {/* Public Routes */}
        <Route
          exact
          path="/"
          component={() => (
            <LandingPageWrapper>
              <LandingPage />
            </LandingPageWrapper>
          )}
        />
        <Route
          path="/login"
          component={() => (
            <LandingPageWrapper>
              <LoginPage />
            </LandingPageWrapper>
          )}
        />
        <Route
          path="/signup"
          component={() => (
            <LandingPageWrapper>
              <SignupPage />
            </LandingPageWrapper>
          )}
        />
        <Route path="/tos" component={TermsOfService} />

        {/* OAuth Redirects */}
        <Route
          exact
          path="/oauth/clever"
          component={() => (
            <LandingPageWrapper>
              <CleverRedirect />
            </LandingPageWrapper>
          )}
        />

        {/* Private Routes */}
        <PrivateRoute path="/dashboard/teacher" component={TeacherDashboard} />
        <PrivateRoute path="/dashboard/student" component={StudentDashboard} />

        {/* Fallback Route */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
