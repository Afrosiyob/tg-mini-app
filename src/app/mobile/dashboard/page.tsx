'use client';

import { Button } from '@telegram-apps/telegram-ui';
import React from 'react';

import * as Actions from '@/modules/signin/actions';

const Page: React.FC = () => {
  return (
    <div style={{ color: 'red' }}>
      mobile dashboard
      <Button
        id="logout"
        onClick={() => {
          Actions.Logout();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Page;
