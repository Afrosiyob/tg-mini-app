'use client';

import { Button } from '@telegram-apps/telegram-ui';
import React from 'react';

import { LogoutAction } from '@/app/mobile/auth/signin/lib/actions';

const Page: React.FC = () => {
  return (
    <div style={{ color: 'red' }}>
      mobile dashboard
      <Button
        onClick={() => {
          LogoutAction();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Page;
