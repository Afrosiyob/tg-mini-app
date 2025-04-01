import { createSession, deleteSession } from '@/app/login/lib/sessions';

import * as Types from '@/app/login/lib/types';
import * as yup from 'yup';
import { redirect } from 'next/navigation';
import { Login } from '@/app/login/lib/api';

export const LoginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(5).required()
});

export async function loginAction(state: Types.IForm.FormState, formData: FormData) {
  const validatedFields = LoginSchema.isValid({
    username: formData.get('username'),
    password: formData.get('password')
  });

  if (!validatedFields) {
    return {
      errors: {
        username: ['invalid username'],
        password: ['invalid password']
      }
    };
  }

  const { data: item } = await Login({
    values: {
      username: (formData.get('username') as string) || '',
      password: (formData.get('password') as string) || ''
    }
  });

  if (!item.accessToken && !item.refreshToken) {
    return {
      message: 'token is empty'
    };
  }

  await createSession({
    tokens: { accessToken: item.accessToken, refreshToken: item.refreshToken }
  });

  redirect('/dashboard');
}

export async function logoutAction() {
  deleteSession();
  redirect('/login');
}
