import React from 'react';
import { Container } from '../components/cores/Container';
import { ExitGame } from '../features/exit';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const ExitGameScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return <Container>{/* <ExitGame buttonBack={() => navigate.pop(1)} /> */}</Container>;
};
