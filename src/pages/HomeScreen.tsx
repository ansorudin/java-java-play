import React from 'react';
import { Container } from '../components/cores/Container';
import { Home } from '../features/home';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { PlayerProps } from '../features/home';

export const HomeScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Home handleProfileScreen={(data: PlayerProps) => navigate.push('Profile', data)} />
    </Container>
  );
};
