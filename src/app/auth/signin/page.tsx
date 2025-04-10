import React from 'react';

import * as Stepper from '@/modules/stepper';
import * as Context from '@/modules/signin/context';

import * as Components from './components';

const Page = () => {
  return (
    <div>
      <Context.Provider>
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
      </Context.Provider>
    </div>
  );
};

export default Page;
