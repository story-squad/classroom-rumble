import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Sections } from '../../../../../api';
import { sections, students, submissions } from '../../../../../state';
import { Button, Table } from '../../../../common';

const RumbleStudentCard = ({
  section,
  studentId,
}: IRumbleStudentCardProps): React.ReactElement => {
  const { push } = useHistory();

  const student = useRecoilValue(students.getById(studentId));

  const setCurrentSection = useSetRecoilState(sections.selected);
  const setCurrentStudent = useSetRecoilState(students.selected);
  const setCurrentSub = useSetRecoilState(submissions.selected);

  const openSubmission = () => {
    setCurrentSection(section.id);
    setCurrentStudent(studentId);
    setCurrentSub(student?.submissions[0].id);
    push('/dashboard/teacher/submission', {
      student,
      section,
      submission: student?.submissions[0],
    });
  };

  return student ? (
    <Table.Row>
      <Table.Col>
        {student.firstname} {student.lastname}
      </Table.Col>
      <Table.Col>{student.lastname}</Table.Col>
      <Table.Col>{student.firstname}</Table.Col>
      <Table.Col className="status">
        {student.submissions.length > 0 ? (
          <Button type="text" onClick={openSubmission}>
            View
          </Button>
        ) : (
          'Incomplete'
        )}
      </Table.Col>
    </Table.Row>
  ) : (
    <p>student not found</p>
  );
};

interface IRumbleStudentCardProps {
  studentId: number;
  section: Sections.ISectionWithRumbles;
}

export default RumbleStudentCard;
