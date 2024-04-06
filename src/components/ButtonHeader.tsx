import { Button, ButtonIcon, ChevronLeftIcon, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';

interface ButtonHeaderProps {
  buttonHeader: () => void;
  isLeft?: boolean;
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({ buttonHeader, isLeft }) => {
  return (
    <>
      <Button
        display={isLeft ? 'none' : undefined}
        variant="link"
        position="absolute"
        right={25}
        onPress={buttonHeader}
        action="negative">
        <ButtonText>Exit</ButtonText>
      </Button>

      <Button
        variant="link"
        position="absolute"
        left={25}
        onPress={buttonHeader}
        display={isLeft ? undefined : 'none'}>
        <ButtonIcon size="xl" as={ChevronLeftIcon} color="$coolGray700" />
      </Button>
    </>
  );
};
