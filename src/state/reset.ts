import { selector } from 'recoil';
import { authToken, user } from './authState';
import { ids as fbIds } from './feedbackState';
import { inviteModalIsOpen, validationModalIsOpen } from './modalState';
import { ids as rumbleIds, selected as selectedRumble } from './rumbleState';
import { ids as sectionIds, selected as selectedSection } from './sectionState';
import { ids as subIds } from './submissionState';

export const reset = selector<undefined>({
  key: 'clearRecoilState',
  get: () => undefined,
  set: ({ reset }) => {
    reset(authToken);
    reset(user);
    reset(fbIds);
    reset(inviteModalIsOpen);
    reset(validationModalIsOpen);
    reset(rumbleIds);
    reset(selectedRumble);
    reset(sectionIds);
    reset(selectedSection);
    reset(subIds);
  },
});
