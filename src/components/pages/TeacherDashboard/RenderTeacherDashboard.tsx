import React from 'react';
import { CreateNewSectionForm } from './CreateNewSectionForm';
import { TeacherSectionList } from './TeacherSectionList';

const RenderTeacherDash = (): React.ReactElement => {
  return (
    <div>
      {/* displaying this way just to see needs to be a button */}
      <TeacherSectionList />
      <CreateNewSectionForm />
    </div>
  );
};
// Is the button a modal popup on the teacher dash?
export default RenderTeacherDash;
