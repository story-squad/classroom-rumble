import React from 'react';
import { Sections } from '../../../api';
import Section from './SectionCard';

const RenderSectionList = ({
  sections,
}: ISectionListProps): React.ReactElement => {
  return (
    <div className="section-list-wrapper">
      <h1>YOUR SECTIONS</h1>
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
}

export default RenderSectionList;
