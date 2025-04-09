import * as Types from '../types';
import * as yup from 'yup';

import * as Api from '../api';
import * as Sessions from '../sessions';

export interface IProps {
  values: {
    phone: string;
    password: string;
  };
  onSuccess?: (data: Types.IEntity.CheckPhone) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.CheckPhone) => void;
}

async function GetOtp({ values, onSuccess, onError, onLoading, onSettled }: IProps) {
  try {
    onLoading?.(true);
    const { data: item } = await Api.GetOtp({
      values: {
        phone: values.phone,
        password: values.password
      }
    }).then(res => {
      onLoading?.(false);
      return res;
    });

    onSuccess?.(item);

    await Sessions.VerifyId.Create({
      verifyId: item.verifyId
    });
  } catch (error) {
    onError?.('error');
  }
}

export default GetOtp;
