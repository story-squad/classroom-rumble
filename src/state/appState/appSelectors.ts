import { DefaultValue, selector } from 'recoil';
import { InitialState } from '../../api';
import { add as addRumbles } from '../rumbleState';
import { add as addSections } from '../sectionState';
import { grades, subjects } from './enumAtoms';

export const init = selector<InitialState.IAppInitResponse | undefined>({
  key: 'applicationStateInit',
  get: () => undefined,
  set: ({ set }, initVal) => {
    // Return early if no value
    if (initVal instanceof DefaultValue || initVal === undefined) {
      return;
    }

    // Initialize Enum Data
    set(grades, initVal.enumData.grades);
    set(subjects, initVal.enumData.subjects);

    // Add Sections
    set(addSections, initVal.sections);

    // Add Rumbles
    const rumbleList = initVal.sections.map((sec) => sec.rumbles).flat();
    set(addRumbles, rumbleList);
  },
});
