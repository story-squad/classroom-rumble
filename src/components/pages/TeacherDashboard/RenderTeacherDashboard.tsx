import React from 'react';
import { CreateNewSectionForm } from './CreateNewSectionForm';
import { TeacherSectionList } from './TeacherSectionList';

const RenderTeacherDashboard = (): React.ReactElement => {
  return (
    <div className="teacher-dashboard">
      <h1>Dashboard</h1>
      <TeacherSectionList />
      <CreateNewSectionForm />
    </div>
  );
};

export default RenderTeacherDashboard;
