import React from 'react';
import { Container } from '../components/cores/Container';
import { Dice } from '../features/dice';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const DiceScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <Dice buttonBack={() => navigate.pop(1)} />
    </Container>
  );
};
