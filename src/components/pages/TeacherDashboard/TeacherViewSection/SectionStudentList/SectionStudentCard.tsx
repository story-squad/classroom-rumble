import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { rumbles, sections, students } from '../../../../../state';
import { Table } from '../../../../common';

const SectionStudentCard = ({
  sectionId,
  studentId,
}: ISectionStudentCardProps): React.ReactElement => {
  const { push } = useHistory();
  const setCurrentSection = useSetRecoilState(sections.selected);
  const setCurrentStudent = useSetRecoilState(students.selected);
  const clearCurrentRumble = useResetRecoilState(rumbles.selected);

  const student = useRecoilValue(students.getById(studentId));

  const openStudent = () => {
    clearCurrentRumble();
    push('/dashboard/teacher/student');
    setTimeout(() => {
      setCurrentSection(sectionId);
    }, 500);
    setCurrentStudent(studentId);
  };

  return student ? (
    <Table.Row onClick={openStudent}>
      <Table.Col>
        {student.firstname} {student.lastname}
      </Table.Col>
      <Table.Col>{student.lastname}</Table.Col>
      <Table.Col>{student.firstname}</Table.Col>
      <Table.Col>{student.submissions.length}</Table.Col>
    </Table.Row>
  ) : (
    <p>Student not found</p>
  );
};

interface ISectionStudentCardProps {
  studentId: number;
  sectionId: number;
}

export default SectionStudentCard;
