import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthPage } from './components/pages/AuthPage';
import { ChildDashboard } from './components/pages/ChildDashboard';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Switch>
        {/* Public Routes */}
        <Route path="/login" component={AuthPage} />
        {/* Private Routes */}
        <Route path="/dashboard/student" component={ChildDashboard} />
        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/homepage" />} />
      </Switch>
    </div>
  );
};

export default App;
