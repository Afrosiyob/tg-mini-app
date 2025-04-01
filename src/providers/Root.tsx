'use client';
import React, { PropsWithChildren } from 'react';
import QueryProvider from '@/providers/Query';

export const buildProvidersTree = (componentsWithProps: any[]) => {
  const initialComponent = ({ children }: PropsWithChildren) => <> {children} </>;

  return componentsWithProps.reduce(
    (AccumulatedComponents, [Provider, props = {}]) =>
      ({ children }: PropsWithChildren) => (
        <AccumulatedComponents>
          <Provider {...props}>{children} </Provider>
        </AccumulatedComponents>
      ),
    initialComponent
  );
};

const ProvidersTree = buildProvidersTree([[QueryProvider]]);

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => <ProvidersTree>{children}</ProvidersTree>;

export default RootProvider;
