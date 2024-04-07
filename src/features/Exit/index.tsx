import { Box, Text, Button, ButtonText, Image } from '@gluestack-ui/themed';
import { Header } from '../../components/Header';
import { FC } from 'react';

interface ExitGameProps {
  buttonBack: () => void;
}
export const ExitGame: FC<ExitGameProps> = ({ buttonBack }) => {
  return (
    <Box flex={1}>
      <Header title="Exit Game" buttonHeader={buttonBack} />
      <Box flex={1} alignItems="center" justifyContent="center" gap={20}>
        <Image w={120} h={120} source={require('../../../asset/iconExit.png')} alt="icon" />
        <Box w="$3/4" gap={10}>
          <Text size="xl" textAlign="center" bold color="$red600">
            Are you sure ?
          </Text>
          <Text size="sm" textAlign="center">
            If you do, the game will be start from biginning
          </Text>
        </Box>
      </Box>

      <Button
        mb={20}
        size="md"
        variant="solid"
        action="negative"
        isDisabled={false}
        isFocusVisible={false}>
        <ButtonText>Continue</ButtonText>
      </Button>
    </Box>
  );
};
