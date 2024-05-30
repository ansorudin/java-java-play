import React from 'react';
import { Container } from '../components/cores/Container';
import { Topup } from '../features/topup';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';

export const TopUpScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();

  const route: RouteProp<MainStackParamList, 'TopUp'> = useRoute();

  const datas = route.params;

  return (
    <Container>
      <Topup
        data={datas}
        navigateToConfirmation={data => navigate.push('Confirmation', data)}
        handleBack={() => navigate.pop(1)}
      />
    </Container>
  );
};
