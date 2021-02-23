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
    firstname: formData.firstname,
    lastname: formData.lastname,
    parentEmail: age < 13 ? formData.parentEmail : formData.email,
    password: formData.password,
    codename: formData.codename,
    age,
  };
};

export interface SignupFormState extends Omit<ISignUpBody, 'age'> {
  ageStr: string;
  confirm: string;
}

interface ISignUpBody {
  firstname: string;
  lastname: string;
  codename: string;
  email: string;
  password: string;
  parentEmail: string;
  age: number;
}
