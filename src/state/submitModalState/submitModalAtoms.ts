import { atom } from 'recoil';

export const selected = atom<null | File>({
  key: 'submissionSelection',
  default: null,
});

export const preview = atom<null | string>({
  key: 'submissionPreview',
  default: null,
});

export const loading = atom<boolean>({
  key: 'submitting',
  default: false,
});

export const error = atom<null | string>({
  key: 'submissionError',
  default: null,
});

export const success = atom<boolean>({
  key: 'submissionSuccessful',
  default: false,
});
