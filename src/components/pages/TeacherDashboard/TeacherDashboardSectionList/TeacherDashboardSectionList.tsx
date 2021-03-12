import React, { useState } from 'react';
import { Sections } from '../../../../api';
import { CreateNewSection } from './CreateNewSection';
import Section from './TeacherDashboardSectionCard';

const RenderTeacherDashboardSectionList = ({
  sections,
}: ITeacherDashboardSectionListProps): React.ReactElement => {
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  const openSectionModal = () => setNewSectionOpen(true);
  return (
    <>
      <CreateNewSection
        isVisible={newSectionOpen}
        setIsVisible={setNewSectionOpen}
      />
      <div className="teacher-dash-section-list-wrapper">
        <div className="teacher-dash-section-list-container">
          <h2>Classes</h2>
          <button onClick={openSectionModal}>Add Class</button>
          <div className="section-list">
            {sections?.map((sec) => (
              <Section {...sec} key={sec.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface ITeacherDashboardSectionListProps {
  sections: Sections.ISectionWithRumbles[];
  isTeacher?: boolean;
}

export default RenderTeacherDashboardSectionList;
