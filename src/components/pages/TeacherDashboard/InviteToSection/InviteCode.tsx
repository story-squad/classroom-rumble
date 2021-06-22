import React from 'react';
import { useToasts } from 'react-toast-notifications';
import { useClipboard } from 'use-clipboard-copy';
import { Sections } from '../../../../api';
import { helpers } from '../../../../utils';
import { Button } from '../../../common';

const InviteCode = ({
  section,
  goBack,
  disableSectionPicker,
}: IInviteCodeProps): React.ReactElement => {
  const { addToast } = useToasts();
  const clipboard = useClipboard({
    onSuccess: () =>
      addToast('Copied to clipboard!', { appearance: 'success' }),
    onError: () => addToast('Could not copy', { appearance: 'error' }),
  });

  return (
    <div className="invite-code">
      <div className="content">
        <h3>Join Code:</h3>
        <textarea
          rows={6}
          readOnly
          ref={clipboard.target}
          value={helpers.joinCode(section)}
        />
      </div>
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
