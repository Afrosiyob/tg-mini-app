import * as Sessions from '@/app/mobile/auth/signin/lib/sessions';

import * as yup from 'yup';
import { redirect } from 'next/navigation';
import { GetOtp, CheckPhone, ConfirmOtp } from '@/app/mobile/auth/signin/lib/api';

import http from '@/app/lib/axiosInstance';
export async function CheckPhoneAction({ phone }: { phone: string }) {
  const { data: item } = await CheckPhone({
    values: {
      phone: phone
    }
  });

  if (!item.exists) {
    redirect('/mobile/auth/signup');
  }
}

export type GetOtpActionState = {
  phone?: string;
  password?: string;
  errors?: {
    phone?: string[];
    password?: string[];
  };
};

export async function GetOtpAction(_prevState: GetOtpActionState, formData: FormData): Promise<GetOtpActionState> {
  const Schema = yup.object().shape({
    phone: yup.string().required(),
    password: yup.string().min(5).required()
  });

  const validatedFields = Schema.isValid({
    phone: formData.get('phone'),
    password: formData.get('password')
  });

  if (!validatedFields) {
    return {
      errors: {
        phone: ['invalid username'],
        password: ['invalid password']
      }
    };
  }

  const phone = (formData.get('phone') as string) || '';
  const password = (formData.get('password') as string) || '';

  const { data: item } = await GetOtp({
    values: {
      phone,
      password
    }
  });

  await Sessions.createVerifyId({
    verifyId: item.verifyId
  });

  return { phone, password };
}

export type ConfirmOtpActionState = {
  verifyCode?: string;
  errors?: {
    verifyCode?: string[];
  };
};

export async function ConfirmOtpAction(
  _prevState: ConfirmOtpActionState,
  formData: FormData
): Promise<ConfirmOtpActionState> {
  const Schema = yup.object().shape({
    verifyCode: yup.string().required()
  });

  const validatedFields = Schema.isValid({
    verifyCode: formData.get('verifyCode')
  });

  if (!validatedFields) {
    return {
      errors: {
        verifyCode: ['invalid verifyCode']
      }
    };
  }

  const verifyCode = (formData.get('verifyCode') as string) || '';

  const { data: item } = await ConfirmOtp({
    values: {
      verifyCode
    }
  });

  await Sessions.deleteVerifyId();

  await Sessions.createToken({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken }
  });

  http.setAccessToken(item.accessToken);

  return {
    verifyCode
  };
}

export async function LogoutAction() {
  await Sessions.logout();
  await Sessions.deleteVerifyId();

  redirect('/mobile/auth/signin');
}
