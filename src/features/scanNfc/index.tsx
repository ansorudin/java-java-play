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
import { IPlayer } from '../../stores/type';
import { useGlobalStore } from '../../stores';
import { dataConfirmationTaxProps, MethodeType } from '../Tax/components/ConfirmationTax';
import NfcManager from 'react-native-nfc-manager';

export enum ActionType {
  profile = 'navigateToProfile',
  history = 'taxTransferPlayer',
}
interface ScanNfcProps {
  handleGoBack: () => void;
  handleProfileScreen: (data: IPlayer) => void;
  action: ActionType;
  amount?: number;
  handleMoveConfirmationTax: (data: dataConfirmationTaxProps) => void;
}

export const ScanNfc: FC<ScanNfcProps> = ({
  handleGoBack,
  handleProfileScreen,
  handleMoveConfirmationTax,
  action,
  amount,
}) => {
  const { onReadTagNfc, nfcId, errorNfcReadTag, activePlayer, clearDataNfc } = useGlobalStore();
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    onReadTagNfc();
    if (nfcId && action === ActionType.history && amount) {
      const isActive = activePlayer.find(player => player.id === nfcId);
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
    } else {
      console.log('move to profile');
    }
  }, [action, activePlayer, amount, handleMoveConfirmationTax, onReadTagNfc, nfcId, clearDataNfc]);

  // const readTagNfc = useCallback(
  //   () => {
  //     onReadTagNfc();

  //     if (action === ActionType.history) {
  //       const realm = getRealm();

  // const isActive = activePlayer.find(player => player.id === playerId);

  // if (!isActive) {
  //   throw new Error('Player not registered, Please ');
  // }

  // if (!realm.isInTransaction && playerId) {
  //   console.log(playerId);
  //   try {
  //     realm.write(() => {
  //       const player = realm.objectForPrimaryKey<Player>('PlayerGame', playerId);
  //       if (player && amount) {
  //         player.saldo = amount + player.saldo;
  //         onChangeTax(taxAmount - amount);
  //       } else {
  //         throw new Error('Recipient data not found');
  //       }
  //       const playerInfo = getSelectedProfile(playerId);
  //       if (playerInfo) {
  //         const dataToSend: HistoryPlayer = {
  //           id: playerId,
  //           playerName: 'Tax Earning',
  //           playerImage: parseInt(playerInfo.image),
  //           transaction: 'Tax Transfer',
  //           amount,
  //         };
  //         setDataHistory(dataToSend);
  //       } else {
  //         throw new Error('Recipient data not found');
  //       }
  //     });
  //   } catch (error: any) {
  //     setErrorMessage(error.message);
  //   }
  // }
  //   } else {
  //     console.log('move to profile');
  //   }
  // },
  // [
  // onReadTagNfc,
  // action,
  // playerId,
  // amount,
  // getSelectedProfile,
  // onChangeTax,
  // taxAmount,
  // setDataHistory,
  // ],
  // );

  // const encryptData = (data: any) => {
  //   return CryptoJS.AES.encrypt(data, secretKey).toString();
  // };

  // const writeNFC = async () => {
  //   let result = false;

  //   const dataProfile = {
  //     playerId: 'c87dd1a6',
  //   };

  //   try {
  //     await NfcManager.requestTechnology(NfcTech.Ndef);
  //     const jsonString = JSON.stringify(dataProfile);
  //     const encryptText = encryptData(jsonString);

  //     const bytes = Ndef.encodeMessage([Ndef.textRecord(encryptText)]);

  //     if (bytes) {
  //       await NfcManager.ndefHandler.writeNdefMessage(bytes);
  //       result = true;
  //       console.log('sukses');
  //     }
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     NfcManager.cancelTechnologyRequest();
  //   }
  //   return result;
  // };

  // const decryptData = (data: string) => {
  //   const bytes = CryptoJS.AES.decrypt(data, secretKey);
  //   return bytes.toString(CryptoJS.enc.Utf8);
  // };

  // useEffect(() => {
  //   readTag();
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
  //     if (tag.ndefMessage) {
  //       const ndefRecords = tag.ndefMessage;
  //       const parseData = ndefRecords.map((record: any) => Ndef.text.decodePayload(record.payload));
  //       const decrypt = parseData.map((data: string) => decryptData(data));
  //       const textData = JSON.parse(decrypt.join('\n'));

  //       const isId = registeredId.find(id => id === tag.id);
  //       if (isId) {
  //         // handleProfileScreen(textData.playerId);
  //       }
  //     }
  //   });

  //   return () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   };
  // }, [handleProfileScreen]);

  // console.log(errorMessage);

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

      {/* <Button onPress={writeNFC} mb={10} size="md" variant="solid" isFocusVisible={false}>
        <ButtonText>Write</ButtonText>
      </Button> */}
    </Box>
  );
};
