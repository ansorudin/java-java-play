import { Box, Button, ButtonText, Text, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { ListRenderItemInfo, ScrollView, FlatList } from 'react-native';
import { TopPlayer } from './components/TopPlayer';
import { useEffect, useState } from 'react';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from './registeredId';
import { ModalInputPerson } from './components/ModalInputPerson';
import { DataEmpty } from './components/DataEmpty';
import getRealm from '../../components/schema/SchemaRealm';
import { useGlobalStore } from '../../stores';
import { IPlayer } from '../../stores/type';
import { NfcTag } from './components/NfcTag';

interface HomeProps {
  handleProfileScreen: (data: IPlayer) => void;
}

export const Home: React.FC<HomeProps> = ({ handleProfileScreen }) => {
  const realm = getRealm();
  const { activePlayer, leaderBoard, getDataPlayer, getDecryptData, taxAmount } = useGlobalStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getDataPlayer();
    setIsLoading(false);
  }, [getDataPlayer]);

  const handleBack = () => {
    setLoading(false);
    setErr('');
  };

  const readTag = async (e: string) => {
    setIsOpen(false);
    try {
      setLoading(true);
      await NfcManager.registerTagEvent();
      NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag: any) => {
        if (tag.ndefMessage) {
          const ndefRecords = tag.ndefMessage;
          const parseData = ndefRecords.map((record: any) =>
            Ndef.text.decodePayload(record.payload),
          );
          const decrypt = parseData.map((data: string) => getDecryptData(data));
          const textData = JSON.parse(decrypt.join('\n'));
          const isId = registeredId.find(id => id === tag.id);

          const isAdding = activePlayer.find((data: IPlayer) => data.id === textData.playerId);

          if (!isId) {
            setErr('Invalid card, always use an authorized card to access this application.');
            return;
          }

          if (!isAdding) {
            realm.write(() => {
              realm.create('PlayerGame', { id: textData.playerId, username: e, saldo: 250000 });
            });
            getDataPlayer();
            setErr('');
            setLoading(false);
          } else {
            setErr('This card has been used by another player, use a different card.');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box flex={1} display={isLoading || loading ? 'none' : 'flex'}>
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
            <Text size="xs">{taxAmount.toLocaleString()}</Text>
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
            data={activePlayer}
            keyExtractor={item => item.id}
            renderItem={({ item }: ListRenderItemInfo<IPlayer>) => (
              <ScrollView>
                <Player
                  moveProfile={() => handleProfileScreen(item)}
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
        <DataEmpty buttonScan={() => setIsOpen(true)} dataPlayer={activePlayer} />
      </Box>
      <NfcTag error={err} display={loading} handleBackToHome={handleBack} />
    </>
  );
};
