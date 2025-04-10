'use client';

import React, { useEffect } from 'react';

import * as Actions from '@/modules/signin/actions';
import * as Context from '@/modules/signin/context';

import { PinInput } from '@telegram-apps/telegram-ui';

import classes from './style.module.scss';

const ConfirmOtp: React.FC = () => {
  const [verifyCode, setVerifyCode] = React.useState<string>('');
  const { state } = Context.useContext();

  const onChangeHandler = (value: number[]) => {
    setVerifyCode(value.join(''));
  };

  useEffect(() => {
    if (verifyCode.length === 6) {
      Actions.ConfirmOtp({
        values: {
          verifyCode,
          verifyId: state.verifyId
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
