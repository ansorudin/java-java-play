import React from 'react';
import { Container } from '../components/cores/Container';
import { TaxBalance } from '../features/Tax';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProps } from '../routes/types';
import { ActionType } from '../features/scanNfc';

export const TaxBalanceScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  return (
    <Container>
      <TaxBalance
        moveNfcReaderTag={(amount: number, action: ActionType) =>
          navigate.push('ScanNfc', { amount, action })
        }
        moveInputRecipients={(amount: number) => navigate.push('InputRecipients', { amount })}
      />
    </Container>
  );
};
