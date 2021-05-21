import { atom } from 'recoil';

export const inviteModalIsOpen = atom({
  key: 'inviteModalIsOpen',
  default: false,
});

export const validationModalIsOpen = atom({
  key: 'validationModalIsOpen',
  default: false,
});
