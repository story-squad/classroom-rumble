import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const getResetEmail = (email: string): Promise<AxiosResponse> => {
  return axiosWithoutAuth().get(`/auth/reset?email=${email}`);
};

export const updatePassword = (
  body: NewPasswordBody,
): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('/auth/reset', body);
};

export interface NewPasswordBody {
  email: string;
  code: string;
  password: string;
}
