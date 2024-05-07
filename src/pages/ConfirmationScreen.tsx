import React from 'react';
import { Container } from '../components/cores/Container';
import { Confirmation } from '../components/Confirmation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const ConfirmationScreen = () => {
  const route: RouteProp<MainStackParamList, 'Confirmation'> = useRoute();
  const navigate = useNavigation<MainStackNavigationProps>();

  const { playerName, playerImage, amount, transaction, recipients, description } = route.params;

  return (
    <Container>
      <Confirmation
        data={{ recipients, playerImage, playerName, amount, transaction, description }}
        handleBack={() => navigate.pop(1)}
        navigateToProfile={() => navigate.popToTop()}
      />
    </Container>
  );
};
