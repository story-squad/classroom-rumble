import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = (
  body: ILoginBody,
): Promise<AxiosResponse<{ token: string }>> => {
  return axiosWithoutAuth().post('/api/auth/login', body);
};

export interface ILoginBody {
  email: string;
  password: string;
}

export const signup = (
  body: ISignUpBody,
): Promise<AxiosResponse<{ token: string }>> => {
  return axiosWithoutAuth().post('/api/auth/register', body);
};

export interface ISignUpBody {
  email: string;
  password: string;
}
