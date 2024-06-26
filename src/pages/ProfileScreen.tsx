import React from 'react';
import { Container } from '../components/cores/Container';
import { Profile } from '../features/profile';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const ProfileScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'Profile'> = useRoute();

  const { id, saldo, username } = route.params;

  return (
    <Container>
      <Profile
        data={{ id, saldo, username }}
        handleBackHome={() => navigate.pop(1)}
        handleMoveHistory={playerId => navigate.push('History', { playerId: playerId })}
        handleMoveTransfer={data => navigate.push('Transfer', data)}
        handleTopUp={data => navigate.push('TopUp', data)}
        handleProperty={data => navigate.push('Property', data)}
      />
    </Container>
  );
};
