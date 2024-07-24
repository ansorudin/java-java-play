import { Box, Text, Button, Image, ButtonText } from '@gluestack-ui/themed';
import { ModalSuccess } from './ModalSuccess';
import { FC, useEffect, useState } from 'react';
import { ItemTransaction } from './ItemTransaction';
import { Header } from './Header';
import { useGlobalStore } from '../stores';
import { ModalFailed } from './ModalFailed';
import { IdataProfile } from '../stores/datas/type';
import { History } from '../stores/type';

interface ConfirmationProps {
  handleBack: () => void;
  navigateToHome: () => void;
  data: DataConfirmationProps;
}

interface DataConfirmationProps {
  playerId: string;
  playerImage: string;
  playerName: string;
  transaction: string;
  saldo: number;
  amount: number;
  recipients?: string;
  description?: string;
  recipientsImage?: string;
  discount?: boolean;
}

export enum TransactionType {
  TopUp = 'Top Up',
  OtherPlayer = 'Transfer to other player',
  Bank = 'Transfer to bank',
  Tax = 'Transfer to tax',
  Earning = 'Earning from other player',
  EarningTax = 'Tax Transfer',
  Bribe = 'Bribe to Escape',
  property = 'Buy property',
  house = 'Buy house',
  hotel = 'Buy hotel',
}

export const Confirmation: FC<ConfirmationProps> = ({ data, handleBack, navigateToHome }) => {
  const {
    getDataPlayer,
    taxAmount,
    onChangeTax,
    getSelectedProfile,
    activePlayers,
    setDataHistory,
  } = useGlobalStore();
  const {
    playerId,
    playerImage,
    playerName,
    transaction,
    amount,
    recipients,
    description,
    saldo,
    discount,
  } = data;

  console.log(transaction);

  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalFailed, setModalFailed] = useState<boolean>(false);
  const [recipientData, setRecipientData] = useState<IdataProfile | null>(null);
  const [err, setErr] = useState<string>('');

  const handleClose = () => {
    setOpenModalSuccess(false);
    navigateToHome();
  };

  useEffect(() => {
    if (recipients) {
      const dataRecipient = getSelectedProfile(recipients);
      setRecipientData(dataRecipient);
    } else {
      setRecipientData(null);
    }
  }, [getSelectedProfile, recipients]);

  const handleButtonContinue = () => {
    try {
      const activePlayer = activePlayers.find(player => player.id === playerId);
      if (!activePlayer) {
        throw new Error('Recipient Data not found');
      }
      if (transaction === TransactionType.TopUp) {
        activePlayer.saldo = amount + saldo;
      } else if (transaction === TransactionType.Bank) {
        activePlayer.saldo = saldo - amount;
      } else if (transaction === TransactionType.Tax) {
        activePlayer.saldo = saldo - amount;
        onChangeTax(taxAmount + amount);
      } else if (transaction === TransactionType.OtherPlayer && recipients) {
        activePlayer.saldo = saldo - amount;
        const recipient = activePlayers.find(player => player.id === recipients);

        if (recipient) {
          const oldSaldo = recipient.saldo;
          recipient.saldo = amount + oldSaldo;
        } else {
          throw new Error('Recipient Data not found');
        }
      } else if (transaction === TransactionType.property) {
        activePlayer.saldo = saldo - amount;
      } else if (transaction === TransactionType.house) {
        activePlayer.saldo = saldo - amount;
      } else if (transaction === TransactionType.hotel) {
        activePlayer.saldo = saldo - amount;
      } else {
        throw new Error('Invalid Transaction Type or Missing Recipients');
      }

      try {
        const dataToSend: History = {
          id: playerId,
          playerName:
            transaction === TransactionType.OtherPlayer
              ? recipientData?.playerName
              : transaction === TransactionType.Tax
              ? 'Tax'
              : 'Bank',
          playerImage:
            transaction === TransactionType.OtherPlayer
              ? Number(recipientData?.image)
              : Number(playerImage),
          transaction,
          amount,
        };
        setDataHistory(dataToSend, playerId);
      } catch (error) {
        throw new Error('Invalid Transaction Type or Missing Recipients');
      }
      if (recipients) {
        try {
          const dataToSend: History = {
            id: recipients,
            playerName: playerName,
            playerImage: Number(playerImage),
            transaction: 'Earning from other player',
            amount,
          };
          setDataHistory(dataToSend, recipients);
        } catch (error) {
          throw new Error('Invalid Transaction');
        }
      }

      setOpenModalSuccess(true);
      getDataPlayer();
    } catch (error: any) {
      setModalFailed(true);
      setErr(error.message);
    }
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
            bgColor="$white"
            height={80}
            position="absolute"
            width={80}
            rounded="$full"
            borderColor="$secondary300"
            alt="image"
            zIndex={1}
            source={playerImage}
          />
          <Box
            backgroundColor="$coolGray200"
            rounded="$lg"
            mt={50}
            width="$full"
            paddingVertical="$10"
            paddingHorizontal={24}>
            <Text size="xl" bold textAlign="center">
              {playerName}
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
