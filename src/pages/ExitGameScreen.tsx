import React from 'react';
import { Container } from '../components/cores/Container';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { ExitGames } from '../features/Exit';

export const ExitGameScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <ExitGames buttonBack={() => navigate.pop(1)} />
    </Container>
  );
};
