import { FC } from 'react';
import {
  Box,
  Text,
  Heading,
  AlertText,
  Alert,
  AlertIcon,
  InfoIcon,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import NfcManager from 'react-native-nfc-manager';

export enum ActionType {
  profile = 'navigateToProfile',
  history = 'taxTransferPlayer',
}
interface NfcTagProps {
  error: string;
  display: boolean;
  handleBackToHome: () => void;
}

export const NfcTag: FC<NfcTagProps> = ({ error, display, handleBackToHome }) => {
  const handleBackHome = async () => {
    try {
      await NfcManager.unregisterTagEvent();
    } catch (err) {
      console.error('Error unregistering NFC event:', err);
    } finally {
      handleBackToHome();
    }
  };
  return (
    <Box flex={1} display={display ? 'flex' : 'none'}>
      <Alert action="error" variant="accent" display={error ? 'flex' : 'none'}>
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText size="2xs">{error}</AlertText>
      </Alert>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">{error ? 'Scanning Again...' : 'Scaning...'}</Text>
        <Button
          display={error ? 'flex' : 'none'}
          variant="outline"
          action="negative"
          size="xs"
          gap="$1"
          marginTop={20}
          onPress={handleBackHome}>
          <ButtonText>Back To Home</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
