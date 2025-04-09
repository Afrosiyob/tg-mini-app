export const TOKENS = '@@AUTH/TOKENS';
export const LOGOUT = '@@AUTH/LOGOUT';
export const PROFILE = '@@AUTH/PROFILE';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export const STATUS_TITLE = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive'
};
