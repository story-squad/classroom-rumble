import React from 'react';
import { RenderToggle, SectionInfo } from '../../../common';
import { InviteToSection } from '../InviteToSection';
import { SectionRumbleList } from './SectionRumbleList';
import { SectionStudentList } from './SectionStudentList';

const RenderTeacherViewSection = ({
  sectionId,
}: IRenderTeacherViewSectionProps): React.ReactElement => {
  return (
    <>
      <InviteToSection disableSectionPicker />
      <div className="teacher-view-section">
        <SectionInfo isTeacher sectionId={sectionId} />
        <RenderToggle
          options={[{ text: 'ALL RUMBLES' }, { text: 'STUDENTS' }]}
          renderFirst={SectionRumbleList}
          renderSecond={SectionStudentList}
        />
      </div>
    </>
  );
};

interface IRenderTeacherViewSectionProps {
  sectionId: number;
}

export default RenderTeacherViewSection;
