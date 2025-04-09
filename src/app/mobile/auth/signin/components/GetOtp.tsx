'use client';

import React from 'react';

import * as Actions from '@/modules/signin/actions';

import { Button, Input } from '@telegram-apps/telegram-ui';
import * as Stepper from '@/modules/stepper';
import classes from './style.module.scss';
import { useRouter } from 'next/navigation';

import * as Forms from '@/modules/signin/forms';

const GetOtp: React.FC = () => {
  const stepperContext = Stepper.useContext();

  const { goTo } = stepperContext;

  const router = useRouter();

  const onPhoneFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;

    if (phone.length === 12) {
      Actions.CheckPhone({
        values: { phone },
        onSuccess: data => {
          if (!data.exists) {
            router.push('/mobile/auth/signup');
          }
        }
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Forms.GetOtp
        onSuccess={() => {
          goTo('confirmOtp');
        }}
      >
        {({ state, pending }) => (
          <>
            <div>
              <label htmlFor="phone">Phone</label>
              <Input header="Phone" onChange={onPhoneFieldHandler} name="phone" placeholder="Phone" />
            </div>
            {state?.errors?.phone && <p>{state.errors.phone}</p>}
            <div>
              <label htmlFor="password">Password</label>
              <Input header="Password" id="password" name="password" type="password" placeholder="Password" />
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <div className={classes.buttons}>
              <Button mode="filled" size="m" disabled={pending} type="submit">
                Sign in
              </Button>
              <Button
                mode="filled"
                size="m"
                disabled={pending}
                onClick={() => {
                  router.push('/mobile/auth/signup');
                }}
              >
                Sign up
              </Button>
            </div>
          </>
        )}
      </Forms.GetOtp>
    </div>
  );
};

export default GetOtp;
