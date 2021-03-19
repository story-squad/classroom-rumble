import React from 'react';
import { Sections } from '../../../api';
import { Loader } from '../../common';
import { StudentDashboardRumbleList } from './StudentDashboardRumbleList';
import { StudentSectionList } from './StudentSectionList';

// Dislay Component for Students to view their sections
const RenderStudentDashboard = ({
  sectionList,
}: IRenderStudentDashboardProps): React.ReactElement => {
  return (
    <div className="student-dashboard">
      {sectionList ? (
        <>
          <StudentDashboardRumbleList sections={sectionList} />
          <StudentSectionList sectionList={sectionList} />
        </>
      ) : (
        <Loader message="Loading sections" />
      )}
    </div>
  );
};

interface IRenderStudentDashboardProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default RenderStudentDashboard;
