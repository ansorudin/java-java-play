import { Box, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { Image } from 'react-native';

interface BalanceCardProps {
  currentSaldo: number;
  cardHolder: string;
}

export const BalanceCard: FC<BalanceCardProps> = ({ currentSaldo, cardHolder }) => {
  return (
    <Box>
      <Box position="absolute">
        <Image
          source={require('../../asset/Standar.jpg')}
          alt="card"
          style={{ height: 165, borderRadius: 10 }}
        />
      </Box>
      <Box
        marginBottom={20}
        height={165}
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
