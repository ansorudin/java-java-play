import React from 'react';
import { Container } from '../components/cores/Container';
import { Transfer } from '../features/transfer';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const TransferScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <Transfer
        navigateToConfirmation={data => navigate.push('Confirmation', data)}
        handleBack={() => navigate.pop(1)}
        navigateToProfile={() => navigate.push('Profile')}
      />
    </Container>
  );
};
