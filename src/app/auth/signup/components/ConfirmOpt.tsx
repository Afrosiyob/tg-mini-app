'use client';

import React, { useEffect } from 'react';

import * as Actions from '@/modules/signup/actions';
import * as Context from '@/modules/signup/context';
import * as Stepper from '@/modules/stepper';

import { PinInput } from '@telegram-apps/telegram-ui';

import classes from './style.module.scss';

const ConfirmOtp: React.FC = () => {
  const [verifyCode, setVerifyCode] = React.useState<string>('');

  const stepperContext = Stepper.useContext();
  const { state, methods } = Context.useContext();
  const { goTo } = stepperContext;

  const onChangeHandler = (value: number[]) => {
    setVerifyCode(value.join(''));
  };

  useEffect(() => {
    if (verifyCode.length === 6) {
      Actions.ConfirmOtp({
        values: {
          verifyCode,
          verifyId: state.verifyId
        },
        onSuccess(data) {
          methods.setValue({
            verifyId: data.verifyId
          });
          goTo('setProfileInfo');
        }
      });
    }
  }, [verifyCode]);

  return (
    <div className={classes.wrapper}>
      <PinInput label="enter confirm code" pinCount={6} onChange={onChangeHandler} />
    </div>
  );
};

export default ConfirmOtp;
