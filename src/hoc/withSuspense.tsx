import React, { Suspense } from 'react';
import { LoadingWrapper } from '@organisms/LoadingWrapper';

export const withSuspense = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <Suspense fallback={<LoadingWrapper />}>
      <Component {...props} />
    </Suspense>
  );
};

