import React from 'react';
import { Container } from '../components/cores/Container';
import { Confirmation } from '../components/Confirmation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const ConfirmationScreen = () => {
  const route: RouteProp<MainStackParamList, 'Confirmation'> = useRoute();
  const navigate = useNavigation<MainStackNavigationProps>();

  const data = route.params;

  return (
    <Container>
      <Confirmation
        data={data}
        handleBack={() => navigate.pop(1)}
        navigateToHome={() => navigate.popToTop()}
      />
    </Container>
  );
};
