import * as Types from './types';
import { AxiosPromise } from 'axios';

import axios from 'axios';

export const GetOtp = ({ values }: { values: Types.IForm.GetOtp }): AxiosPromise<Types.IApi.GetOtp.Response> =>
  axios.post('/api/auth/sign-up-get-otp', {
    phone: values.phone,
    password: values.password
  } as Types.IApi.GetOtp.Request);

export const ConfirmOtp = ({
  values
}: {
  values: Types.IForm.ConfirmOtp;
}): AxiosPromise<Types.IApi.ConfirmOtp.Response> =>
  axios.post('/api/auth/sign-up-confirm-otp', {
    verifyCode: values.verifyCode,
    verifyId: values.verifyId
  } as Types.IApi.ConfirmOtp.Request);

export const SetProfileInfo = ({
  values
}: {
  values: Types.IForm.SetProfileInfo;
}): AxiosPromise<Types.IApi.SetProfileInfo.Response> =>
  axios.post('/api/auth/set-profile-info', {
    verifyId: values.verifyId,
    firstname: values.firstname,
    lastname: values.lastname,
    birthday: values.birthday,
    gender: values.gender,
    image: values.image
  } as Types.IApi.SetProfileInfo.Request);
