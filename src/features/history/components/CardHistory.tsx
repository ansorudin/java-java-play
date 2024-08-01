import { Box, Text, Image } from '@gluestack-ui/themed';
import { FC } from 'react';
import { HistoryType, TransactionType } from '../../../stores/type';

interface CardHistoryProps {
  playerImage: string;
  playerName: string;
  transaction: string;
  amount: number;
  type: HistoryType;
  color: string;
}

export const CardHistory: FC<CardHistoryProps> = ({
  playerImage,
  playerName,
  transaction,
  amount,
  type,
  color,
}) => {
  return (
    <Box
      mb={16}
      flexDirection="row"
      justifyContent="space-between"
      bgColor="$white"
      shadowColor="$white"
      paddingHorizontal={10}
      paddingVertical={10}
      rounded={10}>
      <Box flexDirection="row" gap={10}>
        <Image
          height={35}
          bgColor={color}
          width={35}
          rounded="$full"
          borderWidth={1}
          borderColor="$secondary300"
          alt="image"
          source={playerImage}
        />
        <Box>
          <Text bold size="sm">
            {playerName}
          </Text>
          <Text size="xs">{transaction}</Text>
        </Box>
      </Box>
      <Text size="sm" color={type === HistoryType.Income ? '$green400' : '$red400'}>
        {type === HistoryType.Payment ? '-' : '+'}
        Rp {amount.toLocaleString()}
      </Text>
    </Box>
  );
};
