'use client';

import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';
import Link from 'next/link';

import { Page as PageComponent } from '@/components/Page';
import { LocaleSwitcher } from '@/components/LocalSwitcher/LocalSwitcher';
import dynamic from 'next/dynamic';

const Page = () => {
  const t = useTranslations('i18n');

  return (
    <PageComponent back={false}>
      <div>
        <LocaleSwitcher />
        <h1>{t('header')}</h1>
        <Link href="/mobile/auth/signin">sign in</Link>
        <br />
        <Link href="/mobile/auth/signup">sign up</Link>
      </div>
    </PageComponent>
  );
};

const PageClient = dynamic(() => Promise.resolve(Page), {
  ssr: false
});

export default function PageMain() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageClient />
    </Suspense>
  );
}
