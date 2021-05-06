import React from 'react';
import { Rumbles, Sections } from '../../../../api';
import { useRumbleFilter } from '../../../../hooks';
import StudentDashboardRumbleCard from './StudentDashboardRumbleCard';

const StudentDashboardRumbleList = ({
  sections,
}: IStudentDashboardRumbleListProps): React.ReactElement => {
  const [currentRumbles] = useRumbleFilter(
    sections.reduce<Rumbles.IRumbleWithSectionInfo[]>(
      (acc, section) => [...acc, ...section.rumbles],
      [],
    ),
  );

  console.log({ currentRumbles });
  return (
    <div className="student-dash-rumble-list-wrapper">
      <div className="student-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        <div className="rumble-list">
          {sections?.map((sec) =>
            currentRumbles.map((rum) => (
              <StudentDashboardRumbleCard
                key={rum.id}
                section={sec}
                rumble={rum}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
};

interface IStudentDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
}

export default StudentDashboardRumbleList;
