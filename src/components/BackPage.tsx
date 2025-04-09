'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';

import { useRouter } from 'next/navigation';

export function BackPage({
  children,
  back = true
}: PropsWithChildren<{
  back?: boolean;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (back) {
      backButton.show();
    } else {
      backButton.hide();
    }
  }, [back]);

  useEffect(() => {
    return backButton.onClick(() => {
      router.back();
    });
  }, [router]);

  return <>{children}</>;
}
