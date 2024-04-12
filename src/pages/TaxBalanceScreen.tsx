import React from 'react';
import { Container } from '../components/cores/Container';
import { TaxBalance } from '../features/Tax';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { dataConfirmationTaxProps } from '../features/Tax/components/ConfirmationTax';

export const TaxBalanceScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <TaxBalance
        moveInputRecipients={(amount: string) => navigate.push('InputRecipients', { amount })}
        moveConfirmation={(data: dataConfirmationTaxProps) =>
          navigate.push('ConfirmationTax', data)
        }
      />
    </Container>
  );
};
