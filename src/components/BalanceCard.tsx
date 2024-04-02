import { Box, Text, Image } from '@gluestack-ui/themed';
import { FC } from 'react';

interface BalanceCardProps {
  currentSaldo: number;
  cardHolder: string;
}

export const BalanceCard: FC<BalanceCardProps> = ({ currentSaldo, cardHolder }) => {
  return (
    <Box h="$1/3">
      <Box position="absolute" width="$full" h="$full">
        <Image
          w="$full"
          h="$full"
          rounded={10}
          source={require('../../asset/Standar.jpg')}
          alt="card"
        />
      </Box>
      <Box
        h="$full"
        marginBottom={20}
        paddingVertical={20}
        paddingHorizontal={25}
        justifyContent="space-between"
        gap={10}>
        <Box gap={4}>
          <Text color="white" size="sm">
            Available Balance
          </Text>
          <Text color="white" size="xl" bold>
            Rp {currentSaldo.toLocaleString()}
          </Text>
        </Box>

        <Box>
          <Text color="white" size="xs">
            Card Holder
          </Text>
          <Text color="white" size="lg">
            {cardHolder}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
