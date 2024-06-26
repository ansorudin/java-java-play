import { Box, VStack, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface ButtonActive {
  onPress: () => void;
  title: string;
  active?: boolean;
}

export const ButtonActive: FC<ButtonActive> = ({ onPress, title, active }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <VStack paddingVertical={10} gap="$1" justifyContent="center">
        <Text
          textAlign="center"
          bold={active}
          size={active ? 'sm' : 'sm'}
          color={active ? '$primary300' : '$coolGray400'}>
          {title}
        </Text>
        <Box display={active ? 'flex' : 'none'} bg="$primary300" height={3} rounded="$sm" />
      </VStack>
    </TouchableOpacity>
  );
};
