import { axiosWithAuth } from '../axiosWithConfig';
import { IRumblePostBody, IRumbleWithSectionInfo } from './rumbleTypes';

export const create = async (
  body: IRumblePostBody,
  teacherId: number,
  sectionIds: number[],
): Promise<IRumbleWithSectionInfo[]> => {
  console.log({
    rumble: body,
    sectionIds,
  });
  const { data } = await axiosWithAuth().post(
    `/api/rumble/teachers/${teacherId}/rumbles`,
    {
      rumble: body,
      sectionIds,
    },
  );
  return data;
};
