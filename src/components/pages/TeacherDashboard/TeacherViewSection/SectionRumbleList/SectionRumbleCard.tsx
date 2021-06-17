import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useRumbleStatus } from '../../../../../hooks';
import { rumbles, sections, students } from '../../../../../state';
import { Button, Loader, Table } from '../../../../common';

const SectionRumbleCard = ({
  rumbleId,
}: ISectionRumbleCardProps): React.ReactElement => {
  const { push } = useHistory();
  const rumble = useRecoilValue(rumbles.getById(rumbleId));
  const section = useRecoilValue(sections.current);
  const setCurrentRumble = useSetRecoilState(rumbles.current);
  const clearCurrentStudent = useResetRecoilState(students.selected);

  const [date, weekday] = useFormatDate(`${rumble?.end_time || ''}`);
  const [status] = useRumbleStatus(rumble);

  const openRumble = () => {
    setCurrentRumble(rumble);
    clearCurrentStudent();
    push('/dashboard/teacher/rumble', { rumble, section });
  };

  return rumble ? (
    <Table.Row>
      <Table.Col>{rumble.phase !== 'INACTIVE' ? `${date}` : 'N/A'}</Table.Col>
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
  ) : (
    <Loader message="Loading rumble" />
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
  rumbleId: number;
}

export default SectionRumbleCard;
