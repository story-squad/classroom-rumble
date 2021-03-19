import React from 'react';
import { Sections, Students } from '../../../../../api';
import { Table } from '../../../../common';
import SectionStudentCard from './SectionStudentCard';

const RenderSectionStudentList = ({
  studentList,
  section,
}: IRenderSectionStudentListProps): React.ReactElement => {
  return (
    <div className="student-list-wrapper">
      <div className="student-list-container">
        <div className="student-list">
          <Table.Header>
            <Table.Col>Student Name</Table.Col>
            <Table.Col>Last Name</Table.Col>
            <Table.Col>First Name</Table.Col>
            <Table.Col># of Submissions</Table.Col>
          </Table.Header>
          <Table.Body>
            {studentList.map((student) => (
              <SectionStudentCard
                student={student}
                section={section}
                key={student.id}
              />
            ))}
          </Table.Body>
        </div>
      </div>
    </div>
  );
};

interface IRenderSectionStudentListProps {
  studentList: Students.IStudentWithSubmissions[];
  section: Sections.ISectionWithRumbles;
}

export default RenderSectionStudentList;
