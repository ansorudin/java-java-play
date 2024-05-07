import React from 'react';
import { Container } from '../components/cores/Container';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../routes/types';
import { ConfirmationTax } from '../features/Tax/components/ConfirmationTax';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const ConfirmationTaxScreen = () => {
  const route: RouteProp<MainStackParamList, 'ConfirmationTax'> = useRoute();
  const { playerName, amount, methode } = route.params;
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <ConfirmationTax
        data={{ playerName, amount, methode }}
        handleBack={() => navigate.pop(1)}
        handleNextScreen={() => navigate.push('ScanNfc')}
        moveToHome={() => navigate.popToTop()}
      />
    </Container>
  );
};
