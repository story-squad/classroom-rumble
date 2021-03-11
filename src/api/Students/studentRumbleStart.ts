import { Rumbles } from '..';
import { axiosWithAuth } from '../axiosWithConfig';

export const getRumbleById = async (
  rumbleId: number,
): Promise<Rumbles.IRumble> => {
  const { data } = await axiosWithAuth().get(`api/rumble/rumbles/${rumbleId}`);
  return data;
};

// If there is no end time they see waiting room if there is end time they see prompt
