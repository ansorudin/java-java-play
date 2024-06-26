import React from 'react';
import { Container } from '../components/cores/Container';
import { Transfer } from '../features/transfer';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { DataInputTransferProps } from '../features/transfer/components/InputDataTransfer';

export const TransferScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'Transfer'> = useRoute();

  return (
    <Container>
      <Transfer
        data={route.params}
        moveToInputDataTransfer={(data: DataInputTransferProps) =>
          navigate.push('InputDataTransfer', data)
        }
        handleBack={() => navigate.pop(1)}
        moveToConfirmation={data => navigate.push('Confirmation', data)}
      />
    </Container>
  );
};
