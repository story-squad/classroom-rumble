import React from 'react';
import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../api';
import { current } from '../../../../state';

const StudentRumble = ({
  section,
  rumble,
}: IStudentDashboardRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);
  const openCurrentRumble = () => {
    setCurrentRumble(rumble);
    setCurrentSection(section);
    push('/dashboard/student/rumble', { section, rumble });
  };
  return (
    <div className="student-rumble-card" onClick={openCurrentRumble}>
      <h3>{rumble.sectionName}</h3>
      <p>ID: {rumble.id}</p>
      <p>SectionId: {rumble.sectionId}</p>
      <p>PromptID: {rumble.promptId}</p>
      <p>This rumble is {rumble.numMinutes} minutes long!</p>
    </div>
  );
};

interface IStudentDashboardRumbleCardProps {
  section: Sections.ISectionWithRumbles;
  rumble: Rumbles.IRumbleWithSectionInfo;
}
export default StudentRumble;
