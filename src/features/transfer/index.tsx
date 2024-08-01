import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { BalanceCard } from '../../components/BalanceCard';
import { Header } from '../../components/Header';
import { DataInputTransferProps } from './components/InputDataTransfer';
import { DataConfirmationProps } from '../../components/Confirmation';
import { IExpense } from '../type';
import { TransactionType } from '../../stores/type';

interface TransferProps {
  moveToInputDataTransfer: (data: DataInputTransferProps) => void;
  moveToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
  data: IExpense;
}

export const Transfer: FC<TransferProps> = ({ moveToInputDataTransfer, handleBack, data }) => {
  const buttonNext = (e: TransactionType) => {
    const datas: DataInputTransferProps = { ...data, transferDestination: e };
    moveToInputDataTransfer(datas);
  };

  const { saldo, playerData } = data;

  return (
    <Box flex={1}>
      <Header title="Money Transfer" buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={saldo} cardHolder={playerData.playerName} />
        <Box gap={10} flex={1} mt={30} paddingHorizontal={5}>
          <Button
            variant="outline"
            size="sm"
            action="primary"
            onPress={() => buttonNext(TransactionType.Tax)}>
            <ButtonText size="sm" color="$primary300">
              Pay Tax
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => buttonNext(TransactionType.Bank)}
            action="primary">
            <ButtonText size="sm" color="$primary300">
              Transfer Bank
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => buttonNext(TransactionType.OtherPlayer)}
            action="primary">
            <ButtonText size="sm" color="$primary300">
              Transfer Other Player
            </ButtonText>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onPress={() => buttonNext(TransactionType.OtherPlayerNFC)}
            action="primary">
            <ButtonText size="sm" color="$primary300">
              Transfer Other Player Using NFC
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
