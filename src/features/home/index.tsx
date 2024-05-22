import { Box, Button, ButtonText, Text } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { Dimensions, ListRenderItemInfo, ScrollView, FlatList } from 'react-native';
import { TopPlayer } from './components/TopPlayer';
import Realm from 'realm';
import { useEffect, useState } from 'react';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from './registeredId';
import CryptoJS from 'react-native-crypto-js';
import { ModalInputPerson } from './components/ModalInputPerson';
import { PlayerSchema } from '../../components/Schema';

interface HomeProps {
  handleProfileScreen: (playerId: string) => void;
}

interface PlayerProps {
  id: string;
  saldo: number;
  username: string;
}

const widht = Dimensions.get('window').width;

export const Home: React.FC<HomeProps> = ({ handleProfileScreen }) => {
  const realm = new Realm({ schema: [PlayerSchema] });
  const [players, setPlayers] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const secretKey = 'secret';

  const getData = () => {
    const dataPlayer = realm.objects('Players');
    setPlayers(dataPlayer);
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
              realm.create('Players', { id: textData.playerId, username: e, saldo: 0 });
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
      <Box h="$1/2" gap={20}>
        {/* <Button onPress={() => setIsOpen(true)}>
          <ButtonText>Scan NFC for adding player</ButtonText>
        </Button> */}

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

        <Box w="$full" flex={1} justifyContent="center" mt={20}>
          <Box flexDirection="row" justifyContent="space-around" alignItems="center">
            <TopPlayer
              index={2}
              amount={600000}
              playerName="Corruptor"
              image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
            />
            <TopPlayer
              index={1}
              amount={700000}
              playerName="Bussinessman"
              image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
            />
            <TopPlayer
              index={3}
              amount={500000}
              playerName="Office Worker"
              image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
            />
          </Box>
        </Box>
      </Box>

      <Box py="$10">
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({ item }: ListRenderItemInfo<PlayerProps>) => (
            <Player
              moveProfile={() => handleProfileScreen(item.id)}
              playerId={item.id}
              detail={item.username}
              amount={item.saldo}
            />
          )}
        />
      </Box>
      {/* <Box
        flex={1}
        gap={10}
        bgColor="$coolGray200"
        w={widht}
        marginLeft={-20}
        marginBottom={-20}
        paddingHorizontal={20}
        borderTopStartRadius={30}
        borderTopEndRadius={30}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Player
            moveProfile={() => handleProfileScreen('eda23c1b')}
            playerName="TRAVELLER"
            detail="Bayu Pratama"
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() => handleProfileScreen('9d71fb69')}
            playerName="CORRUPTOR"
            detail="Cherlyn"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() => handleProfileScreen('ddd0861a')}
            playerName="BUSINESSMAN"
            detail="Eva"
            amount={50000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() => handleProfileScreen('600da590')}
            playerName="OFFICE WORKER"
            detail=""
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() => handleProfileScreen('cbcb7269')}
            playerName="CONTRACTOR"
            detail="Lulu"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() => handleProfileScreen('c87dd1a6')}
            playerName="CELEBRITY"
            detail="Wulan"
            amount={50000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
        </ScrollView>
      </Box> */}
      <ModalInputPerson
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleInputUsername={readTag}
      />
    </Box>
  );
};
