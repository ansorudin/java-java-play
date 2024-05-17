import React from 'react';
import { Container } from '../components/cores/Container';
import { Home } from '../features/home';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const HomeScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Home handleProfileScreen={(playerId: string) => navigate.push('Profile', playerId)} />
    </Container>
  );
};
