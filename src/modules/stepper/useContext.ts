'use client';

import React from 'react';

import context from './context';
import { IContextProps } from './types';

const useContext = (): IContextProps => React.useContext(context);

export default useContext;
