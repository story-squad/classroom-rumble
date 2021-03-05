import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useRecoilValue } from 'recoil';
import { Rumbles } from '../../../api';
import { current } from '../../../state';

const TeacherRumble = ({
  numMinutes,
  sectionName,
  id,
  promptId,
  sectionId,
  ...rumbleInfo
}: Rumbles.IRumbleWithSectionInfo): React.ReactElement => {
  const { push } = useHistory();
  const currentSection = useRecoilValue(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);

  const openCurrentRumble = () => {
    const currentRumble = {
      numMinutes,
      sectionName,
      id,
      promptId,
      sectionId,
      ...rumbleInfo,
    };
    setCurrentRumble(currentRumble);
    push('/dashboard/teacher/rumble', {
      section: currentSection,
      rumble: currentRumble,
    });
  };

  return (
    <div className="rumble-card" onClick={openCurrentRumble}>
      <h3>{sectionName}</h3>
      <p>ID: {id}</p>
      <p>SectionId: {sectionId}</p>
      <p>PromptID: {promptId}</p>
      <p>This rumble is {numMinutes} minutes long!</p>
    </div>
  );
};

export default TeacherRumble;
