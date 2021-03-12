import { axiosWithAuth } from '../axiosWithConfig';
import {
  IRumble,
  IRumblePostBody,
  IRumbleWithSectionInfo,
} from './rumbleTypes';

export const create = async (
  body: IRumblePostBody,
  teacherId: number,
  sectionIds: number[],
): Promise<IRumbleWithSectionInfo[]> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/teachers/${teacherId}/rumbles`,
    {
      rumble: body,
      sectionIds,
    },
  );
  return data;
};

export const getRumbleById = async (rumbleId: number): Promise<IRumble> => {
  const { data } = await axiosWithAuth().get(`api/rumble/rumbles/${rumbleId}`);
  return data;
};
