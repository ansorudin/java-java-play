import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { BalanceCard } from '../../components/BalanceCard';
import { Header } from '../../components/Header';
import { DataInputTransferProps } from './components/InputDataTransfer';
import { DataConfirmationProps } from '../../components/Confirmation';
import { IExpense } from '../type';

interface TransferProps {
  moveToInputDataTransfer: (data: DataInputTransferProps) => void;
  moveToConfirmation: (data: DataConfirmationProps) => void;
  handleBack: () => void;
  data: IExpense;
}

export const Transfer: FC<TransferProps> = ({
  moveToInputDataTransfer,
  handleBack,
  data,
  moveToConfirmation,
}) => {
  const buttonNext = (e: string) => {
    const datas: DataInputTransferProps = { ...data, transferDestination: e };
    moveToInputDataTransfer(datas);
  };

  const { saldo, playerName, playerId, image } = data;
  console.log(data);

  const onPaymentBribe = () => {
    const datas: DataConfirmationProps = {
      playerId,
      playerName: playerName,
      playerImage: image,
      amount: 20000,
      transaction: 'Bribe to Escape',
      saldo,
    };
    moveToConfirmation(datas);
  };

  return (
    <Box flex={1}>
      <Header title="Money Transfer" buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={saldo} cardHolder={playerName} />
        <Box gap={10} flex={1} mt={30} paddingHorizontal={5}>
          <Button variant="outline" size="sm" action="primary" onPress={() => buttonNext('tax')}>
            <ButtonText size="sm" color="$primary300">
              Transfer Tax
            </ButtonText>
          </Button>
          <Button variant="outline" size="sm" onPress={() => buttonNext('bank')} action="primary">
            <ButtonText size="sm" color="$primary300">
              Transfer Bank
            </ButtonText>
          </Button>
          <Button variant="outline" size="sm" onPress={() => buttonNext('player')} action="primary">
            <ButtonText size="sm" color="$primary300">
              Transfer Other Player
            </ButtonText>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onPress={onPaymentBribe}
            action="primary"
            display={playerName === 'Corruptor' ? 'flex' : 'none'}>
            <ButtonText size="sm" color="$primary300">
              Pay Bribe
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
