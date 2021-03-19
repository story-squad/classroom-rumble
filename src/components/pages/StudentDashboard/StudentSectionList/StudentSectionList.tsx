import React from 'react';
import { Sections } from '../../../../api';
import StudentSection from './StudentSection';

const StudentSectionListContainer = ({
  sectionList,
}: IStudentSectionListContainerProps): React.ReactElement => {
  return (
    <div className="section-list-wrapper">
      <h1>YOUR SECTIONS</h1>
      <div className="section-list">
        {sectionList?.map((sec) => (
          <StudentSection {...sec} key={sec.id} />
        ))}
      </div>
    </div>
  );
};

interface IStudentSectionListContainerProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default StudentSectionListContainer;
