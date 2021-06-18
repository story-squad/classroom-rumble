import React, { useState } from 'react';
import { SectionInfo } from '../../../common';
import { InviteToSection } from '../InviteToSection';
import { SectionRumbleList } from './SectionRumbleList';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  sectionId,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
  // const [isStudentView, setIsStudentView] = useState(false);
  // const openStudentView = () => setIsStudentView(true);
  // const openRumbleView = () => setIsStudentView(false);

  return (
    <>
      <InviteToSection disableSectionPicker />
      <div className="teacher-view-section">
        <SectionInfo isTeacher sectionId={sectionId} />
        {/* <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            <h3
              onClick={openRumbleView}
              className={isStudentView ? '' : 'active'}
            >
              Rumbles
            </h3>
            <h3
              onClick={openStudentView}
              className={isStudentView ? 'active' : ''}
            >
              Students
            </h3>
          </div>
        </div>
        <SectionStudentList visible={isStudentView} />
        <SectionRumbleList visible={!isStudentView} /> */}
      </div>
    </>
  );
};

interface IRenderTeacherViewSectionProps {
  sectionId: number;
}

export default RenderTeacherViewSection;
