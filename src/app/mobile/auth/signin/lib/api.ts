import * as Types from '@/app/mobile/auth/signin/lib/types';
import { AxiosPromise } from 'axios';
import axios from 'axios';

export const GetOtp = ({
  values,
  device
}: {
  values: Types.IForm.GetOtp;
  device: Types.IEntity.Device;
}): AxiosPromise<Types.IApi.GetOtp.Response> =>
  axios.post('/api/mobile/auth/sign-in', {
    phone: values.phone,
    password: values.password,
    device: device
  } as Types.IApi.GetOtp.Request);

export const ConfirmOtp = ({
  values,
  verifyId
}: {
  values: Types.IForm.ConfirmOtp;
  verifyId: string;
}): AxiosPromise<Types.IApi.ConfirmOtp.Response> =>
  axios.post('/api/mobile/auth/sign-in', {
    verifyCode: values.verifyCode,
    verifyId
  } as Types.IApi.ConfirmOtp.Request);

export const CheckPhone = ({
  values
}: {
  values: Types.IForm.CheckPhone;
}): AxiosPromise<Types.IApi.CheckPhone.Response> =>
  axios.post('/api/mobile/auth/check-phone', {
    phone: values.phone
  } as Types.IApi.CheckPhone.Request);
