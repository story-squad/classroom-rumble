import React, { useMemo } from 'react';
import { Rumbles, Sections } from '../../../../api';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import TeacherDashboardRumbleCard from './TeacherDashboardRumbleCard';

const TeacherDashboardRumbleList = ({
  phases = ['ACTIVE', 'FEEDBACK', 'INACTIVE', 'COMPLETE'],
  title,
  sections,
  visible = true,
}: ITeacherDashboardRumbleListProps): React.ReactElement => {
  const currentRumbles = useMemo(() => {
    return sections.reduce<Rumbles.IRumbleWithSectionInfo[]>((acc, cur) => {
      return [
        ...acc,
        ...cur.rumbles
          .filter((rumble) => phases.includes(rumble.phase))
          .map((rumble) => ({ ...rumble, section: cur })),
      ];
    }, []);
  }, [sections]);

  console.log(currentRumbles);
  if (!visible) return <></>;
  return (
    <div className="teacher-dash-rumble-list-wrapper">
      <div className="teacher-dash-rumble-list-container">
        {title && <h2>{title}</h2>}
        {!sections || currentRumbles.length === 0 ? (
          // If there are no sections show that there is alsp no rubmles
          // Div is for centering purposes
          <div className="no-rumbles">
            <div className="message-text-container">
              <p>You don&apos;t have any rumbles yet.</p>
            </div>
            <img src={emptyMail} alt="You don't have any current rumbles" />
          </div>
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
  phases?: Rumbles.RumblePhases[];
  title?: string;
}

export default TeacherDashboardRumbleList;
