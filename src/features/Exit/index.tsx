import {
  Box,
  Text,
  Button,
  ButtonText,
  Image,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
} from '@gluestack-ui/themed';
import { Header } from '../../components/Header';
import { FC, useState } from 'react';
import { useGlobalStore } from '../../stores';

interface ExitGameProps {
  buttonBack: () => void;
}
export const ExitGames: FC<ExitGameProps> = ({ buttonBack }) => {
  const { getDataPlayer, onChangeTax, removeHistory, removePlayer } = useGlobalStore();
  const [errMessage, setErrorMessage] = useState<string>('');

  const buttonExit = () => {
    removeHistory();
    removePlayer();
    onChangeTax(0);
  };

  return (
    <Box flex={1}>
      <Header title="Exit Game" buttonHeader={buttonBack} />
      <Alert
        mx="$2.5"
        action="error"
        variant="accent"
        position="absolute"
        marginTop={60}
        display={errMessage ? 'flex' : 'none'}>
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText>No player active in game !'</AlertText>
      </Alert>
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
        onPress={buttonExit}
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
