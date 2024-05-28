import { Box, Text, Button, Image, ButtonText } from '@gluestack-ui/themed';
import { ModalSuccess } from './ModalSuccess';
import { FC, useState } from 'react';
import { ItemTransaction } from './ItemTransaction';
import { Header } from './Header';
import getRealm, { Histories } from './schema/SchemaRealm';

interface ConfirmationProps {
  handleBack: () => void;
  navigateToProfile: () => void;
  data: dataConfirmationProps;
}

interface dataConfirmationProps {
  playerId: string;
  playerImage: string;
  playerName: string;
  transaction: string;
  saldo: number;
  amount: number;
  recipients?: string;
  description?: string;
}

export enum TransactionType {
  TopUp = 'Top Up',
  Player = 'Transfer to player',
  Bank = 'Transfer to bank',
}

export const Confirmation: FC<ConfirmationProps> = ({ data, handleBack, navigateToProfile }) => {
  const { playerId, playerImage, playerName, transaction, amount, recipients, description, saldo } =
    data;
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const realm = getRealm();

  const handleClose = () => {
    setOpenModalSuccess(false);
    navigateToProfile();
  };

  const historiesGames = realm.objects('TransactionHistory');
  console.log(historiesGames);

  const handleButtonContinue = () => {
    if (transaction === TransactionType.TopUp) {
      try {
        if (!realm.isInTransaction) {
          realm.write(() => {
            let player = realm.objectForPrimaryKey('PlayerGame', playerId);
            if (player) {
              player.saldo = amount + saldo;
            } else {
              console.log('Player Not Found');
            }

            const histories = realm.objectForPrimaryKey<Histories>('TransactionHistory', playerId);

            const dataToSend: any = {
              id: playerId,
              playerName,
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
          });
        }
        setOpenModalSuccess(true);
      } catch (error) {
        console.log('Error handling button continue:', error);
      }
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
              hidden={transaction !== TransactionType.Player}
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
    </Box>
  );
};

export type { dataConfirmationProps };
