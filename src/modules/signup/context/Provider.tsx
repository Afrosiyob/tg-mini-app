'use client';

import { useState } from 'react';

import * as Types from '../types';

import Context from './context';

interface IProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProps> = ({ children }) => {
  const [state, setState] = useState<Types.IContext.State>({
    verifyId: '',
    verifyCode: ''
  });

  const setValue = (values: any): void => {
    setState(prev => ({ ...prev, ...values }));
  };

  const clearValue = () => {
    setState({
      verifyId: '',
      verifyCode: ''
    });
  };

  const value = {
    state,
    methods: {
      setValue,
      clearValue
    }
  };

  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log('Signin Context:', state);

  return <Context.Provider value={{ ...value }}>{children}</Context.Provider>;
};

export default Provider;
