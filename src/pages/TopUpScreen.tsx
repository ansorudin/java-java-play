import React from 'react';
import { Container } from '../components/cores/Container';
import { Topup } from '../features/topup';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const TopUpScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Topup navigateToConfirmation={data => navigate.push('Confirmation', data)} />
    </Container>
  );
};
