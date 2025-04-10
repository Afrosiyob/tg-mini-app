'use client';

import React from 'react';

import { Button, Cell, Input, Radio } from '@telegram-apps/telegram-ui';

import * as Context from '@/modules/signup/context';
import { useRouter } from 'next/navigation';

import classes from './style.module.scss';

import * as Forms from '@/modules/signup/forms';

const SetProfileInfo: React.FC = () => {
  const { state } = Context.useContext();

  const router = useRouter();

  return (
    <div className={classes.wrapper}>
      <Forms.SetProfileInfo
        verifyId={state.verifyId}
        onSuccess={() => {
          router.push('/dashboard');
        }}
      >
        {({ state, pending }) => (
          <>
            <div>
              <label htmlFor="firstname">firstname</label>
              <Input header="firstname" name="firstname" placeholder="firstname" />
            </div>
            {state?.errors?.firstname && <p>{state.errors.firstname}</p>}
            <div>
              <label htmlFor="lastname">lastname</label>
              <Input header="lastname" name="lastname" placeholder="lastname" />
            </div>
            {state?.errors?.lastname && <p>{state.errors.lastname}</p>}

            <div>
              <label htmlFor="birthday">birthday</label>
              <Input header="birthday" name="birthday" placeholder="birthday" />
            </div>
            {state?.errors?.birthday && <p>{state.errors.birthday}</p>}
            <Cell Component="label" before={<Radio name="radio" value="MALE" />} multiline>
              Male
            </Cell>
            <Cell Component="label" before={<Radio name="radio" value="FEMALE" />} multiline>
              Female
            </Cell>

            <div className={classes.buttons}>
              <Button mode="filled" size="m" disabled={pending} type="submit">
                Sign in
              </Button>
            </div>
          </>
        )}
      </Forms.SetProfileInfo>
    </div>
  );
};

export default SetProfileInfo;
