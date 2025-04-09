import * as Types from './types';
import { AxiosPromise } from 'axios';
import axios from 'axios';

export const GetOtp = ({ values }: { values: Types.IForm.GetOtp }): AxiosPromise<Types.IApi.GetOtp.Response> =>
  axios.post('/api/mobile/auth/sign-in-get-otp', {
    phone: values.phone,
    password: values.password
  } as Types.IApi.GetOtp.Request);

export const ConfirmOtp = ({
  values
}: {
  values: Types.IForm.ConfirmOtp;
}): AxiosPromise<Types.IApi.ConfirmOtp.Response> =>
  axios.post('/api/mobile/auth/sign-in-confirm-otp', {
    verifyCode: values.verifyCode
  } as Types.IApi.ConfirmOtp.Request);

export const CheckPhone = ({
  values
}: {
  values: Types.IForm.CheckPhone;
}): AxiosPromise<Types.IApi.CheckPhone.Response> =>
  axios.post('/api/mobile/auth/check-phone', {
    phone: values.phone
  } as Types.IApi.CheckPhone.Request);
