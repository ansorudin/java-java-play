import { Text, VStack } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface QuickButtonTopupProps {
  active?: boolean;
  title: string;
  price: number;
  type: number;
  id: string | null;
  onChangeAmount: (event: number, price: number, description: string, unit: string | null) => void;
  display: boolean;
}

export const QuickButtonTopup: FC<QuickButtonTopupProps> = ({
  active,
  title,
  price,
  onChangeAmount,
  type,
  id,
  display,
}) => {
  return (
    <TouchableOpacity onPress={() => onChangeAmount(type, price, title, id)}>
      <VStack
        display={display ? 'flex' : 'none'}
        width={100}
        alignItems="center"
        bgColor={active ? '$primary400' : '$warmGray200'}
        paddingVertical={15}
        rounded="$sm">
        <Text size="sm" color={active ? '$white' : '$warmGray500'}>
          {title}
        </Text>

        <Text size="xs" color={active ? '$white' : '$warmGray500'}>
          <Text size="xs" strikeThrough bold color={active ? '$white' : '$warmGray500'}>
            M
          </Text>{' '}
          {price.toLocaleString()}
        </Text>
      </VStack>
    </TouchableOpacity>
  );
};
