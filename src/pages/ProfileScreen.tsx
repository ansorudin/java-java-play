import React from 'react';
import { Container } from '../components/cores/Container';
import { Profile } from '../features/profile';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const ProfileScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'Profile'> = useRoute();

  const playerId = route.params;

  return (
    <Container>
      <Profile
        playerId={playerId}
        handleBackHome={() => navigate.pop(1)}
        handleNavigate={screen => navigate.push(screen)}
        handleMoveTransfer={data => navigate.push('Transfer', data)}
      />
    </Container>
  );
};
