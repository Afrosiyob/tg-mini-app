import * as Types from '../types';

import * as Api from '../api';

export interface IProps {
  values: {
    phone: string;
    password: string;
  };
  onSuccess?: (data: Types.IEntity.GetOtp) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.GetOtp) => void;
}

async function GetOtp({ values, onSuccess, onError, onLoading, onSettled }: IProps): Promise<Types.Actions.GetOtp> {
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

export default GetOtp;
