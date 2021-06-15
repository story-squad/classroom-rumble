import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { current } from '../../../../../state';
import { Button, Table } from '../../../../common';

const RumbleStudentCard = ({
  section,
  student,
}: IRumbleStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentStudent = useSetRecoilState(current.student);
  const setCurrentSub = useSetRecoilState(current.sub);

  const openSubmission = () => {
    setCurrentSection(section);
    setCurrentStudent(student);
    setCurrentSub(student.submissions[0]);
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: student.submissions[0],
    });
  };

  return (
    <Table.Row>
      <Table.Col>
        {student.firstname} {student.lastname}
      </Table.Col>
      <Table.Col>{student.lastname}</Table.Col>
      <Table.Col>{student.firstname}</Table.Col>
      <Table.Col className="status">
        {student.submissions.length > 0 ? (
          <Button type="text" onClick={openSubmission}>
            View submission
          </Button>
        ) : (
          'None'
        )}
      </Table.Col>
    </Table.Row>
  );
};

interface IRumbleStudentCardProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentCard;
