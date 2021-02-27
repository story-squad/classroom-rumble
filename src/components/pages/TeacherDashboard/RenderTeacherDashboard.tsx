import React from 'react';
import { TeacherSectionList } from './TeacherSectionList';
import { CreateNewSectionForm } from './CreateNewSectionForm';

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