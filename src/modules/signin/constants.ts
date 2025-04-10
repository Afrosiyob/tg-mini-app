export const TOKENS = '@@AUTH_SIGNIN/TOKENS';
export const LOGOUT = '@@AUTH_SIGNIN/LOGOUT';
export const PROFILE = '@@AUTH_SIGNIN/PROFILE';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const STATUS_TITLE = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive'
};
