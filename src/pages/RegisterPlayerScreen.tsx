import React from 'react';
import { Container } from '../components/cores/Container';
import { RegisterPlayer } from '../features/registerPlayer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const RegisterPlayerScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'Register_Player'> = useRoute();

  const { username } = route.params;
  return (
    <Container>
      <RegisterPlayer username={username} handleMoveHome={() => navigate.push('Home')} />
    </Container>
  );
};
