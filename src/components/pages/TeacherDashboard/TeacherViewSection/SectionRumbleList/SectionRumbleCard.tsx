import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Rumbles, Sections } from '../../../../../api';
import { useRumbleStatus } from '../../../../../hooks';
import { current } from '../../../../../state';
import { Button, Table } from '../../../../common';

const SectionRumbleCard = ({
  section,
  rumble,
  endTime,
}: ISectionRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentRumble = useSetRecoilState(current.rumble);
  const clearCurrentStudent = useResetRecoilState(current.student);

  const [date, weekday] = useFormatDate(`${endTime || ''}`);
  const [status] = useRumbleStatus(rumble.phase);

  const openRumble = () => {
    setCurrentSection(section);
    setCurrentRumble(rumble);
    clearCurrentStudent();
    push('/dashboard/teacher/rumble', { rumble, section });
  };

  return (
    <div>
      <div>
        <Table.Row>
          <Table.Col>
            {rumble.phase !== 'INACTIVE' ? <>{date}</> : <p>N/A</p>}
          </Table.Col>
          <Table.Col>
            {status !== 'Complete' ? (
              <div>{rumble.phase} </div>
            ) : (
              <div className="weekday">{weekday}</div>
            )}
          </Table.Col>
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

const useFormatDate = (
  date: string | undefined,
): [date: string | undefined, weekday: string | undefined] => {
  const luxonDate = useMemo(() => DateTime.fromISO(date || ''), [date]);

  return luxonDate.isValid
    ? [
        luxonDate.toLocaleString(DateTime.DATE_SHORT),
        luxonDate.toLocaleString({ weekday: 'long' }),
      ]
    : [undefined, undefined];
};

interface ISectionRumbleCardProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
  endTime?: Date;
}

export default SectionRumbleCard;
