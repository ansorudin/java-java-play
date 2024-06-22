import React from 'react';
import { Container } from '../components/cores/Container';
import { ScanNfc } from '../features/scanNfc';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';
import { DataConfirmationProps } from '../components/Confirmation';

export const ScanNfcScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'ScanNfc'> = useRoute();
  const { action, amount, dataTransferOtherPlayer } = route.params;
  return (
    <Container>
      <ScanNfc
        dataTransferOtherPlayer={dataTransferOtherPlayer}
        action={action}
        amount={amount}
        handleGoBack={() => navigate.pop(1)}
        handleMoveConfirmationTax={(data: dataConfirmationTaxProps) =>
          navigate.push('ConfirmationTax', data)
        }
        handleMoveConfirmation={(data: DataConfirmationProps) => {
          navigate.push('Confirmation', data);
        }}
      />
    </Container>
  );
};
