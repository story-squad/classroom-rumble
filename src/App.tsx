import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CookiePopup, ReadTokenData, SEO } from './components/common/';
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

        {/* Clever Routes */}
        <Route path="/oauth/clever/login" component={() => <></>} />
        <Route path="/oauth/clever/signup" component={() => <></>} />
        <Route path="/oauth/clever" component={CleverPage} />

        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/homepage" />} />
      </Switch>
    </div>
  );
};

export default App;
