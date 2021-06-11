import React from 'react';
import { Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import StudentSection from './StudentSection';

const StudentSectionListContainer = ({
  sectionList,
}: IStudentSectionListContainerProps): React.ReactElement => {
  return (
    <div className="student-dash-section-list-wrapper">
      <div className="student-dash-section-list-container">
        <h2>Classes</h2>
        {sectionList.length <= 0 ? (
          <div className="no-sections">
            <div className="message-text-container">
              <p>You don&apos;t have any classes yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current classes" />
          </div>
        ) : (
          <div className="section-list">
            {sectionList?.map((sec) => (
              <StudentSection {...sec} key={sec.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface IStudentSectionListContainerProps {
  sectionList: Sections.ISectionWithRumbles[];
}

export default StudentSectionListContainer;
