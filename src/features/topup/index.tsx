import { Text, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Keyboard, Platform, ScrollView, TextInput } from 'react-native';
import { FC, useEffect, useRef, useState } from 'react';
import { ButtonQuickAction } from './components/ButtonQuickAction';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { DataConfirmationProps } from '../../components/Confirmation';
import { IdataProfile } from '../../stores/datas/type';
import { KeyboardAvoidingView } from 'react-native';

export interface DataTopUpProps extends IdataProfile {
  saldo: number;
}
interface TopupProps {
  data: DataTopUpProps;
  navigateToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
}

export const Topup: FC<TopupProps> = ({ navigateToConfirmation, data, handleBack }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [amount, setAmount] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  const { playerId, saldo, playerName, image } = data;

  const handleButtonNext = () => {
    setAmount('');
    const dataToSend: DataConfirmationProps = {
      playerId,
      saldo,
      playerName,
      playerImage: image,
      amount: parseInt(amount),
      transaction: 'Top Up',
    };

    navigateToConfirmation(dataToSend);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <Box flex={1}>
        <Header title="Money Top Up" buttonHeader={handleBack} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
          <Box flex={1}>
            <BalanceCard currentSaldo={saldo} cardHolder={playerName} />
            <Box marginHorizontal={4} flex={1} mt={40}>
              <Text bold>Enter Amount</Text>
              <Box marginTop={10} marginBottom={20}>
                <Box
                  borderWidth={1}
                  borderColor="$warmGray300"
                  pl={5}
                  paddingVertical={10}
                  rounded={3}>
                  <TextInput
                    style={{ color: 'black' }}
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
              onPress={handleButtonNext}>
              <ButtonText size="sm" color="white">
                Next
              </ButtonText>
            </Button>
          </Box>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
};
