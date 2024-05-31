import React from 'react';
import { Container } from '../components/cores/Container';
import { History } from '../features/history';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const HistoryScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'History'> = useRoute();

  const { playerId } = route.params;

  return (
    <Container>
      <History playerId={playerId} buttonBack={() => navigate.pop(1)} />
    </Container>
  );
};
