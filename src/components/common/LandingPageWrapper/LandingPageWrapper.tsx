import React from 'react';

const LandingPageWrapper = ({
  children,
}: React.PropsWithChildren<unknown>): React.ReactElement => (
  <div className="landing-page-wrapper">
    <div className="splash">
      <div className="img-wrapper" />
    </div>
    <div className="content">{children}</div>
  </div>
);

export default LandingPageWrapper;
