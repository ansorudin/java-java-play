import React from 'react';
import { Container } from '../components/cores/Container';
import { Property } from '../features/property';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MainStackNavigationProps, MainStackParamList } from '../routes/types';
import { DataConfirmationProps } from '../components/Confirmation';

export const PropertyScreen = () => {
  const navigate = useNavigation<MainStackNavigationProps>();
  const route: RouteProp<MainStackParamList, 'Property'> = useRoute();
  return (
    <Container>
      <Property
        data={route.params}
        handleBack={() => navigate.pop(1)}
        handleMoveConfirmation={(data: DataConfirmationProps) =>
          navigate.push('Confirmation', data)
        }
      />
    </Container>
  );
};
