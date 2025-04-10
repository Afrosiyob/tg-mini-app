'use client';

import React from 'react';

import * as Types from '../types';

import context from './context';

const useContext = (): Types.IContext.Value => React.useContext(context);

export default useContext;
