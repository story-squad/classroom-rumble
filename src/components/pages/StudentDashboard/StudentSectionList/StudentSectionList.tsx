import React from 'react';
import { useRecoilValue } from 'recoil';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import { sections } from '../../../../state';
import StudentSection from './StudentSection';

const StudentSectionListContainer = (): React.ReactElement => {
  const sectionIds = useRecoilValue(sections.ids);
  return (
    <div className="student-dash-section-list-wrapper">
      <div className="student-dash-section-list-container">
        <h2>Classes</h2>
        {sectionIds && sectionIds.length <= 0 ? (
          <div className="no-sections">
            <div className="message-text-container">
              <p>You don&apos;t have any classes yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current classes" />
          </div>
        ) : (
          <div className="section-list">
            {sectionIds?.map((id) => (
              <StudentSection key={id} sectionId={id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSectionListContainer;
