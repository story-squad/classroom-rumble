import React from 'react';
import { TeacherSectionList } from './TeacherSectionList';

const RenderTeacherDashboard = (): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Dashboard</h1>
      <TeacherSectionList />
    </div>
  );
};

export default RenderTeacherDashboard;
