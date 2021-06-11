import React from 'react';
import { useHistory } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../../api';
import { useRumbleStatus } from '../../../../../hooks';
import { current } from '../../../../../state';
import { Button, Table } from '../../../../common';

const SectionRumbleCard = ({
  section,
  rumble,
}: ISectionRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);
  const clearCurrentStudent = useResetRecoilState(current.student);

  const openRumble = () => {
    setCurrentSection(section);
    setCurrentRumble(rumble);
    clearCurrentStudent();
    push('/dashboard/teacher/rumble', { rumble, section });
  };

  //Setting date and day of the week
  const newDate = new Date(rumble.end_time);
  const newYear = newDate.getFullYear();
  const newDay = newDate.getDate();
  const newMonth = newDate.getMonth();

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfTheWeek = days[newDate.getDay()];
  //

  const [status] = useRumbleStatus(rumble.phase);

  return (
    <div>
      <div>
        <Table.Row>
          <Table.Col>
            {newMonth + 1}/{newDay}/{newYear}
          </Table.Col>
          {status !== 'Complete' && <Table.Col>{rumble.phase}</Table.Col>}
          {status === 'Complete' && <Table.Col>{dayOfTheWeek}</Table.Col>}
          {/* <Table.Col>{rumble.id}</Table.Col> */}
          <Table.Col className="status">
            <Button type="text" onClick={openRumble}>
              Open
            </Button>
          </Table.Col>
        </Table.Row>
      </div>
    </div>
  );
};

interface ISectionRumbleCardProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
}

export default SectionRumbleCard;
