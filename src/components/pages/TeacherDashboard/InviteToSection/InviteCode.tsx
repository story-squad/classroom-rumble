import React from 'react';
import { Sections } from '../../../../api';
import { helpers } from '../../../../utils';

const InviteCode = ({
  section,
  goBack,
}: IInviteCodeProps): React.ReactElement => (
  <div className="invite-code">
    <div className="content">
      <h3>Join Code:</h3>
      <textarea rows={6} readOnly value={helpers.joinCode(section)} />
    </div>
    <div className="footer">
      <button onClick={goBack}>Pick a Different Class</button>
    </div>
  </div>
);

interface IInviteCodeProps {
  section: Sections.ISectionWithRumbles;
  goBack: () => void;
}

export default InviteCode;
