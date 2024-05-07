import React from 'react';
import { Container } from '../components/cores/Container';
import { Home } from '../features/home';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { dataProfileProps } from '../features/profile';

export const HomeScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Home handleProfileScreen={(data: dataProfileProps) => navigate.push('Profile', data)} />
    </Container>
  );
};
