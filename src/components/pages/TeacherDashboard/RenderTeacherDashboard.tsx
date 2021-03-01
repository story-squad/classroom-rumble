import React from 'react';
import { CreateNewSectionForm } from './CreateNewSectionForm';
import { PromptQueueDisplay } from './PromptQueueDisplay';
import { RumbleList } from './RumbleList';
import { TeacherSectionList } from './TeacherSectionList';

const RenderTeacherDashboard = (): React.ReactElement => {
  return (
    <div className="teacher-dashboard">
      <h1>Dashboard</h1>
      <PromptQueueDisplay />
      <RumbleList />
      <TeacherSectionList />
      <CreateNewSectionForm />
    </div>
  );
};

export default RenderTeacherDashboard;
