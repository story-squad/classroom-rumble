import React from 'react';
import { Sections } from '../../../../api';

const SectionPicker = ({
  sectionList,
  setCurrentSection,
}: ISectionPickerProps): React.ReactElement => (
  <div className="section-picker">
    <div className="section-picker-list">
      {sectionList.map((sec) => (
        <div
          key={sec.id}
          className="section-picker-item"
          onClick={() => setCurrentSection(sec)}
        >
          {sec.name}
        </div>
      ))}
    </div>
  </div>
);

interface ISectionPickerProps {
  sectionList: Sections.ISectionWithRumbles[];
  setCurrentSection: (section: Sections.ISectionWithRumbles) => void;
}

export default SectionPicker;
