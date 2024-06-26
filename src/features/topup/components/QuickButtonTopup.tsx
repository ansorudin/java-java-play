import { Text, VStack } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface QuickButtonTopupProps {
  active?: boolean;
  title: string;
  type: number;
  onChangeAmount: (event: number) => void;
  display: boolean;
}

export const QuickButtonTopup: FC<QuickButtonTopupProps> = ({
  active,
  title,

  onChangeAmount,
  type,
  display,
}) => {
  return (
    <TouchableOpacity onPress={() => onChangeAmount(type)}>
      <VStack
        display={display ? 'flex' : 'none'}
        width={80}
        height={70}
        justifyContent="center"
        alignItems="center"
        bgColor={active ? '$primary400' : '$warmGray200'}
        paddingVertical={15}
        rounded="$sm">
        <Text size="sm" color={active ? '$white' : '$warmGray500'}>
          {title}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
