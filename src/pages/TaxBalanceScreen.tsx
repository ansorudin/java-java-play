import React from 'react';
import { Container } from '../components/cores/Container';
import { TaxBalance } from '../features/Tax';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const TaxBalanceScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <TaxBalance moveNfc={() => navigate.push('ScanNfc')} />
    </Container>
  );
};
