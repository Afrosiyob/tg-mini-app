export const TOKENS = '@@AUTH_SIGNUP/TOKENS';
export const LOGOUT = '@@AUTH_SIGNUP/LOGOUT';
export const PROFILE = '@@AUTH_SIGNUP/PROFILE';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const STATUS_TITLE = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive'
};
