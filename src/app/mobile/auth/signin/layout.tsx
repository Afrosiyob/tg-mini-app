import React from 'react';

import classes from './style.module.scss';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classes.wrapper}>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
