import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = async (
  credentials: LoginBody,
): Promise<AxiosResponse<LoginResponse>> => {
  return axiosWithoutAuth().post('/auth/login', credentials);
};

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
