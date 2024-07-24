import { Box, Text, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { Header } from '../../../components/Header';
import { FC, useState } from 'react';
import { ModalSuccess } from '../../../components/ModalSuccess';
import { useGlobalStore } from '../../../stores';
import { History, IPlayer } from '../../../stores/type';
import { ModalFailed } from '../../../components/ModalFailed';

interface ConfirmationTaxProps {
  handleBack: () => void;
  moveToHome: () => void;
  data: dataConfirmationTaxProps;
}

export interface dataConfirmationTaxProps {
  amount: number;
  methode: string;
  playerName: string;
}

export enum MethodeType {
  NfC = 'nfc',
  NoCard = 'noCard',
}

export const ConfirmationTax: FC<ConfirmationTaxProps> = ({ handleBack, moveToHome, data }) => {
  const { getSelectedProfile, onChangeTax, taxAmount, setDataHistory, activePlayers } =
    useGlobalStore();
  const { amount, methode, playerName } = data;
  const playerInfo = getSelectedProfile(playerName);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  const buttonContinue = () => {
    try {
      const activePlayer = activePlayers.find((player: IPlayer) => player.id === playerName);
      if (activePlayer) {
        activePlayer.saldo = amount + activePlayer.saldo;
        onChangeTax(taxAmount - amount);
      } else {
        throw new Error('Recipient data not found');
      }

      if (playerInfo) {
        const dataToSend: History = {
          id: playerName,
          playerName: 'Tax Earning',
          playerImage: parseInt(playerInfo.image),
          transaction: 'Tax Transfer',
          amount,
        };

        setDataHistory(dataToSend, playerName);
        setOpenModal(true);
      } else {
        throw new Error(`${playerName} is not registered as an active player`);
      }
    } catch (error: any) {
      console.log(error);
      setErr(error.message);
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
            {methode === MethodeType.NfC
              ? `${amount.toLocaleString()} to ${playerInfo?.playerName}`
              : amount.toLocaleString()}
          </Text>{' '}
          <Text>{methode === MethodeType.NfC ? 'using the' : ''} </Text>
          <Text size="sm" bold>
            {methode === MethodeType.NfC
              ? 'NFC Card Methode ?'
              : `and transfer to ${playerInfo?.playerName}`}
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
      <ModalFailed isOpen={err ? true : false} navigateNextScreen={moveToHome} text={err} />
    </Box>
  );
};
