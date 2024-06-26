import { Text, VStack, Image } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface QuickButtonPropertyProps {
  active?: boolean;
  title: string;
  price: number;
  type: number;
  id: string | null;
  discount: boolean;
  saldo: number;
  onChangeAmount: (event: number, price: number, description: string, unit: string | null) => void;
}

export const QuickButtonProperty: FC<QuickButtonPropertyProps> = ({
  active,
  title,
  price,
  onChangeAmount,
  type,
  id,
  discount,
  saldo,
}) => {
  return (
    <TouchableOpacity onPress={() => onChangeAmount(type, price, title, id)}>
      <VStack
        display={saldo < price ? 'none' : 'flex'}
        width={100}
        alignItems="center"
        bgColor={active ? '$primary400' : '$warmGray200'}
        paddingVertical={15}
        rounded="$sm">
        <Image
          display={discount ? 'flex' : 'none'}
          position="absolute"
          w={40}
          h={45}
          right={2}
          rounded={10}
          source={require('../../../../asset/discount.png')}
          alt="card"
        />
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
