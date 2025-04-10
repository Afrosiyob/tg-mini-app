import get from 'lodash/get';

import * as Types from './types';

export const GetOtp = (item?: unknown): Types.IEntity.GetOtp => ({
  verifyId: get(item, 'verifyId') || '',
  expires: get(item, 'expires') || 0
});

export const ConfirmOtp = (item?: unknown): Types.IEntity.ConfirmOtp => ({
  verifyId: get(item, 'verifyId') || '',
  expires: get(item, 'expires') || 0
});

export const SetProfileInfo = (item?: unknown): Types.IEntity.SetProfileInfo => ({
  accessToken: get(item, 'accessToken') || '',
  refreshToken: get(item, 'refreshToken') || ''
});
