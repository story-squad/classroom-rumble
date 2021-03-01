import React from 'react';
import { CreateNewSectionForm } from './CreateNewSectionForm';
import { PromptQueueDisplay } from './PromptQueueDisplay';
import { TeacherRumbleList } from './TeacherRumbleList';
import { TeacherSectionList } from './TeacherSectionList';

const RenderTeacherDashboard = (): React.ReactElement => {
  return (
    <div className="teacher-dashboard">
      <h1>Dashboard</h1>
      <PromptQueueDisplay />
      <TeacherRumbleList />
      <TeacherSectionList />
      <CreateNewSectionForm />
    </div>
  );
};

export default RenderTeacherDashboard;
