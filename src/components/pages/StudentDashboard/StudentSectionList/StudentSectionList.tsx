import React from 'react';
import { Sections } from '../../../../api';
import StudentSection from './StudentSection';

const StudentSectionListContainer = ({
  sectionList,
}: IStudentSectionListContainerProps): React.ReactElement => {
  return (
    <div className="student-dash-section-list-wrapper">
      <div className="student-dash-section-list-container">
        <h2>Classes</h2>
        <div className="section-list">
          {sectionList?.map((sec) => (
            <StudentSection {...sec} key={sec.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface IStudentSectionListContainerProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default StudentSectionListContainer;
