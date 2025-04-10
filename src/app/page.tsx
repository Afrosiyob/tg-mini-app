'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import Link from 'next/link';

import { BackPage } from '@/components/BackPage';
import { LocaleSwitcher } from '@/components/LocalSwitcher/LocalSwitcher';
import dynamic from 'next/dynamic';

const Page = () => {
  const t = useTranslations('i18n');

  return (
    <BackPage back={false}>
      <div>
        <LocaleSwitcher />
        <h1>{t('header')}</h1>
        <Link href="/auth/signin">sign in</Link>
        <br />
        <Link href="/auth/signup">sign up</Link>
      </div>
    </BackPage>
  );
};

const PageClient = dynamic(() => Promise.resolve(Page), {
  ssr: false
});

export default function PageMain() {
  return <PageClient />;
}
