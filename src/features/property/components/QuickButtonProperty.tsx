import { Text, VStack } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface QuickButtonPropertyProps {
  active?: boolean;
  title: string;
  price: number;
  type: number;
  onChangeAmount: (event: number, price: number, id: string) => void;
}

export const QuickButtonProperty: FC<QuickButtonPropertyProps> = ({
  active,
  title,
  price,
  onChangeAmount,
  type,
}) => {
  return (
    <TouchableOpacity onPress={() => onChangeAmount(type, price, title)}>
      <VStack
        width={100}
        alignItems="center"
        bgColor={active ? '$primary400' : '$warmGray200'}
        paddingVertical={15}
        paddingHorizontal={22}
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
