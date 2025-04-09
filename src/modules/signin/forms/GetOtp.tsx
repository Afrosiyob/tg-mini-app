'use client';

import React, { useActionState } from 'react';

import * as Actions from '../actions';
import * as Types from '../types';
import * as yup from 'yup';

export interface IProps {
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: any) => void;
  children(props: { state: Types.Actions.GetOtp; pending: boolean }): React.ReactNode;
}

const GetOtp: React.FC<IProps> = ({ children, onError, onSuccess, onLoading, onSettled }) => {
  const [state, action, pending] = useActionState(
    async (_prevState: Types.Actions.GetOtp, formData: FormData): Promise<Types.Actions.GetOtp> => {
      const phone = (formData.get('phone') as string) || '';
      const password = (formData.get('password') as string) || '';

      const Schema = yup.object().shape({
        phone: yup.string().required(),
        password: yup.string().min(5).required()
      });

      const validatedFields = Schema.isValid({
        phone,
        password
      });

      if (!validatedFields) {
        return {
          errors: {
            phone: ['invalid username'],
            password: ['invalid password']
          },
          isValid: false,
          isError: true,
          isSuccess: false,
          isLoading: false
        };
      }

      await Actions.GetOtp({
        values: {
          password,
          phone
        },
        onError,
        onSettled,
        onSuccess,
        onLoading
      });

      return {
        isError: false,
        isSuccess: true,
        isLoading: false,
        isValid: true
      };
    },
    {}
  );

  return <form action={action}>{children({ state, pending })}</form>;
};

export default GetOtp;
