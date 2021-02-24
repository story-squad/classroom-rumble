import React from 'react';
import RenderStudentDashboard from './RenderStudentDashboard';
// Functional Component that stores state that may need to be passed into the Render Component

const StudentDashboardContainer = (): React.ReactElement => {
  return <RenderStudentDashboard />;
};

// TODO I believe I need an interface in order to pass props to `./RenderStudentDashboard`

export default StudentDashboardContainer;
