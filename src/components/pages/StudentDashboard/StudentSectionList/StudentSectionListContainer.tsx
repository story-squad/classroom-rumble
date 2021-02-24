import React, { useEffect, useState } from 'react';
import { Sections } from '../../../../api';
import { ISection } from '../../../../api/Sections';
import CouldNotLoad from '../../DashBoards/CouldNotLoad';
import RenderStudentSectionList from './RenderStudentSectionList';

const StudentSectionListContainer = (): React.ReactElement => {
  // TODO I beleive I need recoil state here to monitor the users section
  const [studentSections, setStudentSections] = useState<ISection[]>([
    {
      id: 1,
      name: 'Ben',
      active: true,
      grade: '4',
      subject: 'History',
      joinCode: 'afadsfdada',
    },
  ]);

  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    Sections.getStudentSections(studentSections[0].id)
      .then((res) => {
        setStudentSections(res);
      })
      .catch((err) => {
        console.log({ err });
        setError('It appears you are not in a section.');
      });
  }, []);

  return error ? (
    <CouldNotLoad error={error} />
  ) : (
    <RenderStudentSectionList studentSections={studentSections} />
  );
};

export default StudentSectionListContainer;
