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
      key={sectionId}
      className="section-picker-item"
      onClick={() => setCurrentSection(sectionId)}
    >
      {section?.name}
    </div>
  );
};

export default SectionPicker;
