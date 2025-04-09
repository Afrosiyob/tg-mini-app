'use client';

import { createContext } from 'react';

import { IContextProps } from './types';

const context = createContext<IContextProps>({
  component: null,
  step: 'start',
  steps: {},
  currentStep: {},
  isFirst: false,
  isLast: false,
  canPrev: false,
  canNext: false,
  prev: () => {},
  next: () => {},
  goTo: () => {},
  goToFirst: () => {},
  onFirst: () => {},
  onLast: () => {}
});

export default context;
