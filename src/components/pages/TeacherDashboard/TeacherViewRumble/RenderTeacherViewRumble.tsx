import { DateTime } from 'luxon';
import React, { useMemo } from 'react';
import { Rumbles, Sections } from '../../../../api';
import { SectionInfo } from '../../../common/SectionInfo';
import { RumbleStudentList } from './RumbleStudentList';

const RenderTeacherViewRumble = ({
  rumble,
  section,
  prompt,
}: IRenderTeacherViewRumbleProps): React.ReactElement => {
  return (
    <div className="teacher-view-rumble">
      <div className="prompt-info-wrapper">
        <div className="prompt-info-container">
          {rumble.end_time ? (
            <div className="rumble-time">
              <div>{formatDate(`${rumble.end_time}`)}</div>
            </div>
          ) : (
            <div className="rumble-closed">
              <p>Rumble Not Open</p>
            </div>
          )}
          <div className="prompt-text">
            <h2>Prompt</h2>
            <p>{prompt}</p>
          </div>
        </div>
      </div>
      <SectionInfo section={section} />
      <RumbleStudentList section={section} rumble={rumble} />
    </div>
  );
};

const formatDate = (date: string): React.ReactNode => {
  const luxonDate = useMemo(() => DateTime.fromISO(date), [date]);
  return (
    <>
      <div className="date">
        {luxonDate.toLocaleString(DateTime.DATE_SHORT)}
      </div>
      <div className="day">{luxonDate.toLocaleString({ weekday: 'long' })}</div>
    </>
  );
};

interface IRenderTeacherViewRumbleProps {
  rumble: Rumbles.IRumbleWithSectionInfo;
  section: Sections.ISectionWithRumbles;
  prompt: string;
}

export default RenderTeacherViewRumble;
