import React from 'react';

import * as Stepper from '@/modules/stepper';

import * as Components from './components';

const Page = () => {
  return (
    <div>
      <Stepper.Provider
        firstStepKey="getOtp"
        steps={{
          getOtp: {
            component: <Components.GetOtp />,
            next: 'confirmOtp'
          },
          confirmOtp: {
            component: <Components.ConfirmOtp />,
            prev: 'getOtp'
          }
        }}
      />
    </div>
  );
};

export default Page;
