import getAge from '../../utils/age/getAge';
import { axiosWithAuth, axiosWithoutAuth } from '../axiosWithConfig';
import {
  IAuthResponse,
  ILoginBody,
  INewEmailBody,
  ISignUpBody,
  NewEmailFormState,
  SignupFormState,
} from './authTypes';

export const login = async (body: ILoginBody): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post('/api/auth/login', body);
  return data;
};

export const signup = async (
  credentials: ISignUpBody,
): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post(
    'api/auth/register',
    credentials,
  );
  return data;
};

export const formatSignupBody = (formData: SignupFormState): ISignUpBody => {
  const dob = getAge(formData.dob).toString();
  return {
    email: formData.email,
    firstname: formData.firstname,
    lastname: formData.lastname,
    parentEmail: parseInt(dob) < 13 ? formData.parentEmail : formData.email,
    password: formData.password,
    codename: formData.codename,
    dob,
  };
};

export const resendEmail = async (): Promise<void> => {
  await axiosWithAuth().put('api/auth/activation');
};

export const sendEmail = async (data: INewEmailBody): Promise<void> => {
  await axiosWithAuth().post('api/auth/activation', data);
};

export const formatSendEmailBody = (data: NewEmailFormState): INewEmailBody => {
  const dob = getAge(data.dob).toString();
  return {
    dob,
    newEmail: data.newEmail,
  };
};
