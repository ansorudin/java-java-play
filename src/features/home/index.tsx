import { Box, Text } from '@gluestack-ui/themed';
import React, { useEffect, useState } from 'react';
import NfcManager, { NfcEvents, Ndef, NfcTech } from 'react-native-nfc-manager';
import { Alert, Button, SafeAreaView } from 'react-native';

export const Home = () => {
  // const [supported, setSupported] = useState(true);
  // const [enabled, setEnabled] = useState(false);
  // const [tag, setTag] = useState(null);

  // function App() {
  //   useEffect(() => {
  //     NfcManager.start();
  //     NfcManager.setEventListenerEnabled(true);

  //     return () => {
  //       NfcManager.stop();
  //       NfcManager.setEventListenerEnabled(false);
  //     };
  //   }, []);

  //   const readNfc = async () => {
  //     try {
  //       await NfcManager.requestTechnology(NfcManager.NfcTech.Ndef);
  //       const tags = await NfcManager.getTag();
  //       console.log(tags);
  //       Alert.alert('NFC Data', JSON.stringify(tag));
  //       await NfcManager.setEventListenerEnabled(false);
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       NfcManager.setEventListenerEnabled(false);
  //       await NfcManager.setEventListenerEnabled(false);
  //       await NfcManager.stop();
  //     }
  //   };

  return (
    <Box>
      <Text>halo</Text>
    </Box>
    // <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <Text>NFC Supported: {supported ? 'Yes' : 'No'}</Text>
    //   <Text>NFC Enabled: {enabled ? 'Yes' : 'No'}</Text>
    //   {tag && <Text>Tag ID: {tag.id}</Text>}
    //   <Button title="Read NFC" onPress={readNfc} />
    // </SafeAreaView>
  );
};
