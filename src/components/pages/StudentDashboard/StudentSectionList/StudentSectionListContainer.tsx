import React, { useEffect, useState } from 'react';
import { Section } from '../../../../api';
import { ISection } from '../../../../api/Sections';
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

  useEffect(() => {
    Section.getStudentSections()
      .then((res) => {
        setStudentSections(res);
      })
      .catch((err) => {
        console.log('Err in useeffect', err);
      });
  }, []);

  return <RenderStudentSectionList studentSections={studentSections} />;
};

export default StudentSectionListContainer;
