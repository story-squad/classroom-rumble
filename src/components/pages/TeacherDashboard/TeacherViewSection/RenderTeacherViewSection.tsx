import React, { useState } from 'react';
import { Sections } from '../../../../api';
import { InviteToSection } from '../InviteToSection';
import { TeacherDashboardRumbleList } from '../TeacherDashboardRumbleList';
import { TeacherSectionInfo } from '../TeacherSectionInfo';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  section,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
  const [isStudentView, setIsStudentView] = useState(false);
  const openStudentView = () => setIsStudentView(true);
  const openRumbleView = () => setIsStudentView(false);
  return (
    <>
      <InviteToSection disableSectionPicker />
      <div className="teacher-view-section">
        <TeacherSectionInfo section={section} />
        <div className="section-content-switcher-wrapper">
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
        <SectionStudentList visible={isStudentView} section={section} />
        <TeacherDashboardRumbleList
          visible={!isStudentView}
          sections={[section]}
        />
      </div>
    </>
  );
};

interface IRenderTeacherViewSectionProps {
  section: Sections.ISectionWithRumbles;
}

export default RenderTeacherViewSection;
