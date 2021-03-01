import { axiosWithAuth } from '../axiosWithConfig';
import { IPromptInQueue } from './promptTypes';

export const getUpcoming = async (): Promise<IPromptInQueue[]> => {
  const { data } = await axiosWithAuth().get('/api/prompts/queue');
  return data;
};
