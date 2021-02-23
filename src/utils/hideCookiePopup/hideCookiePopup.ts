const hideCookiePopupName: string =
  process.env.HIDE_COOKIE_POPUP_KEY || 'hideCookiePopupRumble';

export const get = (): boolean => !!localStorage.getItem(hideCookiePopupName);
export const set = (): void => localStorage.setItem(hideCookiePopupName, 'yes');
export const clear = (): void => localStorage.removeItem(hideCookiePopupName);
