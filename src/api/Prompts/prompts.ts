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

export const getPrompts = async (offset: number): Promise<IPrompt[]> => {
  const { data } = await axiosWithAuth().get(
    `/api/prompts?offset=${offset}&limit=5`,
  );
  return data;
};

/**
 * Get the prompt associated with whichever Rumble Instance a student joins.
 * @param promptId is the prompt for the specific Rumble a student clicks on
 * @returns a prompt type of string.
 */
export const getPromptById = async (promptId: number): Promise<string> => {
  const { data } = await axiosWithAuth().get(`/api/prompts/${promptId}`);
  return data.prompt;
};
