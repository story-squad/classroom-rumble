import { Button } from 'antd';
import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Redirect, Route, Switch } from 'react-router-dom';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <Button
        type="primary"
        style={{ margin: '1rem' }}
        icon={<AiFillHome />}
        size="large"
      >
        Some Button Text
      </Button>
      <Switch>
        {/* Public Routes */}
        {/* Private Routes */}
        {/* Fallback redirect to main app homepage! Change the 'to' property after setting up routes. */}
        <Route path="/" component={() => <Redirect to="/homepage" />} />
      </Switch>
    </div>
  );
};

export default App;
