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

  const onNext = () => {
    const dataToSend: DataConfirmationProps = {
      playerId,
      playerName: playerName,
      playerImage: image,
      amount,
      transaction: active,
      description: active === ActiveType.property ? `Property ${description}` : description,
      saldo,
    };
    handleMoveConfirmation(dataToSend);
  };

  const onPurchase = (price: number, id: string) => {
    setAmount(price);
    setDescription(id);
  };

  const onChangeNavigation = (component: string) => {
    setActive(component);
  };

  return (
    <Box flex={1}>
      <Header title="Purchase Property" buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={saldo} cardHolder={playerName} />
        <NavigationBar onChangeNavigation={onChangeNavigation} activeComponent={active} />
        <PurchaseProperty active={active} onPurchase={onPurchase} />
        <PurchaseAdditional
          active={active === ActiveType.house}
          onPurchase={onPurchase}
          activeType={active}
        />
        <PurchaseAdditional
          active={active === ActiveType.hotel}
          onPurchase={onPurchase}
          activeType={active}
        />
      </Box>

      <Button
        // isDisabled={
        //   !amount ||
        //   Number(amount) === 0 ||
        //   Number(amount) > saldo ||
        //   (transferDestination === 'bank' && !description) ||
        //   (transferDestination === 'player' && !player)
        // }
        variant="solid"
        size="md"
        onPress={onNext}>
        <ButtonText size="sm" color="white">
          Next
        </ButtonText>
      </Button>
    </Box>
  );
};
