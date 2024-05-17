import React from 'react';
import { Container } from '../components/cores/Container';
import { ScanNfc } from '../features/scanNfc';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const ScanNfcScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <ScanNfc handleProfileScreen={(playerId: string) => navigate.push('Profile', playerId)} />
    </Container>
  );
};
