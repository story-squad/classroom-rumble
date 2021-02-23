import { AxiosResponse } from 'axios';
import { axiosWithoutAuth } from '../axiosWithConfig';

export const login = (
  body: ILoginBody,
): Promise<AxiosResponse<IAuthResponse>> => {
  return axiosWithoutAuth().post('/api/auth/login', body);
};

export interface ILoginBody {
  codename: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
}

export interface IUser {
  id: number;
  codename: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  roleId: Roles & number;
}

export enum Roles {
  'user' = 1,
  'teacher' = 2,
  'admin' = 3,
}
