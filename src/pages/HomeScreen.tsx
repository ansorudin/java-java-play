import React from 'react';
import { Container } from '../components/cores/Container';
import { Home } from '../features/home';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { IPlayer } from '../stores/type';

export const HomeScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Home
        handleProfileScreen={(data: IPlayer) => navigate.push('Profile', data)}
        handleRegisterPlayer={() => navigate.push('Register_Player')}
      />
    </Container>
  );
};
