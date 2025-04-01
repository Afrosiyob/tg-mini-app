import {
  createTokenSession,
  deleteTokenSession,
  deleteVerifyIdSession,
  createVerifyIdSession
} from '@/app/mobile/auth/signin/lib/sessions';

import * as Types from '@/app/mobile/auth/signin/lib/types';
import * as yup from 'yup';
import { redirect } from 'next/navigation';
import { GetOtp, CheckPhone, ConfirmOtp } from '@/app/mobile/auth/signin/lib/api';

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

export async function GetOtpAction(state: Types.IForm.GetOtpFormState, formData: FormData) {
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

  const { data: item } = await GetOtp({
    values: {
      phone: (formData.get('phone') as string) || '',
      password: (formData.get('password') as string) || ''
    },
    device: {
      token: 'token',
      deviceOs: 'deviceOs',
      model: 'model',
      osVersion: 'osVersion',
      appVersion: 'appVersion'
    }
  });

  console.log({ item });

  if (!item.verifyId) {
    return {
      message: 'verifyId is empty'
    };
  }

  await createVerifyIdSession({
    verifyId: item.verifyId
  });

  redirect('/mobile/dashboard');
}

export async function ConfirmOtpAction(state: Types.IForm.ConfirmOtpFormState, formData: FormData) {
  const Schema = yup.object().shape({
    verifyCode: yup.string().required()
  });

  const validatedFields = Schema.isValid({
    verifyCode: formData.get('verifyCode')
  });

  if (!validatedFields) {
    return {
      errors: {
        verifyCode: ['invalid username']
      }
    };
  }

  const { data: item } = await ConfirmOtp({
    values: {
      verifyCode: (formData.get('verifyCode') as string) || ''
    },
    verifyId: '123'
  });

  console.log({ item });

  if (!item.accessToken && !item.refreshToken) {
    return {
      message: 'token is empty'
    };
  }

  await deleteVerifyIdSession();

  await createTokenSession({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken }
  });

  redirect('/mobile/dashboard');
}

export async function LogoutAction() {
  deleteTokenSession();
  redirect('/mobile/auth/signin');
}
