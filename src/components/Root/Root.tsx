'use client';

import { type PropsWithChildren, useEffect } from 'react';
import { initData, miniApp, useLaunchParams, useSignal } from '@telegram-apps/sdk-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorPage } from '@/components/ErrorPage';
import { useTelegramMock } from '@/hooks/useTelegramMock';
import { useDidMount } from '@/hooks/useDidMount';
import { useClientOnce } from '@/hooks/useClientOnce';
import { setLocale } from '@/i18n/locale';
import { init } from '@/core/init';

import { AppRoot } from '@telegram-apps/telegram-ui';

import Providers from '@/providers/Root';

function RootInner({ children }: PropsWithChildren) {
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

  const lp = useLaunchParams();
  const debug = isDev || lp.startParam === 'debug';

  // Initialize the library.
  useClientOnce(() => {
    init(debug);
  });

  const isDark = useSignal(miniApp.isDark);

  useEffect(() => {
    if (isDark) {
      miniApp.setBackgroundColor('#000000');
    } else {
      miniApp.setBackgroundColor('#FFFFFF');
    }
  }, [isDark]);

  const initDataUser = useSignal(initData.user);

  // Set the user locale.
  useEffect(() => {
    if (initDataUser) {
      setLocale(initDataUser.languageCode);
    }
  }, [initDataUser]);

  return (
    <AppRoot>
      <Providers>{children}</Providers>
    </AppRoot>
  );
}

export function Root(props: PropsWithChildren) {
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div>Loading</div>
  );
}
