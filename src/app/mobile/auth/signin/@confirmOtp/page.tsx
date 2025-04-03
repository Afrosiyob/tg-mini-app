'use client';

import React, { useActionState } from 'react';

import { ConfirmOtpAction } from '@/app/mobile/auth/signin/lib/actions';

import { Button, Input } from '@telegram-apps/telegram-ui';

import { LogoutAction } from '@/app/mobile/auth/signin/lib/actions';

const Page: React.FC = () => {
  const [state, action, pending] = useActionState(ConfirmOtpAction, {});

  return (
    <div>
      <form action={action}>
        <div>
          <label htmlFor="verifyCode">verifyCode</label>
          <Input header="verifyCode" name="verifyCode" placeholder="verifyCode" />
        </div>
        {state?.errors?.verifyCode && <p>{state.errors.verifyCode}</p>}

        <Button mode="filled" size="s" disabled={pending} type="submit">
          send code
        </Button>
        <Button
          onClick={() => {
            LogoutAction();
          }}
        >
          logout
        </Button>
      </form>
    </div>
  );
};

export default Page;
