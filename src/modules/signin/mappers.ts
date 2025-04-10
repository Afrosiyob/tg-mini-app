import get from 'lodash/get';

import * as Types from './types';

export const CheckPhone = (item?: unknown): Types.IEntity.CheckPhone => ({
  authRequireCellular: {
    key: get(item, 'authRequireCellular.key') || '',
    type: get(item, 'authRequireCellular.type') || '',
    value: get(item, 'authRequireCellular.value') || false
  },
  exists: get(item, 'exists') || false
});

export const GetOtp = (item?: unknown): Types.IEntity.GetOtp => ({
  verifyId: get(item, 'verifyId') || '',
  expires: get(item, 'expires') || 0
});

export const ConfirmOtp = (item?: unknown): Types.IEntity.ConfirmOtp => ({
  accessToken: get(item, 'accessToken') || '',
  refreshToken: get(item, 'refreshToken') || ''
});
