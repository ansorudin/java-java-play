import React, { ReactNode } from 'react';
import { Box, ChevronLeftIcon, HStack, Icon, Pressable, Text } from '@gluestack-ui/themed';
import { DimensionValue } from 'react-native';

interface NavigationHeaderProps {
  title?: string;
  leftButtonIcon?: ReactNode;
  leftButtonIconColor?: string;
  leftButtonOnPress?: () => void;
  px?: number | string;
  py?: number | string;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  leftButtonIcon,
  leftButtonIconColor = '#000000',
  leftButtonOnPress,
  px = '$3.5',
  py = '$2',
}) => {
  return (
    <Box px={px as DimensionValue} py={py as DimensionValue}>
      <HStack alignItems="center" gap={7}>
        {leftButtonOnPress && (
          <Pressable onPress={leftButtonOnPress}>
            {leftButtonIcon || (
              <Icon as={ChevronLeftIcon} w="$6" h="$6" color={leftButtonIconColor} />
            )}
          </Pressable>
        )}
        <Text>{title}</Text>
      </HStack>
    </Box>
  );
};
