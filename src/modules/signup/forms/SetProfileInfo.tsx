'use client';

import React, { useActionState } from 'react';

import * as Actions from '../actions';
import * as Types from '../types';
import * as yup from 'yup';

export interface IProps {
  verifyId: string;
  onSuccess?: (data: Types.IEntity.Tokens) => void;
  onError?: (error: string) => void;
  onLoading?: (loading: boolean) => void;
  onSettled?: (data: Types.IEntity.Tokens) => void;
  children(props: { state: Types.Actions.SetProfileInfo; pending: boolean }): React.ReactNode;
}

const SetProfileInfo: React.FC<IProps> = ({ verifyId, children, onError, onSuccess, onLoading, onSettled }) => {
  const [state, action, pending] = useActionState(
    async (_prevState: Types.Actions.SetProfileInfo, formData: FormData): Promise<Types.Actions.SetProfileInfo> => {
      const firstname = (formData.get('firstname') as string) || '';
      const lastname = (formData.get('lastname') as string) || '';
      const birthday = (formData.get('birthday') as string) || '';
      const gender = (formData.get('gender') as string) || '';
      const image = (formData.get('image') as string) || '';

      const Schema = yup.object().shape({
        firstname: yup.string().required(),
        lastname: yup.string().required(),
        birthday: yup.string().required(),
        gender: yup.string().required()
      });

      const validatedFields = Schema.isValid({
        firstname,
        lastname,
        birthday,
        gender
      });

      if (!validatedFields) {
        return {
          errors: {
            firstname: ['invalid firstname'],
            lastname: ['invalid lastname'],
            birthday: ['invalid birthday'],
            gender: ['invalid gender'],
            image: ['invalid, image']
          },
          isValid: false,
          isError: true,
          isLoading: false
        };
      }

      return await Actions.SetProfileInfo({
        values: {
          verifyId,
          firstname,
          lastname,
          birthday,
          gender,
          image
        },
        onError,
        onSettled,
        onSuccess,
        onLoading
      });
    },
    {}
  );

  return <form action={action}>{children({ state, pending })}</form>;
};

export default SetProfileInfo;
