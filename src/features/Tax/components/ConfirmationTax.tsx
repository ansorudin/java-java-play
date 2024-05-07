import { Box, Text, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { Header } from '../../../components/Header';
import { FC, useState } from 'react';
import { ModalSuccess } from '../../../components/ModalSuccess';

interface ConfirmationTaxProps {
  handleBack: () => void;
  handleNextScreen: () => void;
  moveToHome: () => void;
  data: dataConfirmationTaxProps;
}

export interface dataConfirmationTaxProps {
  amount: number;
  methode: string;
  playerName?: string;
}

export const ConfirmationTax: FC<ConfirmationTaxProps> = ({
  handleBack,
  handleNextScreen,
  moveToHome,
  data,
}) => {
  const { amount, methode, playerName } = data;
  const textMethode = methode === 'nfc' ? 'NFC Card Methode ?' : `and transfer to ${playerName}`;
  const display = methode === 'nfc' ? 'using the' : '';
  const [openModal, setOpenModal] = useState<boolean>(false);

  const buttonContinue = () => {
    if (methode === 'nfc') {
      handleNextScreen();
    } else {
      setOpenModal(true);
    }
  };
  return (
    <Box flex={1}>
      <Header title="Confirmation" buttonHeader={handleBack} />
      <Box flex={1} justifyContent="center" alignItems="center" gap={40}>
        <Image w={230} h={230} source={require('../../../../asset/confirmation.png')} alt="icon" />
        <Text textAlign="center" paddingHorizontal={20} size="sm" color="$coolGray500">
          Are you sure that you want to transfer tax money with an amount of{' '}
          <Text size="sm" bold>
            {amount.toLocaleString()}
          </Text>{' '}
          <Text>{display} </Text>
          <Text size="sm" bold>
            {textMethode}
          </Text>
        </Text>
      </Box>
      <Box flexDirection="row" justifyContent="flex-end" gap={20}>
        <Button size="sm" variant="solid" action="negative" onPress={handleBack}>
          <ButtonText color="$blueGray100">Take me back</ButtonText>
        </Button>
        <Button size="sm" variant="solid" bgColor="$blueGray700" onPress={buttonContinue}>
          <ButtonText color="$blueGray100">Yes, I am</ButtonText>
        </Button>
      </Box>
      <ModalSuccess isOpen={openModal} text="Transfer tax money" navigateNextScreen={moveToHome} />
    </Box>
  );
};
