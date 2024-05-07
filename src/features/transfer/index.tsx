import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { BalanceCard } from '../../components/BalanceCard';
import { Header } from '../../components/Header';
import { dataProfileProps } from '../profile';
import { DataInputTransferProps } from './components/InputDataTransfer';

interface TransferProps {
  moveToInputDataTransfer: (data: DataInputTransferProps) => void;
  handleBack: () => void;
  data: dataProfileProps;
}

export const Transfer: FC<TransferProps> = ({ moveToInputDataTransfer, handleBack, data }) => {
  const buttonNext = (e: string) => {
    const datas: DataInputTransferProps = { ...data, transferDestination: e };
    moveToInputDataTransfer(datas);
  };

  return (
    <Box flex={1}>
      <Header title="Money Transfer" buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={data.totalBalance} cardHolder={data.playerName} />
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
        </Box>
      </Box>
    </Box>
  );
};
