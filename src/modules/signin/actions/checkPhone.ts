import * as Types from '../types';

import * as Api from '../api';

export interface IProps {
  values: {
    phone: string;
  };
  onSuccess?: (data: Types.IEntity.CheckPhone) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.CheckPhone) => void;
}

async function CheckPhone({ values, onSuccess, onError, onLoading }: IProps): Promise<Types.Actions.CheckPhone> {
  try {
    onLoading?.(true);

    const { data: item } = await Api.CheckPhone({
      values: {
        phone: values.phone
      }
    }).then(res => {
      onLoading?.(false);
      return res;
    });

    onSuccess?.(item);

    return {
      isError: false,
      isSuccess: true,
      isLoading: false,
      isValid: true
    };
  } catch (error) {
    onError?.('error');
    return {
      isError: true,
      isSuccess: false,
      isLoading: false,
      isValid: false
    };
  }
}

export default CheckPhone;
