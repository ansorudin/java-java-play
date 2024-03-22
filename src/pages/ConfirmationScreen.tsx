import React from 'react';
import { Container } from '../components/cores/Container';
import { Confirmation } from '../components/Confirmation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../routes/types';

export const ConfirmationScreen = () => {
  const route: RouteProp<MainStackParamList, 'Confirmation'> = useRoute();
  const { playerName, playerImage, amount, transaction, handleBack, navigateToProfile } =
    route.params;

  return (
    <Container>
      <Confirmation
        playerName={playerName}
        playerImage={playerImage}
        amount={amount}
        transaction={transaction}
        handleBack={handleBack}
        navigateToProfile={navigateToProfile}
      />
    </Container>
  );
};
