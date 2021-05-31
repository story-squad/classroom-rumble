import { selector } from 'recoil';
import { authToken, isLoggedIn, user } from './authState';
import {
  feedbackForSubmission,
  hasSubmitted,
  rumble,
  section,
  student,
  sub,
} from './currentViewState';
import { currentPrompt, customList } from './promptState';
import { addRumbles, list as rumbleList } from './rumbleState';
import { list as sectionList } from './sectionState';
import { list as studentList } from './studentState';

export const reset = selector<undefined>({
  key: 'clearRecoilState',
  get: () => undefined,
  set: ({ reset }) => {
    reset(authToken);
    reset(user);
    reset(isLoggedIn);
    reset(hasSubmitted);
    reset(feedbackForSubmission);
    reset(rumble);
    reset(section);
    reset(student);
    reset(sub);
    reset(customList);
    reset(currentPrompt);
    reset(studentList);
    reset(sectionList);
    reset(rumbleList);
    reset(addRumbles);
  },
});
