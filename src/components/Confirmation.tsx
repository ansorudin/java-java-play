import { Box, Text, Button, Image, ButtonText } from '@gluestack-ui/themed';
import { ModalSuccess } from './ModalSuccess';
import { FC, useState } from 'react';
import { ItemTransaction } from './ItemTransaction';
import { Header } from './Header';
import getRealm, { Histories, Player } from './schema/SchemaRealm';
import { useGlobalStore } from '../stores';
import { ModalFailed } from './ModalFailed';

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
}

export enum TransactionType {
  TopUp = 'Top Up',
  OtherPlayer = 'Transfer to player',
  Bank = 'Transfer to bank',
  Tax = 'Transfer to tax',
  Earning = 'Earning from other player',
  EarningTax = 'Tax Transfer',
}

export const Confirmation: FC<ConfirmationProps> = ({ data, handleBack, navigateToHome }) => {
  const { playerId, playerImage, playerName, transaction, amount, recipients, description, saldo } =
    data;
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalFailed, setModalFailed] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const { getDataPlayer } = useGlobalStore();
  const realm = getRealm();

  const handleClose = () => {
    setOpenModalSuccess(false);
    navigateToHome();
  };

  const handleButtonContinue = () => {
    try {
      if (!realm.isInTransaction) {
        realm.write(() => {
          const player = realm.objectForPrimaryKey<Player>('PlayerGame', playerId);
          if (!player) {
            throw new Error('Recipient Data not found');
          }

          if (transaction === TransactionType.TopUp) {
            player.saldo = amount + saldo;
          } else if (transaction === TransactionType.Bank) {
            player.saldo = saldo - amount;
          } else if (transaction === TransactionType.Tax) {
            player.saldo = saldo - amount;
          } else if (transaction === TransactionType.OtherPlayer && recipients) {
            player.saldo = saldo - amount;
            const recipient = realm.objectForPrimaryKey<Player>('PlayerGame', recipients);
            if (recipient) {
              const oldSaldo = recipient.saldo;
              recipient.saldo = amount + oldSaldo;
            } else {
              throw new Error('Recipient Data not found');
            }
          } else {
            throw new Error('Invalid Transaction Type or Missing Recipients');
          }

          try {
            const histories = realm.objectForPrimaryKey<Histories>('TransactionHistory', playerId);
            const dataToSend: any = {
              id: playerId,
              playerName:
                transaction === TransactionType.OtherPlayer
                  ? recipients
                  : transaction === TransactionType.Tax
                  ? 'Tax'
                  : 'Bank',
              playerImage: parseInt(playerImage),
              transaction,
              amount,
            };

            if (histories) {
              histories.histories.push(dataToSend);
            } else {
              realm.create('TransactionHistory', {
                id: playerId,
                histories: [dataToSend],
              });
            }
          } catch (error) {
            throw new Error('Invalid Transaction Type or Missing Recipients');
          }
          if (recipients) {
            try {
              const histories = realm.objectForPrimaryKey<Histories>(
                'TransactionHistory',
                recipients,
              );
              const dataToSend: any = {
                id: recipients,
                playerName,
                playerImage: parseInt(playerImage),
                transaction: 'Earning from other player',
                amount,
              };

              if (histories) {
                histories.histories.push(dataToSend);
              } else {
                realm.create('TransactionHistory', {
                  id: recipients,
                  histories: [dataToSend],
                });
              }
            } catch (error) {
              throw new Error('Invalid Transaction');
            }
          }
        });
        setOpenModalSuccess(true);
        getDataPlayer();
      }
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
              text={transaction === TransactionType.TopUp ? 'Bank' : recipients}
              hidden={transaction !== TransactionType.OtherPlayer}
            />

            <ItemTransaction title="Transaction" text={transaction} />
            <ItemTransaction
              title={transaction === TransactionType.TopUp ? 'Top Up Amount' : 'Transfer Amount'}
              text={`Rp. ${amount.toLocaleString()}`}
            />
            <ItemTransaction
              title="Description"
              text={description}
              hidden={transaction !== TransactionType.Bank}
            />
          </Box>
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
