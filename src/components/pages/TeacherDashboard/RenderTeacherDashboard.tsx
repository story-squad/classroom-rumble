import React from 'react';
import NewSection from './CreateNewSectionForm/CreateNewSectionForm';

const RenderTeacherDash = (): React.ReactElement => {
  return (
    <div>
      {/* displaying this way just to see needs to be a button */}
      <NewSection />
    </div>
  );
};
// Is the button a modal popup on the teacher dash?
export default RenderTeacherDash;
