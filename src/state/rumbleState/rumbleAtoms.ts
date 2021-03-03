import { atom } from 'recoil';
import { IRumbleWithSectionInfo } from '../../api/Rumbles';

export const list = atom<IRumbleWithSectionInfo[]>({
  key: 'rumbleList',
  default: [],
});
