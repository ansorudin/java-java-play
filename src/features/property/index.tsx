import { Box, Button, ButtonText } from '@gluestack-ui/themed';
import { IExpense } from '../type';
import { FC, useState } from 'react';
import { PurchaseProperty } from './components/PurchaseProperty';
import { Header } from '../../components/Header';
import { BalanceCard } from '../../components/BalanceCard';
import { NavigationBar } from './components/NavigationBar';
import { PurchaseAdditional } from './components/PurchaseAdditional';
import { DataConfirmationProps } from '../../components/Confirmation';

interface PropertyProps {
  data: IExpense;
  handleBack: () => void;
  handleMoveConfirmation: (data: DataConfirmationProps) => void;
}

export enum ActiveType {
  property = 'Buy property',
  house = 'Buy house',
  hotel = 'Buy hotel',
}

export const Property: FC<PropertyProps> = ({ data, handleBack, handleMoveConfirmation }) => {
  const { saldo, playerName, playerId, image } = data;
  const [active, setActive] = useState<string>(ActiveType.property);
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [block, setBlock] = useState<string | null>(null);

  const onNext = () => {
    const dataToSend: DataConfirmationProps = {
      playerId,
      playerName: playerName,
      playerImage: image,
      amount,
      transaction: active,
      description: active === ActiveType.property ? `Property ${description}` : description,
      saldo,
      discount: playerId === 'cbcb7269',
    };
    handleMoveConfirmation(dataToSend);
  };

  const onPurchase = (price: number, inputDescription: string, unit: string | null) => {
    setAmount(price);
    setDescription(inputDescription);
    setBlock(unit);
  };

  const onChangeNavigation = (component: string) => {
    setAmount(0);
    setDescription('');
    setActive(component);
  };

  return (
    <Box flex={1}>
      <Header title="Purchase Property" buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={saldo} cardHolder={playerName} />
        <NavigationBar onChangeNavigation={onChangeNavigation} activeComponent={active} />
        <PurchaseProperty
          active={active}
          onPurchase={onPurchase}
          discount={playerId === 'cbcb7269'}
          saldo={saldo}
        />
        <PurchaseAdditional
          active={active === ActiveType.house}
          onPurchase={onPurchase}
          activeType={active}
          discount={playerId === 'cbcb7269'}
          saldo={saldo}
        />
        <PurchaseAdditional
          active={active === ActiveType.hotel}
          onPurchase={onPurchase}
          activeType={active}
          discount={playerId === 'cbcb7269'}
          saldo={saldo}
        />
      </Box>

      <Button isDisabled={!amount} variant="solid" size="md" onPress={onNext}>
        <ButtonText size="sm" color="white">
          Next
        </ButtonText>
      </Button>
    </Box>
  );
};
