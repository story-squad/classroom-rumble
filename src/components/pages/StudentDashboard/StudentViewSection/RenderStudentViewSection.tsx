import React from 'react';
import { useRecoilValue } from 'recoil';
import emptyMail from '../../../../assets/img/empty_inbox.svg';
import { rumbles } from '../../../../state';
import { SectionInfo } from '../../../common';
import { StudentRumbleList } from '../StudentRumbleList';

const RenderStudentViewSectionRumbles = ({
  sectionId,
}: IRenderStudentViewSectionRumblesProps): React.ReactElement => {
  const currentRumbles = useRecoilValue(
    rumbles.get({ sectionId, phases: ['ACTIVE', 'INACTIVE', 'FEEDBACK'] }),
  );
  const pastRumbles = useRecoilValue(
    rumbles.get({ sectionId, phases: ['COMPLETE'] }),
  );

  return (
    <>
      <SectionInfo sectionId={sectionId} />
      <div className="student-view-section">
        <div className="section-content-switcher-wrapper">
          <div className="section-content-switcher-container">
            {currentRumbles?.length ? (
              // Checks if there are any current rumbles if not renders an image
              <>
                <h3>Current Rumbles</h3>
                <StudentRumbleList rumbleIds={currentRumbles} />
              </>
            ) : (
              <>
                <h3>Current Rumbles</h3>
                <div className="current-rumbles">
                  <p>You don&apos;t have any current rumbles.</p>
                  <img
                    src={emptyMail}
                    alt="You don't have any current rumbles"
                  />
                </div>
              </>
            )}
            {pastRumbles?.length ? (
              //Checks if there are any past rumbles if not renders an image
              <>
                <h3>Past Rumbles</h3>
                <StudentRumbleList rumbleIds={pastRumbles} />
              </>
            ) : (
              <>
                <h3>Past Rumbles</h3>
                <div className="past-rumbles">
                  <p>You don&apos;t have any past rumbles.</p>
                  <img src={emptyMail} alt="You don't have any past rumbles" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

interface IRenderStudentViewSectionRumblesProps {
  sectionId: number;
}

export default RenderStudentViewSectionRumbles;
