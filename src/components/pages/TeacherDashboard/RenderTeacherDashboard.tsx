import React from 'react';
import { CreateNewRumbleForm } from './CreateNewRumbleForm';
import { CreateNewSectionForm } from './CreateNewSectionForm';
import { CustomPromptForm } from './CustomPromptForm';
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
      <CustomPromptForm />
      <CreateNewRumbleForm />
    </div>
  );
};

export default RenderTeacherDashboard;
