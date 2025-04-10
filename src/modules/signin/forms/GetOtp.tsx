'use client';

import React, { useActionState } from 'react';

import * as Actions from '../actions';
import * as Types from '../types';
import * as yup from 'yup';

export interface IProps {
  onSuccess?: (data: Types.IEntity.GetOtp) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.GetOtp) => void;
  children(props: { state: Types.Actions.GetOtp; pending: boolean }): React.ReactNode;
}

const GetOtp: React.FC<IProps> = ({ children, onError, onSuccess, onLoading, onSettled }) => {
  const initialState: Types.Actions.GetOtp = {
    errors: {}
  };

  const [state, action, pending] = useActionState(
    async (_prevState: Types.Actions.GetOtp, formData: FormData): Promise<Types.Actions.GetOtp> => {
      const values = {
        phone: (formData.get('phone') as string) || '',
        password: (formData.get('password') as string) || ''
      };

      const errorMessages: Record<string, string> = {};

      const Schema = yup.object().shape({
        phone: yup.string().min(5).required(),
        password: yup.string().min(5).required()
      });

      Schema.validate(values, { abortEarly: false })
        .then(() => {
          Actions.GetOtp({
            values: values,
            onError,
            onSettled,
            onSuccess,
            onLoading
          });
        })
        .catch(err => {
          err.inner.forEach((e: any) => {
            errorMessages[e.path] = e.message;
          });
          console.log(errorMessages);
        });

      return {
        errors: errorMessages
      };
    },
    initialState
  );

  return <form action={action}>{children({ state, pending })}</form>;
};

export default GetOtp;
