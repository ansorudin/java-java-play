import {
  Box,
  Text,
  Heading,
  Button,
  ButtonText,
  Alert,
  AlertText,
  AlertIcon,
  InfoIcon,
} from '@gluestack-ui/themed';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from '../home/registeredId';
import { FC, useEffect, useState, useCallback } from 'react';
import { useGlobalStore } from '../../stores';
// import getRealm from '../../components/schema/SchemaRealm';
import { IPlayer } from '../../stores/type';

interface RegisterPlayerProps {
  username: string;
  handleMoveHome: () => void;
}

export const RegisterPlayer: FC<RegisterPlayerProps> = ({ username, handleMoveHome }) => {
  const { getDecryptData, setActiveTag, activePlayers, setPlayers } = useGlobalStore();
  const [err, setErr] = useState('');
  const [dataPlayer, setDataPlayer] = useState<{ id: string; tag: string } | null>(null);

  const handleBackHome = useCallback(() => {
    NfcManager.unregisterTagEvent();
    handleMoveHome();
    setErr('');
  }, [handleMoveHome]);

  useEffect(() => {
    const onReadTagNfc = async () => {
      try {
        await NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
          if (tag.ndefMessage) {
            const ndefRecords = tag.ndefMessage;
            const parseData = ndefRecords.map((record: any) =>
              Ndef.text.decodePayload(record.payload),
            );
            const decrypt = parseData.map((data: string) => getDecryptData(data));
            const textData = JSON.parse(decrypt.join('\n'));
            const id = textData.playerId;
            const isId = registeredId.find(dataId => dataId === tag.id);
            if (!isId) {
              setErr('Invalid card, always use an authorized card to access this application.');
              return;
            }
            setDataPlayer({ id, tag: tag.id });
          } else {
            setErr('Tag cannot read, try again!!');
          }
        });
      } catch (error: any) {
        setErr(error.message);
      }
    };
    onReadTagNfc();

    return () => {
      NfcManager.unregisterTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [getDecryptData]);

  useEffect(() => {
    // const realm = getRealm();
    if (dataPlayer !== null) {
      const isAdding = activePlayers.find((data: IPlayer) => data.id === dataPlayer.id);
      if (!isAdding) {
        const newDataPlayer = { id: dataPlayer.id, username, saldo: 250000 };
        console.log([...activePlayers, newDataPlayer]);

        setPlayers([...activePlayers, newDataPlayer]);
        // realm.write(() => {
        //   realm.create('PlayerGame', { id: dataPlayer.id, username, saldo: 250000 });
        // });
        setActiveTag(dataPlayer.tag);
        handleBackHome();
      } else {
        setErr('This card has been used by another player, use a different card.');
      }
    }
  }, [activePlayers, dataPlayer, handleBackHome, setActiveTag, setPlayers, username]);

  return (
    <Box flex={1}>
      <Alert action="error" variant="accent" display={err ? 'flex' : 'none'}>
        <AlertIcon as={InfoIcon} mr="$3" />
        <AlertText size="2xs">{err}</AlertText>
      </Alert>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Heading bold size="2xl">
          NFC
        </Heading>
        <Text size="sm">{err ? 'Scanning Again...' : 'Scaning...'}</Text>
        <Button
          display={err ? 'flex' : 'none'}
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
