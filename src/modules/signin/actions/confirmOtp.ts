import * as Sessions from '../sessions';

import * as Types from '../types';

import * as Api from '../api';

import http from '@/services/http';

async function ConfirmOtp({ verifyCode }: { verifyCode: string }): Promise<Types.Actions.ConfirmOtp> {
  const { data: item } = await Api.ConfirmOtp({
    values: {
      verifyCode
    }
  });

  await Sessions.VerifyId.Delete();

  await Sessions.AccessToken.Create({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken }
  });

  await Sessions.RefreshToken.Create({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken }
  });

  http.setAccessToken(item.accessToken);

  return {
    isError: false,
    isSuccess: true,
    isLoading: false,
    isValid: true
  };
}

export default ConfirmOtp;
