import { Box, Text } from '@gluestack-ui/themed';
import { Player } from './components/Player';
import { Dimensions, ScrollView } from 'react-native';
import { TopPlayer } from './components/TopPlayer';
import { dataProfileProps } from '../profile';

interface HomeProps {
  handleProfileScreen: (data: dataProfileProps) => void;
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
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Traveller',
                description: 'Happy Go Round',
                skin: 'Once per turn, if you stop at touris',
                totalBalance: 20000,
                gender: 'Female',
              })
            }
            playerName="TRAVELLER"
            detail="Bayu Pratama"
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Corruptor',
                description: 'Bribery',
                skin: 'When you get in jail, you can bribe the warden Rp. 20,000 to instantly escape from jail!',
                totalBalance: 60000,
                gender: 'Male',
              })
            }
            playerName="CORRUPTOR"
            detail="Cherlyn"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Bussinesman',
                description: 'Tax Evasion',
                skin: '',
                totalBalance: 50000,
                gender: 'Male',
              })
            }
            playerName="BUSINESSMAN"
            detail="Eva"
            amount={50000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Office Worker',
                description: 'Overtime Payment',
                skin: '',
                totalBalance: 20000,
                gender: 'Male',
              })
            }
            playerName="OFFICE WORKER"
            detail=""
            amount={20000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Contractor',
                description: 'Building Master',
                skin: '',
                totalBalance: 60000,
                gender: 'Male',
              })
            }
            playerName="CONTRACTOR"
            detail="Lulu"
            amount={60000}
            image="https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg"
          />
          <Player
            moveProfile={() =>
              handleProfileScreen({
                playerName: 'Celebrity',
                description: '',
                skin: '',
                totalBalance: 0,
                gender: '',
              })
            }
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
