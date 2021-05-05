import { axiosWithAuth } from '../axiosWithConfig';
import {
  IRumble,
  IRumblePostBody,
  IRumbleWithSectionInfo,
} from './rumbleTypes';

export const create = async ({
  rumble,
  sectionIds,
  teacherId,
}: {
  rumble: IRumblePostBody;
  teacherId: number;
  sectionIds: number[];
}): Promise<IRumbleWithSectionInfo[]> => {
  const { data } = await axiosWithAuth().post(
    `/api/rumble/teachers/${teacherId}/rumbles`,
    {
      rumble,
      sectionIds,
    },
  );
  return data;
};

export const getRumbleById = async (rumbleId: number): Promise<IRumble> => {
  const { data } = await axiosWithAuth().get(`api/rumble/rumbles/${rumbleId}`);
  return data;
};

export const startRumble = async (
  rumbleId: number,
  sectionId: number,
): Promise<Date> => {
  const { data } = await axiosWithAuth().put(
    `/api/rumble/rumbles/${rumbleId}/section/${sectionId}/start`,
  );
  return data;
};
