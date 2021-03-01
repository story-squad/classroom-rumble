import { axiosWithAuth } from '../axiosWithConfig';
import { IPrompt, IPromptInQueue } from './promptTypes';

export const getUpcoming = async (): Promise<IPromptInQueue[]> => {
  const { data } = await axiosWithAuth().get('/api/prompts/queue');
  return data;
};

export const addCustom = async (prompt: string): Promise<IPrompt> => {
  const { data } = await axiosWithAuth().post(`/api/prompts/custom`, {
    prompt,
  });
  return data;
};
