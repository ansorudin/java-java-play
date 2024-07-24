import { useEffect, useState, FC } from 'react';
import {
  Box,
  Text,
  Button,
  ButtonText,
  Heading,
  AlertText,
  Alert,
  AlertIcon,
  InfoIcon,
} from '@gluestack-ui/themed';
import { useGlobalStore } from '../../stores';
import { dataConfirmationTaxProps, MethodeType } from '../Tax/components/ConfirmationTax';
import NfcManager from 'react-native-nfc-manager';
import { DataConfirmationProps } from '../../components/Confirmation';

export enum ActionType {
  profile = 'navigateToProfile',
  history = 'taxTransferPlayer',
  other_Player = 'transferOtherPlayer',
}

interface ScanNfcProps {
  handleGoBack: () => void;
  action: ActionType;
  amount?: number;
  dataTransferOtherPlayer?: DataConfirmationProps;
  handleMoveConfirmationTax: (data: dataConfirmationTaxProps) => void;
  handleMoveConfirmation: (data: DataConfirmationProps) => void;
}

export const ScanNfc: FC<ScanNfcProps> = ({
  handleGoBack,
  handleMoveConfirmationTax,
  action,
  amount,
  dataTransferOtherPlayer,
  handleMoveConfirmation,
}) => {
  const { onReadTagNfc, nfcId, errorNfcReadTag, activePlayers, clearDataNfc } = useGlobalStore();
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    onReadTagNfc();
    if (nfcId && action === ActionType.history && amount) {
      const isActive = activePlayers.find(player => player.id === nfcId);
      if (!isActive) {
        setErr('Player is not registered as an active player');
        return;
      }
      const dataToSend: dataConfirmationTaxProps = {
        playerName: nfcId,
        amount,
        methode: MethodeType.NfC,
      };
      setErr('');
      clearDataNfc();
      handleMoveConfirmationTax(dataToSend);
      return;
    }
    if (nfcId && action === ActionType.other_Player && dataTransferOtherPlayer) {
      const isActive = activePlayers.find(player => player.id === nfcId);
      if (!isActive) {
        setErr('Player is not registered as an active player');
        return;
      }
      setErr('');
      clearDataNfc();
      handleMoveConfirmation({ ...dataTransferOtherPlayer, recipients: nfcId });
      return;
    }
  }, [
    action,
    activePlayers,
    amount,
    handleMoveConfirmationTax,
    onReadTagNfc,
    nfcId,
    clearDataNfc,
    dataTransferOtherPlayer,
    handleMoveConfirmation,
  ]);

  const handleBackPrevious = async () => {
    try {
      await NfcManager.unregisterTagEvent();
    } catch (error) {
      console.error('Error unregistering NFC event:', error);
    } finally {
      handleGoBack();
      clearDataNfc();
      setErr('');
    }
  };

  return (
    <Box flex={1}>
      <Alert
        variant="accent"
        action="error"
        position="absolute"
        display={errorNfcReadTag || err ? 'flex' : 'none'}>
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText size="2xs">{errorNfcReadTag || err}</AlertText>
      </Alert>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">{errorNfcReadTag || err ? 'Scanning Again...' : 'Scaning...'}</Text>

        <Button
          onPress={handleBackPrevious}
          display={errorNfcReadTag || err ? 'flex' : 'none'}
          variant="outline"
          action="negative"
          size="xs"
          gap="$1"
          marginTop={20}>
          <ButtonText>Back To Previous</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};
