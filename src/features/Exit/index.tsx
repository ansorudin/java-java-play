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
// import getRealm from '../../components/schema/SchemaRealm';
import { useGlobalStore } from '../../stores';

interface ExitGameProps {
  buttonBack: () => void;
}
export const ExitGame: FC<ExitGameProps> = ({ buttonBack }) => {
  const { getDataPlayer, onChangeTax } = useGlobalStore();
  const [errMessage, setErrorMessage] = useState<string>('');

  // const cleanRealm = () => {
  //   const realm = getRealm();

  //   if (!realm.isInTransaction) {
  //     try {
  //       realm.write(() => {
  //         const allPlayers = realm.objects('PlayerGame');
  //         if (allPlayers.length > 0) {
  //           try {
  //             const allHistories = realm.objects('TransactionHistory');
  //             realm.delete(allHistories);
  //             realm.delete(allPlayers);
  //             onChangeTax(0);
  //             getDataPlayer();
  //             buttonBack();
  //           } catch (error: any) {
  //             throw new Error(error.message);
  //           }
  //         } else {
  //           throw new Error('No player active in game !');
  //         }
  //       });
  //       realm.close();
  //     } catch (error: any) {
  //       console.log(error);
  //       setErrorMessage(error.message);
  //     }
  //   }
  // };

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
        // onPress={cleanRealm}
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
