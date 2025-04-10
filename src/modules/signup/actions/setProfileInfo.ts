import * as Types from '../types';

import * as Api from '../api';
import * as Services from '@/services';
import * as Sessions from '@/modules/tokens/sessions';

export interface IProps {
  values: Types.IApi.SetProfileInfo.Request;
  onSuccess?: (data: Types.IEntity.Tokens) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.Tokens) => void;
}

async function SetProfileInfo({
  values,
  onSuccess,
  onError,
  onLoading,
  onSettled
}: IProps): Promise<Types.Actions.SetProfileInfo> {
  try {
    onLoading?.(true);

    const { data: item } = await Api.SetProfileInfo({
      values: {
        verifyId: values.verifyId,
        firstname: values.firstname,
        lastname: values.lastname,
        birthday: values.birthday,
        gender: values.gender,
        image: values.image
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
      isValid: false
    };
  }
}

export default SetProfileInfo;
