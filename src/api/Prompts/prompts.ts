import { AxiosResponse } from 'axios';
import { axiosWithAuth } from '../axiosWithConfig';

export interface PromptItem {
  id: number;
  prompt: string;
  active: boolean;
  submitted: boolean;
}

export const getCurrent = (): Promise<AxiosResponse<PromptItem>> => {
  return axiosWithAuth().get('/contest/prompt');
};
