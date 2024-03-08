import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

const errorHandler = () => {
  // TODO: Report to Sentry crash reporting.
};

// TODO: Design + add fallback to login screen/restarting the app.
const ErrorFallback = () => {
  return (
    <View>
      <Text>Something went wrong</Text>
    </View>
  );
};

export const ErrorBoundary: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      {children}
    </ReactErrorBoundary>
  );
};
