import { axiosWithoutAuth } from '../axiosWithConfig';
import {
  IAuthResponse,
  ILoginBody,
  ISignUpBody,
  IUser,
  Roles,
} from './authTypes';

export const authorizeWithClever = async (
  code: string,
): Promise<CleverAuthResponseType> => {
  const { data } = await axiosWithoutAuth().get(
    `/api/auth/o/clever?code=${code}`,
  );
  return data;
};

export const mergeAccounts = async (
  body: ILoginBody,
  cleverId: string,
): Promise<IAuthResponse> => {
  const { data } = await axiosWithoutAuth().post(
    `/api/auth/o/clever/merge?cleverId=${cleverId}`,
    body,
  );
  return data;
};

export const signupWithClever = async (
  body: Partial<ISignUpBody>,
  roleId: number,
  cleverId: string,
): Promise<IAuthResponse> => {
  const userType = roleId === Roles.user ? 'student' : Roles[roleId];
  const params = new URLSearchParams({
    userType,
    cleverId,
  });
  const { data } = await axiosWithoutAuth().post(
    `/api/auth/o/clever/signup?${params.toString()}`,
    body,
  );
  return data;
};

export const cleverButton = async (): Promise<{ url: string }> => {
  const { data } = await axiosWithoutAuth().get('/api/auth/o/clever/button');
  return data;
};

type CleverAuthResponseType =
  | {
      actionType: 'SUCCESS';
      roleId: Roles & number;
      body: IAuthResponse;
      cleverId: string;
    }
  | {
      actionType: 'MERGE';
      roleId: Roles & number;
      body: IUser;
      cleverId: string;
    }
  | {
      actionType: 'NEW';
      roleId: Roles & number;
      body: ICleverStudent | ICleverTeacher;
      cleverId: string;
    };

interface ICleverStudent {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  grade: CleverGradeType;
}

interface ICleverTeacher {
  id: string;
  email?: string;
  name: { first: string; last: string; middle?: string };
  sections: string[];
}

export type CleverSubjectType =
  | 'english/language arts'
  | 'math'
  | 'science'
  | 'social studies'
  | 'language'
  | 'homeroom/advisory'
  | 'interventions/online learning'
  | 'technology and engineering'
  | 'PE and health'
  | 'arts and music'
  | 'other'
  | '';

type CleverGradeType =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13'
  | 'PreKindergarten'
  | 'TransitionalKindergarten'
  | 'Kindergarten'
  | 'InfantToddler'
  | 'Preschool'
  | 'PostGraduate'
  | 'Ungraded'
  | 'Other'
  | '';
