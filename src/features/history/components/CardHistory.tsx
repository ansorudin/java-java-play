import { Box, Text, Image } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TransactionType } from '../../../components/Confirmation';

interface CardHistoryProps {
  playerImage: number;
  playerName: string;
  transaction: string;
  amount: number;
  recipients?: string;
}

export const CardHistory: FC<CardHistoryProps> = ({
  playerImage,
  playerName,
  transaction,
  amount,
}) => {
  console.log('iniiiiiiiiiitransaction');

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
      <Text
        size="sm"
        color={
          transaction === TransactionType.TopUp ||
          transaction === TransactionType.Earning ||
          transaction === TransactionType.EarningTax
            ? '$green400'
            : '$red400'
        }>
        {transaction === TransactionType.TopUp ||
        transaction === TransactionType.Earning ||
        transaction === TransactionType.EarningTax
          ? '+'
          : '-'}
        Rp {amount.toLocaleString()}
      </Text>
    </Box>
  );
};
