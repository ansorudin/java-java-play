import { HStack } from '@gluestack-ui/themed';
import { ButtonActive } from './ButtonActive';
import { FC } from 'react';
import { ActiveType } from '..';

interface NavigationBarProps {
  onChangeNavigation: (active: string) => void;
  activeComponent: string;
}

export const NavigationBar: FC<NavigationBarProps> = ({ onChangeNavigation, activeComponent }) => {
  return (
    <HStack justifyContent="flex-start" gap={10} my={15} mx={10}>
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveType.property)}
        title="Property"
        active={activeComponent === ActiveType.property}
      />
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveType.house)}
        title="House"
        active={activeComponent === ActiveType.house}
      />
      <ButtonActive
        onPress={() => onChangeNavigation(ActiveType.hotel)}
        title="Hotel"
        active={activeComponent === ActiveType.hotel}
      />
    </HStack>
  );
};
