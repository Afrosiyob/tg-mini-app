import React, { PropsWithChildren } from 'react';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
