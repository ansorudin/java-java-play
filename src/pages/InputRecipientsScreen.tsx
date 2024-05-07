import React from 'react';
import { Container } from '../components/cores/Container';
import { InputRecipients } from '../features/Tax/components/InputRecipients';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';

export const InputRecipientsScreen = () => {
  const route: RouteProp<MainStackParamList, 'InputRecipients'> = useRoute();
  const { amount } = route.params;
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <InputRecipients
        amount={amount}
        buttonBack={() => navigate.pop(1)}
        moveToConfirmation={(data: dataConfirmationTaxProps) =>
          navigate.push('ConfirmationTax', data)
        }
      />
    </Container>
  );
};
