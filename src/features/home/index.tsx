import { Box, Text } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { Dimensions, ScrollView } from 'react-native';
import { TopPlayer } from './components/TopPlayer';

interface HomeProps {
  handleProfileScreen: (playerId: string) => void;
}

const widht = Dimensions.get('window').width;

export const Home: React.FC<HomeProps> = ({ handleProfileScreen }) => {
  return (
    <Box flex={1}>
      <Box h="$1/2">
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

      <Box
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
      </Box>
    </Box>
  );
};
