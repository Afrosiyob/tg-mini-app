import * as Sessions from '@/modules/tokens/sessions';

import * as Types from '../types';

import * as Api from '../api';

import * as Services from '@/services';

export interface IProps {
  values: {
    verifyCode: string;
    verifyId: string;
  };
  onSuccess?: (data: Types.IEntity.Tokens) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.Tokens) => void;
}

async function ConfirmOtp({
  values,
  onError,
  onLoading,
  onSettled,
  onSuccess
}: IProps): Promise<Types.Actions.ConfirmOtp> {
  try {
    onLoading?.(true);

    const { data: item } = await Api.ConfirmOtp({
      values: {
        verifyCode: values.verifyCode,
        verifyId: values.verifyId
      }
    }).then(res => {
      onLoading?.(false);
      return res;
    });

    onSuccess?.(item);

    await Sessions.AccessToken.Create({
      accessToken: item.accessToken
    });

    await Sessions.RefreshToken.Create({
      refreshToken: item.refreshToken
    });

    Services.Https.Server.setAccessToken(item.accessToken);

    return {
      isError: false,
      isLoading: false,
      isValid: true
    };
  } catch (error) {
    onError?.('error');

    return {
      isError: true,
      isLoading: false,
      isValid: true
    };
  }
}

export default ConfirmOtp;
