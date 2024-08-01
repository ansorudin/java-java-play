import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Keyboard, Platform, ScrollView } from 'react-native';
import { FC, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { DataConfirmationProps } from '../../components/Confirmation';
import { IdataProfile } from '../../stores/datas/type';
import { KeyboardAvoidingView } from 'react-native';
import { TransactionType, HistoryType } from '../../stores/type';
import { TopupBank } from './components/TopupBank';

export interface IdataTopUp {
  dataPlayer: IdataProfile;
  saldo: number;
}
interface TopupProps {
  data: IdataTopUp;
  navigateToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
}

export const Topup: FC<TopupProps> = ({ navigateToConfirmation, data, handleBack }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [amount, setAmount] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const { dataPlayer, saldo } = data;

  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  const handleButtonNext = () => {
    const regex = /^[0-9]+$/;
    if (!regex.test(amount)) {
      setErr('Your input not number, please correct your number');
      return;
    }

    const dataToSend: DataConfirmationProps = {
      playerData: dataPlayer,
      saldo,
      amount: parseInt(amount),
      transaction: TransactionType.TopUp,
      type: HistoryType.Income,
    };
    setAmount('');
    setErr('');
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

  const onChangeAmount = (e: string) => {
    setAmount(e);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <Box flex={1}>
        <Header title="Money Top Up" buttonHeader={handleBack} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
          <Box flex={1}>
            <BalanceCard currentSaldo={saldo} cardHolder={data.dataPlayer.playerName} />
            <TopupBank
              handleChangeAmount={onChangeAmount}
              err={err}
              amount={amount}
              handleInputNominal={handleInputNominal}
            />
          </Box>

          <Button isDisabled={!amount} variant="solid" size="md" mb={20} onPress={handleButtonNext}>
            <ButtonText size="sm" color="white">
              Next
            </ButtonText>
          </Button>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
};
