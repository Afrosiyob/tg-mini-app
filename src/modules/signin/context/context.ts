'use client';

import { createContext } from 'react';

import * as Types from '../types';

const context = createContext<Types.IContext.Value>({
  state: {
    verifyId: '',
    verifyCode: ''
  },
  methods: {
    setValue: () => {},
    clearValue: () => {}
  }
});

export default context;

export const { Consumer } = context;
