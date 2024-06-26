import { Box, Button, ButtonText, Text, ButtonIcon, AddIcon } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { ListRenderItemInfo, ScrollView, FlatList } from 'react-native';
import { TopPlayer } from './components/TopPlayer';
import { useEffect, useState } from 'react';
import NfcManager, { NfcEvents, Ndef } from 'react-native-nfc-manager';
import { registeredId } from './registeredId';
import { ModalInputPerson } from './components/ModalInputPerson';
import { DataEmpty } from './components/DataEmpty';
import { useGlobalStore } from '../../stores';
import { IPlayer } from '../../stores/type';
import { Header } from '../../components/Header';

interface HomeProps {
  handleProfileScreen: (data: IPlayer) => void;
  handleRegisterPlayer: (username: string) => void;
}

export const Home: React.FC<HomeProps> = ({ handleProfileScreen, handleRegisterPlayer }) => {
  const { activePlayer, leaderBoard, getDataPlayer, getDecryptData, taxAmount, onChallengeIncome } =
    useGlobalStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    getDataPlayer();
    setIsLoading(false);
  }, [getDataPlayer]);

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
            const player = activePlayer.find(item => item.id === id);
            if (player) {
              handleProfileScreen(player);
            }
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
  }, [activePlayer, getDecryptData, handleProfileScreen]);

  return (
    <>
      <Box flex={1} display={isLoading ? 'none' : 'flex'}>
        {/* <Header title="Home" /> */}
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
          handleInputUsername={handleRegisterPlayer}
        />
        <DataEmpty buttonScan={() => setIsOpen(true)} dataPlayer={activePlayer} />
      </Box>
    </>
  );
};
