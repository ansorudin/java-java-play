import {
  Box,
  ButtonText,
  Button,
  Image,
  Text,
  Icon,
  EyeOffIcon,
  EyeIcon,
} from '@gluestack-ui/themed';
import Swiper from 'react-native-swiper';
import { ProfileImage } from './components/ProfileImage';
import { FC } from 'react';
import { Header } from '../../components/Header';
import { MainStackParamList } from '../../routes/types';
import { useState } from 'react';

interface ProfileProps {
  handleBackHome: () => void;
  handleNavigate: (screen: keyof MainStackParamList) => void;
}

export const Profile: FC<ProfileProps> = ({ handleBackHome, handleNavigate }) => {
  const [eyeOff, setEyeOff] = useState<boolean>(false);

  const changeVisibilySaldo = () => {
    if (eyeOff) {
      setEyeOff(false);
    } else {
      setEyeOff(true);
    }
  };
  return (
    <Box flex={1}>
      <Header title="Hello Siavash!" buttonHeader={handleBackHome} />
      <Box
        backgroundColor="$backgroundDarkInfo"
        flexDirection="column"
        borderWidth={1}
        borderRadius={10}
        borderColor="$coolGray500"
        marginTop="-$2">
        <Box paddingVertical={5}>
          <Text size="xs" textAlign="center" color="white">
            Total Balance
          </Text>
          <Box flexDirection="row" justifyContent="center" alignItems="center" gap={12}>
            <Text color="white" size="xs">
              {eyeOff ? '' : 'Rp'}
            </Text>
            <Text color="white" size={eyeOff ? 'md' : 'xl'} bold>
              {eyeOff ? 'Show Saldo' : '800,000'}
            </Text>
            <Button variant="link" p="$0" size="sm" onPress={changeVisibilySaldo}>
              <Icon as={eyeOff ? EyeOffIcon : EyeIcon} color="white" />
            </Button>
          </Box>
        </Box>
        <Box
          borderWidth={1}
          backgroundColor="$white"
          rounded={10}
          paddingVertical={15}
          flexDirection="row"
          justifyContent="space-evenly"
          borderColor="$coolGray500"
          width="$full">
          <Button variant="link" p="$0" size="sm" flexDirection="column">
            <Image source={require('../../../asset/icon_topup.png')} alt="card" size="2xs" />
            <ButtonText onPress={() => handleNavigate('TopUp')} size="xs" color="$coolGray500">
              Top up
            </ButtonText>
          </Button>
          <Button variant="link" p="$0" size="sm" flexDirection="column">
            <Image source={require('../../../asset/icon_transfer.png')} alt="card" size="2xs" />
            <ButtonText onPress={() => handleNavigate('Transfer')} size="xs" color="$coolGray500">
              Transfer
            </ButtonText>
          </Button>
          <Button
            onPress={() => handleNavigate('History')}
            variant="link"
            p="$0"
            size="sm"
            flexDirection="column">
            <Image source={require('../../../asset/History.png')} alt="card" size="2xs" />
            <ButtonText size="xs" color="$coolGray500">
              History
            </ButtonText>
          </Button>
        </Box>
      </Box>

      <Swiper showsButtons={true} style={{ marginTop: 20 }}>
        <ProfileImage
          data={{
            image: 'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
            title: 'Siavash',
            description: 'Player 1',
          }}
        />
        <ProfileImage
          data={{
            image: 'https://www.mordeo.org/download/6157/',
            title: 'Siavash',
            description: 'have strong body, cannot easy to lose',
          }}
        />
        <ProfileImage
          data={{
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbK45YvXlYTC3t0rH6SONYBr-aZiVxi_dsfg&usqp=CAU',
            title: 'Siavash',
            description: 'Intelegent cleaver',
          }}
        />
      </Swiper>
    </Box>
  );
};
