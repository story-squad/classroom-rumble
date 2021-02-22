import React from 'react';
import RenderChildDashboard from './RenderChildDashboard';
// Functional Component that stores state that may need to be passed into the Render Component

const ChildDashboardContainer = (): React.ReactElement => {
  return <RenderChildDashboard />;
};

export default ChildDashboardContainer;
