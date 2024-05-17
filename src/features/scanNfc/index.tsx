import React, { useEffect, FC } from 'react';
import { Box, Text, Button, ButtonText, Heading } from '@gluestack-ui/themed';
import NfcManager, { NfcTech, NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from './registeredId';
import CryptoJS from 'react-native-crypto-js';

interface ScanNfcProps {
  handleProfileScreen: (playerId: string) => void;
}

export const ScanNfc: FC<ScanNfcProps> = ({ handleProfileScreen }) => {
  const secretKey = 'secret';

  const readTag = async () => {
    try {
      await NfcManager.registerTagEvent();
      console.log('masukk');
    } catch (error) {
      console.log(error);
    }
  };

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

  const decryptData = (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  useEffect(() => {
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
      if (tag.ndefMessage) {
        const ndefRecords = tag.ndefMessage;
        const parseData = ndefRecords.map((record: any) => Ndef.text.decodePayload(record.payload));
        const decrypt = parseData.map((data: string) => decryptData(data));
        const textData = JSON.parse(decrypt.join('\n'));

        const isId = registeredId.filter(id => id === tag.id);
        if (isId) {
          handleProfileScreen(textData.playerId);
        }
      }
    });

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [handleProfileScreen]);

  return (
    <Box flex={1}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">Scanning...</Text>
      </Box>
      <Button onPress={readTag} mb={10} size="md" variant="solid" isFocusVisible={false}>
        <ButtonText>Scan</ButtonText>
      </Button>

      {/* <Button onPress={writeNFC} mb={10} size="md" variant="solid" isFocusVisible={false}>
        <ButtonText>Write</ButtonText>
      </Button> */}
    </Box>
  );
};
