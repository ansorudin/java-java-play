import React from 'react';
import { Container } from '../components/cores/Container';
import { Home } from '../features/home';
import { navigate } from '../routes/MainNavigator';

export const HomeScreen = () => {
  const handleNextProfile = () => navigate('Profile');
  return (
    <Container>
      <Home handleNextScreen={handleNextProfile} />
    </Container>
  );
};
