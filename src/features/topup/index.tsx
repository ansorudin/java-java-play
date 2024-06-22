import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { Keyboard, Platform, ScrollView } from 'react-native';
import { FC, useEffect, useRef, useState } from 'react';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { DataConfirmationProps } from '../../components/Confirmation';
import { IdataProfile } from '../../stores/datas/type';
import { KeyboardAvoidingView } from 'react-native';
import { NavigationBar } from './components/NavigationBar';
import { TopupBank } from './components/TopupBank';
import { RentalIncome } from './components/RentalIncome';

export interface DataTopUpProps extends IdataProfile {
  saldo: number;
}
interface TopupProps {
  data: DataTopUpProps;
  navigateToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
}

export enum ActiveTopUpType {
  TopUp = 'Income from Topup Bank',
  RentForHouse = 'Rent for House income',
  RentForHotel = 'Rent for Hotel income',
  RentForland = 'Rent for Land income',
}

export const Topup: FC<TopupProps> = ({ navigateToConfirmation, data, handleBack }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeNav, setActiveNav] = useState<string>(ActiveTopUpType.TopUp);
  const [amount, setAmount] = useState<string>('');
  const [err, setErr] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [block, setBlock] = useState<string | null>(null);

  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  const { playerId, saldo, playerName, image } = data;

  const handleButtonNext = () => {
    const regex = /^[0-9]+$/;
    if (!regex.test(amount)) {
      setErr('Your input not number, please correct your number');
      return;
    }

    const dataToSend: DataConfirmationProps = {
      playerId,
      saldo,
      playerName,
      playerImage: image,
      amount: parseInt(amount),
      transaction: 'Top Up',
      description:
        activeNav === ActiveTopUpType.RentForland
          ? `Rent for Land block ${block}`
          : `Rent for ${description} block ${block}`,
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

  const onChangeNavigation = (component: string) => {
    setAmount('');
    setDescription('');
    setActiveNav(component);
  };

  const onChangeAmount = (e: string) => {
    setAmount(e);
  };

  const onTopup = (price: number, desc: string, unit: string | null) => {
    const strAmount = price.toString();
    setDescription(desc);
    setBlock(unit);
    setAmount(strAmount);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <Box flex={1}>
        <Header title="Money Top Up" buttonHeader={handleBack} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollViewRef}>
          <Box flex={1}>
            <BalanceCard currentSaldo={saldo} cardHolder={playerName} />
            <NavigationBar onChangeNavigation={onChangeNavigation} activeComponent={activeNav} />
            <TopupBank
              handleChangeAmount={onChangeAmount}
              active={activeNav}
              err={err}
              amount={amount}
              handleInputNominal={handleInputNominal}
            />
            <RentalIncome
              active={activeNav === ActiveTopUpType.RentForland}
              activeType={activeNav}
              onTopup={onTopup}
            />
            <RentalIncome
              active={activeNav === ActiveTopUpType.RentForHouse}
              activeType={activeNav}
              onTopup={onTopup}
            />
            <RentalIncome
              active={activeNav === ActiveTopUpType.RentForHotel}
              activeType={activeNav}
              onTopup={onTopup}
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
