import React from 'react';
import { SectionInfo, Toggle } from '../../../common';
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
        <Toggle
          options={['ALL RUMBLES', 'STUDENTS']}
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
