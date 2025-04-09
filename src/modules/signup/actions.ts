import * as Sessions from './sessions';

import * as yup from 'yup';
import { redirect } from 'next/navigation';
import { GetOtp, CheckPhone, ConfirmOtp } from './api';

import http from '@/services/http';

import { popup } from '@telegram-apps/sdk-react';

export type CheckPhoneActionState = {
  errors?: {
    phone?: string[];
  };
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
};

export async function CheckPhoneAction({ phone }: { phone: string }): Promise<CheckPhoneActionState> {
  const { data: item } = await CheckPhone({
    values: {
      phone: phone
    }
  });

  if (!item.exists) {
    redirect('/mobile/auth/signup');
  }

  return {
    isError: false,
    isSuccess: true,
    isLoading: false,
    isValid: true
  };
}

export type GetOtpActionState = {
  errors?: {
    phone?: string[];
    password?: string[];
  };
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
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
      },
      isValid: false
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

  return {
    isError: false,
    isSuccess: true,
    isLoading: false,
    isValid: true
  };
}

export type ConfirmOtpActionState = {
  errors?: {
    verifyCode?: string[];
  };
  isSuccess?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
};

export async function ConfirmOtpAction(verifyCode: string): Promise<ConfirmOtpActionState> {
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
    isError: false,
    isSuccess: true,
    isLoading: false,
    isValid: true
  };
}

export async function LogoutAction() {
  if (popup.open.isAvailable()) {
    // popup.isOpened() -> false
    const promise = popup.open({
      title: 'Hello dude!',
      message: 'Do u wont logout ?',
      buttons: [
        { id: 'cancel', type: 'cancel' },
        { id: 'ok', type: 'ok' }
      ]
    });
    // popup.isOpened() -> true
    const buttonId = await promise;

    console.log(buttonId);

    switch (buttonId) {
      case 'cancel':
        console.log('popup canceled');
        break;

      case 'ok':
        await Sessions.logout();
        await Sessions.deleteVerifyId();
        redirect('/mobile/auth/signin');

      default:
        break;
    }

    // popup.isOpened() -> false
  }
}
