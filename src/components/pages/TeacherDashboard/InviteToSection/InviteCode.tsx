import React from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Sections } from '../../../../api';
import { Button } from '../../../common';

const InviteCode = ({
  // section,
  goBack,
  disableSectionPicker,
}: IInviteCodeProps): React.ReactElement => {
  const clipboard = useClipboard({ copiedTimeout: 750 });
  return (
    <div className="invite-code">
      <div className="footer">
        {!disableSectionPicker && (
          <Button type="secondary" onClick={goBack}>
            Pick a Different Class
          </Button>
        )}
        <Button type="primary" onClick={clipboard.copy}>
          Click To Copy
        </Button>
      </div>
    </div>
  );
};

interface IInviteCodeProps {
  section: Sections.ISectionWithRumbles;
  goBack: () => void;
  disableSectionPicker: boolean;
}

export default InviteCode;
