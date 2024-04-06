import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { ButtonQuickAction } from '../topup/components/ButtonQuickAction';

import { BalanceCard } from '../../components/BalanceCard';
interface TaxBalanceProps {
  moveNfc: () => void;
}
export const TaxBalance: FC<TaxBalanceProps> = ({ moveNfc }) => {
  const [amount, setAmount] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  return (
    <Box flex={1}>
      <Box flex={1} bg="$red400">
        <BalanceCard currentSaldo={100000} cardHolder="aias" />
        <Box marginTop={10} marginBottom={20}>
          <Box borderWidth={1} borderColor="$warmGray300" pl={5} paddingVertical={10} rounded={3}>
            <TextInput
              keyboardType="number-pad"
              value={amount}
              onChangeText={handleInputNominal}
              placeholder="Please enter amount"
            />
          </Box>
          <Text paddingLeft={5} size="xs" italic>
            Exp. 200.000
          </Text>

          <Text bold>Quick Actions</Text>
          <Box flexDirection="row" justifyContent="space-between" marginTop={10}>
            <ButtonQuickAction
              buttonText="Rp.100.000"
              handleChangeAmount={() => setAmount('100000')}
            />
            <ButtonQuickAction
              buttonText="Rp.200.000"
              handleChangeAmount={() => setAmount('200000')}
            />
            <ButtonQuickAction
              buttonText="Rp.300.000"
              handleChangeAmount={() => setAmount('300000')}
            />
          </Box>
        </Box>
      </Box>

      <Button
        mb={20}
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Transfer Without Card</ButtonText>
      </Button>

      <Button
        mb={20}
        size="md"
        variant="solid"
        action="primary"
        onPress={moveNfc}
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Transfer With Card</ButtonText>
      </Button>
    </Box>
  );
};
