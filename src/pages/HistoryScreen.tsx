import React from 'react';
import { Container } from '../components/cores/Container';
import { History } from '../features/history';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const HistoryScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <History buttonBack={() => navigate.pop(1)} />
    </Container>
  );
};
