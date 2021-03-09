import { AxiosResponse } from 'axios';
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
 * getCurrent will get "today's prompt" that is pulled from the FDSC list of prompts. This API call can be found [here](https://github.com/story-squad/contest-deno-be/blob/cba0ecef96594265b759c3f1d147d435bebf2de5/src/api/routes/prompts.ts#L52)
 */
export const getCurrent = (): Promise<AxiosResponse<IPrompt>> => {
  return axiosWithAuth().get('/api/prompts/active');
};
