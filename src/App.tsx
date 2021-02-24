import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { TermsOfService } from './components/common/TermsOfService';
import { AuthPage } from './components/pages/AuthPage';
import { TeacherDash } from './components/pages/DashBoards/TeacherDashboard';
import { StudentDashboard } from './components/pages/StudentDashboard';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route path="/login" component={AuthPage} />
        <Route path="/tos" component={TermsOfService} />
        {/* Private Routes */}
        <Route path="/dashboard/teacher" component={TeacherDash} />
        <Route path="/dashboard/student" component={StudentDashboard} />
        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/homepage" />} />
      </Switch>
    </div>
  );
};

export default App;
