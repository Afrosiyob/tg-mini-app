'use client';

import React, { useEffect, useState } from 'react';

import Context from './context';
import { IContextProps, IProviderProps } from './types';

interface IProps extends IProviderProps {
  children?: (props: IContextProps) => React.ReactNode;
}

const Provider: React.FC<IProps> = ({
  firstStepKey = 'first',
  steps,
  onFirst = () => {},
  onLast = () => {},
  onChange = () => {},
  children
}) => {
  const [step, setStep] = useState(firstStepKey);

  useEffect(() => {
    onChange(step);
    // eslint-disable-next-line
  }, [step]);

  useEffect(() => {
    setStep(firstStepKey);
  }, [firstStepKey]);

  const currentStep = steps[step] || {};

  const isFirst = step === firstStepKey;
  const isLast = !currentStep?.next;

  const canPrev = !!currentStep?.prev;
  const canNext = !isLast;

  const prev = () => {
    if (canPrev && currentStep.prev) {
      setStep(currentStep.prev);
    }
  };

  const next = () => {
    if (canNext && currentStep.next) {
      setStep(currentStep.next);
    }
  };

  const goToFirst = () => {
    setStep(firstStepKey);
  };

  const goTo = (step: string) => {
    setStep(step);
  };

  const value = {
    component: currentStep?.component,
    step,
    steps,
    currentStep,
    isFirst,
    isLast,
    canPrev,
    canNext,
    prev,
    next,
    goTo,
    goToFirst,
    onFirst,
    onLast
  } as IContextProps;

  // eslint-disable-next-line no-console
  if (process.env.NODE_ENV === 'development') console.log('Stepper Context:', value);

  return <Context.Provider {...{ value }}>{children ? children(value) : value.component}</Context.Provider>;
};

export default Provider;
