'use client';

import React, { useActionState } from 'react';

import { CheckPhoneAction, GetOtpAction, LogoutAction } from '@/app/mobile/auth/signin/lib/actions';

import { Button, Input } from '@telegram-apps/telegram-ui';

const Page: React.FC = () => {
  const [state, action, pending] = useActionState(GetOtpAction, {});

  const onPhoneFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value;

    if (phone.length === 12) {
      CheckPhoneAction({ phone });
    }
  };

  return (
    <div>
      <form action={action}>
        <div>
          <label htmlFor="phone">phone</label>
          <Input onChange={onPhoneFieldHandler} header="phone" name="phone" placeholder="phone" />
        </div>
        {state?.errors?.phone && <p>{state.errors.phone}</p>}
        <div>
          <label htmlFor="password">password</label>
          <Input header="password" id="password" name="password" type="password" />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}

        <Button mode="filled" size="s" disabled={pending} type="submit">
          sign in
        </Button>
        <Button
          mode="filled"
          size="s"
          disabled={pending}
          onClick={() => {
            LogoutAction();
          }}
        >
          clear cookies
        </Button>
      </form>
    </div>
  );
};

export default Page;
