import React from 'react';
import { Container } from '../components/cores/Container';
import { ScanNfc } from '../features/scanNfc';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { IPlayer } from '../stores/type';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';

export const ScanNfcScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'ScanNfc'> = useRoute();
  const { action, amount } = route.params;
  return (
    <Container>
      <ScanNfc
        action={action}
        amount={amount}
        handleProfileScreen={(data: IPlayer) => navigate.push('Profile', data)}
        handleMoveConfirmationTax={(data: dataConfirmationTaxProps) =>
          navigate.push('ConfirmationTax', data)
        }
      />
    </Container>
  );
};
