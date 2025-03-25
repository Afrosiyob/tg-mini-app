"use client";

import React, { useActionState } from "react";
import { loginAction } from "@/app/login/lib/actions";

import { Button, Input, Link } from "@telegram-apps/telegram-ui";

const Login = () => {
  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <div>
      <form action={action}>
        <div>
          <label htmlFor="username">username</label>
          <Input header="username" name="username" placeholder="username" />
        </div>
        {state?.errors?.username && <p>{state.errors.username}</p>}
        <div>
          <label htmlFor="password">password</label>
          <Input
            header="password"
            id="password"
            name="password"
            type="password"
          />
        </div>
        {state?.errors?.password && <p>{state.errors.password}</p>}

        <Button mode="filled" size="s" disabled={pending} type="submit">
          Login
        </Button>

        <Link href="/registration">Registration</Link>
      </form>
    </div>
  );
};

export default Login;
