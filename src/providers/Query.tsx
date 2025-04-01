'use client';

import React, { PropsWithChildren } from 'react';

import { useLocale } from 'next-intl';
import get from 'lodash/get';

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const NOT_FOUND = '404';
const REQUEST_ERROR = '4';
const SERVER_ERROR = '5';

const queryResponseHandler = (data: any) => {
  const locale = useLocale();

  if (String(get(data, 'response.status')).startsWith(NOT_FOUND)) {
    return;
  }

  if (String(get(data, 'response.status')).startsWith(SERVER_ERROR)) {
    console.log(get(data, 'response.data.error.message')?.[locale] || 'Неизвестная ошибка сервера');
  }

  if (String(get(data, 'response.status')).startsWith(REQUEST_ERROR)) {
    console.log(get(data, 'response.data.error.message')?.[locale] || 'Неизвестная ошибка');
  }
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: queryResponseHandler
  }),
  mutationCache: new MutationCache({
    onError: queryResponseHandler
  })
});

const QueryProvider: React.FC = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default QueryProvider;
