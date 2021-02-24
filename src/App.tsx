import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  CookiePopup,
  LogoutPopup,
  ReadTokenData,
  SEO,
} from './components/common/';
import { TermsOfService } from './components/common/TermsOfService';
import { CleverPage } from './components/pages/CleverPage';
import { TeacherDashboard } from './components/pages/DashBoards/TeacherDashboard';
import { LandingPage } from './components/pages/LandingPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';
import { StudentDashboard } from './components/pages/StudentDashboard';

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
        <Route path="/dashboard/teacher" component={TeacherDashboard} />
        <Route path="/dashboard/student" component={StudentDashboard} />

        {/* Fallback Route */}
        <Route path="/" component={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
};

export default App;
