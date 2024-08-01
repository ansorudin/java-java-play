import { Box, Text, Button, Image, ButtonText } from '@gluestack-ui/themed';
import { ModalSuccess } from './ModalSuccess';
import { FC, useState } from 'react';
import { ItemTransaction } from './ItemTransaction';
import { Header } from './Header';
import { useGlobalStore } from '../stores';
import { ModalFailed } from './ModalFailed';
import { IdataProfile } from '../stores/datas/type';
import { History, HistoryType, TransactionType } from '../stores/type';

interface ConfirmationProps {
  handleBack: () => void;
  navigateToHome: () => void;
  data: DataConfirmationProps;
}

interface DataConfirmationProps {
  playerData: IdataProfile;
  recipientData?: IdataProfile;
  saldo: number;
  amount: number;
  transaction: TransactionType;
  type: HistoryType;
  description?: string;
  discount?: boolean;
}

export const Confirmation: FC<ConfirmationProps> = ({ data, handleBack, navigateToHome }) => {
  const { taxAmount, onChangeTax, setSaldoPlayer, activePlayers, setDataHistory, dataOtherPlayer } =
    useGlobalStore();
  const { playerData, transaction, amount, recipientData, description, saldo, discount, type } =
    data;

  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalFailed, setModalFailed] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  const handleClose = () => {
    setOpenModalSuccess(false);
    navigateToHome();
  };

  const handleButtonContinue = () => {
    console.log('halo');
    const activePlayer = activePlayers.find(player => player.id === playerData.playerId);

    if (!activePlayer) {
      setModalFailed(true);
      setErr('Recipient Data not found');
      console.log('Recipient Data not found');

      return;
    }

    let playerSaldo = saldo;
    if (transaction === TransactionType.TopUp) {
      playerSaldo = amount + saldo;
    } else if (transaction === TransactionType.Bank) {
      playerSaldo = saldo - amount;
    } else if (transaction === TransactionType.Tax) {
      playerSaldo = saldo - amount;
      onChangeTax(taxAmount + amount);
    } else if (transaction === TransactionType.OtherPlayer && recipientData) {
      playerSaldo = saldo - amount;
      const recipient = activePlayers.find(player => player.id === recipientData.playerId);
      if (recipient) {
        const oldSaldo = recipient.saldo;
        const dataToSend: History = {
          ...playerData,
          amount,
          transaction: TransactionType.Earning,
          type: HistoryType.Income,
        };
        setSaldoPlayer(recipient.id, amount + oldSaldo);
        setDataHistory(dataToSend, recipientData.playerId);
      } else {
        setModalFailed(true);
        setErr('Recipient Data not found');
      }
    } else if (transaction === TransactionType.property) {
      playerSaldo = saldo - amount;
    } else if (transaction === TransactionType.house) {
      playerSaldo = saldo - amount;
    } else if (transaction === TransactionType.hotel) {
      playerSaldo = saldo - amount;
    }

    if (!openModalFailed) {
      const bankImage = dataOtherPlayer.bank.image;
      const taxImage = dataOtherPlayer.tax.image;
      const playerName =
        transaction === TransactionType.Bank || transaction === TransactionType.TopUp
          ? 'Bank'
          : 'Tax';
      const image =
        transaction === TransactionType.Bank || transaction === TransactionType.TopUp
          ? bankImage
          : taxImage;
      const color =
        transaction === TransactionType.Bank || transaction === TransactionType.TopUp
          ? 'white'
          : 'black';

      const datas: IdataProfile = recipientData
        ? recipientData
        : { ...playerData, playerName, image, color };

      const dataToSend: History = {
        ...datas,
        amount,
        transaction,
        type,
      };

      setDataHistory(dataToSend, playerData.playerId);
      setSaldoPlayer(playerData.playerId, playerSaldo);
    }

    navigateToHome();
  };

  return (
    <Box flex={1}>
      <Header title="Confirmation" buttonHeader={handleBack} />
      <Box alignItems="center" gap={10}>
        <Text size="2xl" bold>
          Are you sure ?
        </Text>
        <Text size="sm" textAlign="center">
          Please make sure that you want proceed this transaction.
        </Text>

        <Box alignItems="center" width="$full" mt={20}>
          <Image
            bgColor={playerData.color}
            height={80}
            position="absolute"
            width={80}
            rounded="$full"
            borderColor="$secondary300"
            alt="image"
            zIndex={1}
            source={
              type === HistoryType.Income
                ? playerData.confirmationImages[0]
                : playerData.confirmationImages[1]
            }
          />
          <Box
            backgroundColor="$coolGray200"
            rounded="$lg"
            mt={50}
            width="$full"
            paddingVertical="$10"
            paddingHorizontal={24}>
            <Text size="xl" bold textAlign="center">
              {playerData.playerName}
            </Text>

            <ItemTransaction
              title={transaction === TransactionType.TopUp ? 'Funding source' : 'Recipients'}
              text={transaction === TransactionType.TopUp ? 'Bank' : recipientData?.playerName}
              hidden={transaction !== TransactionType.OtherPlayer}
            />

            <ItemTransaction title="Transaction" text={transaction} />
            <ItemTransaction
              title={transaction === TransactionType.TopUp ? 'Top Up Amount' : 'Transfer Amount'}
              text={`Rp. ${amount.toLocaleString()}`}
            />
            <ItemTransaction title="Description" text={description} hidden={!description} />
          </Box>
          <Image
            display={discount ? 'flex' : 'none'}
            opacity={0.3}
            position="absolute"
            bottom={0}
            right={10}
            w={120}
            h={120}
            source={require('../../asset/discount-tag.png')}
            alt="card"
          />
        </Box>

        <Button
          variant="solid"
          p="$0"
          size="md"
          mt={40}
          width="$2/3"
          onPress={handleButtonContinue}>
          <ButtonText size="md">Continue</ButtonText>
        </Button>
      </Box>

      <ModalSuccess
        isOpen={openModalSuccess}
        text={transaction === TransactionType.TopUp ? 'Top up money from bank' : 'Transfer money'}
        navigateNextScreen={handleClose}
      />
      <ModalFailed isOpen={openModalFailed} navigateNextScreen={handleClose} text={err} />
    </Box>
  );
};

export type { DataConfirmationProps };
