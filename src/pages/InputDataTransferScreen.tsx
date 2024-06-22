import React from 'react';
import { Container } from '../components/cores/Container';
import { InputDataTransfer } from '../features/transfer/components/InputDataTransfer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { ActionType } from '../features/scanNfc';
import { DataConfirmationProps } from '../components/Confirmation';

export const InputDataTransferScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'InputDataTransfer'> = useRoute();

  return (
    <Container>
      <InputDataTransfer
        data={route.params}
        navigateToConfirmation={data => navigate.push('Confirmation', data)}
        handleBack={() => navigate.pop(1)}
        onTransferNfc={(
          amount: number,
          action: ActionType,
          dataTransferOtherPlayer: DataConfirmationProps,
        ) => navigate.push('ScanNfc', { amount, action, dataTransferOtherPlayer })}
      />
    </Container>
  );
};
