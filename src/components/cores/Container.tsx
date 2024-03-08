import { Box } from '@gluestack-ui/themed';
import React, { PropsWithChildren, ReactNode } from 'react';
import { DimensionValue, Platform, SafeAreaView } from 'react-native';

interface ContainerProps {
  header?: ReactNode;
  px?: string | number | DimensionValue;
  py?: string | number | DimensionValue;
}

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  header,
  px = '$5',
  py = '$5',
  children,
}) => {
  const android = Platform.OS === 'android';
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: android ? 35 : 0,
        paddingTop: android ? 20 : 0,
      }}>
      <Box flex={1}>
        {header}
        <Box flex={1} px={px as DimensionValue} py={py as DimensionValue}>
          {children}
        </Box>
      </Box>
    </SafeAreaView>
  );
};
