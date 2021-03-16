import React from 'react';
import { Link } from 'react-router-dom';

const RenderLandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <h1>Classroom Rumble</h1>
      <p>Welcome to Classroom Rumble!</p>
      <div className="login-button">
        <Link to="/login">Log In</Link>
      </div>
      <div className="signup-button">
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default RenderLandingPage;
