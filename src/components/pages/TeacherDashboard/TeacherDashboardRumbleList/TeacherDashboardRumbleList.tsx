import React, { useMemo } from 'react';
import { Rumbles, Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/no_rumbles.svg';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  sections,
  visible = true,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  // TODO Make this reusable
  // be able to control which rumbles are filtered in with props
  // boolean
  const currentRumbles = useMemo(() => {
    return sections.reduce<Rumbles.IRumbleWithSectionInfo[]>((acc, cur) => {
      return [
        ...acc,
        ...cur.rumbles
          .filter((rumble) =>
            ['ACTIVE', 'FEEDBACK', 'INACTIVE'].includes(rumble.phase),
          )
          .map((rumble) => ({ ...rumble, section: cur })),
      ];
    }, []);
  }, [sections]);

  console.log(currentRumbles);
  if (!visible) return <></>;
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        <h2>Current Rumbles</h2>
        {!sections || !currentRumbles ? (
          // If there are no sections show that there is alsp no rubmles
          <img src={emptyMail} alt="You don't have any current rumbles" />
        ) : (
          <div className="rumble-list">
            {currentRumbles?.map((rumble) => (
              // TODO *** CHANGE THIS AS This IS TEMPORARY
              <TeacherDashboardRumbleCard
                key={rumble.id}
                section={
                  ((rumble as unknown) as {
                    section: Sections.ISectionWithRumbles;
                  }).section
                }
                rumble={rumble}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ITeacherDashboardRumbleListProps {
  sections: Sections.ISectionWithRumbles[];
  visible?: boolean;
}

export default TeacherDashboardRumbleList;
