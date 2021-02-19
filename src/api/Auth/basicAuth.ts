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

export const signup = (credentials: ISignUpBody): Promise<AxiosResponse> => {
  return axiosWithoutAuth().post('api/auth/register', credentials);
};

export const formatSignupBody = (formData: SignupFormState): ISignUpBody => {
  const age = parseInt(formData.ageStr);
  return {
    email: formData.email,
    parentEmail: age < 13 ? formData.parentEmail : formData.email,
    password: formData.password,
    username: formData.username,
    age,
  };
};

export interface SignupFormState extends Omit<ISignUpBody, 'age'> {
  ageStr: string;
  confirm: string;
}

interface ISignUpBody {
  email: string;
  username: string;
  password: string;
  parentEmail: string;
  age: number;
}
