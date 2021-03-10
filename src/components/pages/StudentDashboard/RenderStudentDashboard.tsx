import React from 'react';
import { Rumbles, Sections } from '../../../api';
import { StudentRumbleList } from './StudentRumbleList';
import { StudentViewRumble } from './StudentViewRumble';
// Dislay Component for Students to view their sections
const RenderStudentDashboard = ({
  rumbleList,
}: // sectionList,
IRenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-dashboard">
      <h1>Your Dashboard</h1>
      <StudentRumbleList rumbleList={rumbleList} />
      {/* \/ \/ \/ ***THIS IS TEMP *** \/ \/ \/ */}
      <StudentViewRumble />
      {/* ^^^^^^^^^^^^ */}
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
  rumbleList: Rumbles.IRumbleWithSectionInfo[];
}

export default RenderStudentDashboard;
