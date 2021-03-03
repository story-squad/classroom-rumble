import React, { useState } from 'react';
import { Sections } from '../../../api';
import { CreateNewSection } from '../../pages/TeacherDashboard/CreateNewSection';
import Section from './SectionCard';

const RenderSectionList = ({
  sections,
  isTeacher,
}: ISectionListProps): React.ReactElement => {
  const [newSectionOpen, setNewSectionOpen] = useState(false);
  return (
    <>
      {isTeacher && (
        <CreateNewSection
          isVisible={newSectionOpen}
          setIsVisible={setNewSectionOpen}
        />
      )}
      <div className="section-list-wrapper">
        <h2>YOUR SECTIONS</h2>
        {isTeacher && (
          <button onClick={() => setNewSectionOpen(true)}>New Section</button>
        )}
        <div className="section-list">
          {sections?.map((sec) => (
            <Section {...sec} key={sec.id} />
          ))}
        </div>
      </div>
    </>
  );
};

interface ISectionListProps {
  sections: Sections.ISectionWithRumbles[];
  isTeacher?: boolean;
}

export default RenderSectionList;
