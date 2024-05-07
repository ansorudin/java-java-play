import { Text, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';
import { TextInput } from 'react-native';
import { FC, useState } from 'react';
import { ButtonQuickAction } from './components/ButtonQuickAction';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { dataConfirmationProps } from '../../components/Confirmation';

interface TopupProps {
  navigateToConfirmation: (data: dataConfirmationProps) => void;
}

export const Topup: FC<TopupProps> = ({ navigateToConfirmation }) => {
  const [amount, setAmount] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  return (
    <Box flex={1}>
      <Header title="Money Top Up" buttonHeader={() => navigate('Profile')} />
      <Box flex={1}>
        <BalanceCard currentSaldo={60000} cardHolder="Siavash" />
        <Box marginHorizontal={4} flex={1} mt={40}>
          <Text bold>Enter Amount</Text>
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
          </Box>

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
        <Button
          isDisabled={!amount}
          variant="solid"
          size="md"
          mb={20}
          onPress={() =>
            navigateToConfirmation({
              playerName: 'Siavash',
              playerImage:
                'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
              amount: parseInt(amount),
              transaction: 'Top Up',
            })
          }>
          <ButtonText size="sm" color="white">
            Next
          </ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
