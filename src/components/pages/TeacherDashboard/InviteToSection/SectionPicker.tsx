import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sections } from '../../../../state';

const SectionPicker = (): React.ReactElement => {
  const sectionIds = useRecoilValue(sections.ids);

  return (
    <div className="section-picker">
      <div className="section-picker-list">
        {sectionIds?.map((id) => (
          <SectionPickerItem key={id} sectionId={id} />
        ))}
      </div>
    </div>
  );
};

const SectionPickerItem = ({
  sectionId,
}: {
  sectionId: number;
}): React.ReactElement => {
  const setCurrentSection = useSetRecoilState(sections.selected);
  const section = useRecoilValue(sections.getById(sectionId));

  return (
    <div
      key={section?.id}
      className="section-picker-item"
      onClick={() => setCurrentSection(section?.id)}
    >
      <label htmlFor={`class__${section?.id}`}>
        <input type="radio" id={`class__${section?.id}`} />
        {section?.name}
      </label>
    </div>
  );
};

export default SectionPicker;
