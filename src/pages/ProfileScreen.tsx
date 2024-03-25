import React from 'react';
import { Container } from '../components/cores/Container';
import { Profile } from '../features/profile';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';

export const ProfileScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  return (
    <Container>
      <Profile
        handleBackHome={() => navigate.pop(1)}
        handleNavigate={screen => navigate.push(screen)}
      />
    </Container>
  );
};
