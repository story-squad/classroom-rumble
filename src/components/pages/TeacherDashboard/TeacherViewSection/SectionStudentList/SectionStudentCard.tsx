import React from 'react';
import { useHistory } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { Sections, Students } from '../../../../../api';
import { current } from '../../../../../state';
import { Table } from '../../../../common';

const SectionStudentCard = ({
  section,
  student,
}: ISectionStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(current.section);
  const setCurrentStudent = useSetRecoilState(current.student);
  const clearCurrentRumble = useResetRecoilState(current.rumble);

  const openStudent = () => {
    setCurrentSection(section);
    setCurrentStudent(student);
    clearCurrentRumble();
    push('/dashboard/teacher/student', { student, section });
  };

  return (
    <Table.Row onClick={openStudent}>
      <Table.Col>
        {student.firstname} {student.lastname}
      </Table.Col>
      <Table.Col>{student.lastname}</Table.Col>
      <Table.Col>{student.firstname}</Table.Col>
      <Table.Col>{student.submissions.length}</Table.Col>
    </Table.Row>
  );
};

interface ISectionStudentCardProps {
  student: Students.IStudentWithSubmissions;
  section: Sections.ISectionWithRumbles;
}

export default SectionStudentCard;
