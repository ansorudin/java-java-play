import { HStack } from '@gluestack-ui/themed';
import { ButtonActive } from './ButtonActive';
import { FC } from 'react';
import { ActiveTopUpType } from '..';

interface NavigationBarProps {
  onChangeNavigation: (active: string) => void;
  activeComponent: string;
}

export const NavigationBar: FC<NavigationBarProps> = ({ onChangeNavigation, activeComponent }) => {
  return (
    <HStack justifyContent="flex-start" gap={10} mt={15} mb={10} mx={10}>
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveTopUpType.TopUp)}
        title="Top up"
        active={activeComponent === ActiveTopUpType.TopUp}
      />
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveTopUpType.RentForland)}
        title="Rental Land"
        active={activeComponent === ActiveTopUpType.RentForland}
      />
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveTopUpType.RentForHouse)}
        title="Rental House"
        active={activeComponent === ActiveTopUpType.RentForHouse}
      />
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveTopUpType.RentForHotel)}
        active={activeComponent === ActiveTopUpType.RentForHotel}
        title="Rental Hotel"
      />
    </HStack>
  );
};
