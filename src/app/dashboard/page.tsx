'use client';

import { Button } from '@telegram-apps/telegram-ui';
import React from 'react';

import * as ModuleTokens from '@/modules/tokens';

const Page: React.FC = () => {
  return (
    <div style={{ color: 'red' }}>
      mobile dashboard
      <Button
        id="logout"
        onClick={() => {
          ModuleTokens.Actions.Logout();
        }}
      >
        logout
      </Button>
    </div>
  );
};

export default Page;
