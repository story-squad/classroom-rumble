import React from 'react';
import { Sections } from '../../../api';
import Section from './SectionCard';

const RenderSectionList = ({
  sections,
  openNewSectionForm,
}: ISectionListProps): React.ReactElement => {
  return (
    <div className="section-list-wrapper">
      <h2>YOUR SECTIONS</h2>
      {openNewSectionForm && (
        <button onClick={() => openNewSectionForm(true)}>New Section</button>
      )}
      <div className="section-list">
        {sections?.map((sec) => (
          <Section {...sec} key={sec.id} />
        ))}
      </div>
    </div>
  );
};

interface ISectionListProps {
  sections: Sections.ISectionWithRumbles[];
  openNewSectionForm?: (arg: boolean) => void;
}

export default RenderSectionList;
