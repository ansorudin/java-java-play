import { Box, Button, ButtonText, Text, ButtonIcon, AddIcon, Image } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { ListRenderItemInfo, ScrollView, FlatList } from 'react-native';
import { TopPlayer } from './components/TopPlayer';
import Realm from 'realm';
import { useEffect, useState } from 'react';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from './registeredId';
import CryptoJS from 'react-native-crypto-js';
import { ModalInputPerson } from './components/ModalInputPerson';
import { PlayerSchema } from '../../components/Schema';
import { DataEmpty } from './components/DataEmpty';

interface HomeProps {
  handleProfileScreen: (playerId: string) => void;
}

export interface PlayerProps {
  id: string;
  saldo: number;
  username: string;
}

export const Home: React.FC<HomeProps> = ({ handleProfileScreen }) => {
  const realm = new Realm({ schema: [PlayerSchema] });
  const [players, setPlayers] = useState<PlayerProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [leaderBoard, setLeaderBoard] = useState<PlayerProps[]>([]);

  const secretKey = 'secret';

  const getData = () => {
    const dataPlayer = realm.objects('Players') as unknown as PlayerProps[];
    setPlayers(dataPlayer);

    const dataLeaderBoard = realm
      .objects('Players')
      .sorted('saldo', true)
      .slice(0, 3) as unknown as PlayerProps[];

    setLeaderBoard(dataLeaderBoard);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decryptData = (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const readTag = async (e: string) => {
    setIsOpen(false);
    try {
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        if (tag.ndefMessage) {
          const ndefRecords = tag.ndefMessage;
          const parseData = ndefRecords.map((record: any) =>
            Ndef.text.decodePayload(record.payload),
          );
          const decrypt = parseData.map((data: string) => decryptData(data));
          const textData = JSON.parse(decrypt.join('\n'));
          const isId = registeredId.find(id => id === tag.id);
          const isAdding = players.find((data: PlayerProps) => data.id === textData.playerId);
          if (isId && !isAdding) {
            realm.write(() => {
              realm.create('Players', { id: textData.playerId, username: e, saldo: 70000 });
            });
            getData();
          } else {
            console.log('data not registered');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box flex={1}>
      <Box h="$1/2" display={leaderBoard.length > 0 ? 'flex' : 'none'}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          paddingHorizontal={10}
          bgColor="$coolGray200"
          paddingVertical={10}
          rounded={10}>
          <Text size="xs" bold>
            Tax Amount
          </Text>
          <Text size="xs">2000,000</Text>
        </Box>

        <Box w="$full" flex={1} justifyContent="flex-end" alignItems="center">
          <Box flexDirection="row" justifyContent="space-around" alignItems="center" gap="$4">
            <TopPlayer index={2} player={leaderBoard[1]} />
            <TopPlayer index={1} player={leaderBoard[0]} />
            <TopPlayer index={3} player={leaderBoard[2]} />
          </Box>
        </Box>
      </Box>

      <Box flex={1} display={leaderBoard.length > 0 ? 'flex' : 'none'}>
        <Box
          justifyContent="flex-end"
          alignItems="flex-end"
          pb={15}
          borderBottomWidth={1}
          borderColor="$coolGray300">
          <Button
            onPress={() => setIsOpen(true)}
            variant="outline"
            action="positive"
            size="xs"
            gap="$1">
            <ButtonText>Add</ButtonText>
            <ButtonIcon color="$tertiary800" as={AddIcon} />
          </Button>
        </Box>
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }: ListRenderItemInfo<PlayerProps>) => (
            <ScrollView>
              <Player
                moveProfile={() => handleProfileScreen(item.id)}
                playerId={item.id}
                detail={item.username}
                amount={item.saldo}
              />
            </ScrollView>
          )}
        />
      </Box>
      <ModalInputPerson
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleInputUsername={readTag}
      />
      <DataEmpty buttonScan={() => setIsOpen(true)} dataPlayer={players} />
    </Box>
  );
};
