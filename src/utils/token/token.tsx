import jwt_decode from 'jwt-decode';

/**
 * If a key is set in the ENV, it will use that as the localStorage
 * key for the token, otherwise it will be stored as `token: ''`
 */
const tokenName: string = process.env.TOKEN_KEY || 'token';
const userStorageName: string = process.env.USER_STORAGE || 'user';

/**
 * Decodes the token and checks if you're still logged in before continuing.
 * If the token has expired or there is no token, the token is cleared and
 * you're sent back to the landing page.
 */
export const get = (): string | undefined => {
  const token = localStorage.getItem(tokenName);
  if (!token) return;

  try {
    // jwt_decode will throw an error if the token is invalid
    const decodedToken: DecodedToken = jwt_decode(token);
    // If the token is expired, we will also throw an error
    if (Date.now() >= decodedToken.exp * 1000) throw new Error();
    return token ?? undefined;
  } catch (err) {
    console.log(err);
    // logout function
    return;
  }
};

/**
 * This function stores a token in localStorage
 * @param token taks a token as the argument and stores it in localStorage
 */
export const set = (token: string): void =>
  localStorage.setItem(tokenName, token);

/**
 * Clears the current token stored in localStorage
 */
export const clear = (): void => localStorage.removeItem(tokenName);

/**
 * Local storage handlers for user info
 */
export const getUser = (): IUser | undefined =>
  JSON.parse(localStorage.getItem(userStorageName) ?? 'null') ?? undefined;
export const setUser = (user: IUser): void =>
  localStorage.setItem(userStorageName, JSON.stringify(user));
export const clearUser = (): void => localStorage.removeItem(userStorageName);
export interface DecodedToken {
  exp: number;
  iat: number;
}

export interface IUser {
  id: number;
  codename: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}
