import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { MainErrorFallback } from './components/errors/main';
import { Spinner } from './components/core/ui';
import { ThemeProvider } from './components/core/theme-provider/theme-provider';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
