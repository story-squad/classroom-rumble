import React, { useEffect, useState } from 'react';
import { Sections } from '../../../../api';
import { ISection } from '../../../../api/Sections';

const TeacherSections = (): React.ReactElement => {
  const [teacherSections, setTeacherSections] = useState<
    undefined | ISection[]
  >();

  useEffect(() => {
    Sections.getSections(1)
      .then((res) => {
        setTeacherSections(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="sectionInfo">
      {teacherSections?.map((data, i) => (
        <div key={i}>
          <div>{data.name}</div>
          <div>{data.active}</div>
          <div>{data.grade}</div>
          <div>{data.subject}</div>
          <div>{data.joinCode}</div>
        </div>
      ))}
    </div>
  );
};

export default TeacherSections;
