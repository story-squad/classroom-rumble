import React from 'react';
import { Link } from 'react-router-dom';

const RenderLandingPage = (): React.ReactElement => {
  return (
    <div className="landing-page">
      <h1>Classroom Rumble</h1>
      <p>Welcome to Classroom Rumble!</p>
      <p>
        <Link to="/login">Click Here</Link> to log in!
      </p>
    </div>
  );
};

export default RenderLandingPage;
