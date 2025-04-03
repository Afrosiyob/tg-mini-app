import { cookies } from 'next/headers';
import React from 'react';

const Layout = async ({
  children,
  getOtp,
  confirmOtp
}: {
  children: React.ReactNode;
  getOtp: React.ReactNode;
  confirmOtp: React.ReactNode;
}) => {
  const cookieStore = await cookies();
  const verifyId = cookieStore.get('verify-id')?.value;
  return (
    <div>
      <div>{verifyId ? confirmOtp : getOtp}</div>
    </div>
  );
};

export default Layout;
