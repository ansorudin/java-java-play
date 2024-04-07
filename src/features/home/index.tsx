import { Box, Text } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { Dimensions, ScrollView } from 'react-native';
import { TopPlayer } from './components/TopPlayer';

interface HomeProps {
  handleProfileScreen: () => void;
}

const widht = Dimensions.get('window').width;

export const Home: React.FC<HomeProps> = ({ handleProfileScreen }) => {
  return (
    <Box flex={1}>
      <Box h="$1/2">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          bgColor="$coolGray200"
          paddingVertical={10}
          paddingHorizontal={20}
          rounded={10}>
          <Text color="$coolGray700" size="sm" bold>
            Tax
          </Text>
          <Text>2000,000</Text>
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
            moveProfile={handleProfileScreen}
            playerName="TRAVELLER"
            detail="Happy Go Round"
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={handleProfileScreen}
            playerName="CORRUPTOR"
            detail="Bribery"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={handleProfileScreen}
            playerName="BUSINESSMAN"
            detail="Tax Evasion"
            amount={50000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={handleProfileScreen}
            playerName="OFFICE WORKER"
            detail="Overtime Payment"
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={handleProfileScreen}
            playerName="CONTRACTOR"
            detail="Building Master"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={handleProfileScreen}
            playerName="CELEBRITY"
            detail="Endorsement"
            amount={50000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
        </ScrollView>
      </Box>
    </Box>
  );
};
