import { Box, ButtonText, Button, Text, Icon, EyeOffIcon, EyeIcon } from '@gluestack-ui/themed';
import Swiper from 'react-native-swiper';
import { ProfileImage } from './components/ProfileImage';
import { FC, useEffect } from 'react';
import { Header } from '../../components/Header';
import { useState } from 'react';
import { IconTopUp } from '../../../asset/IconTopUp';
import { IconTransfer } from '../../../asset/IconTransfer';
import { IconHistory } from '../../../asset/IconHistory';
import { DataTopUpProps } from '../topup';
import { DataTransferProps } from '../transfer';
import { useGlobalStore } from '../../stores';
import { IdataProfile } from '../../stores/datas/type';
import { IPlayer } from '../../stores/type';
import { initDataProfile } from '../../stores/datas/dataPlayer';

interface ProfileProps {
  handleBackHome: () => void;
  handleTopUp: (data: DataTopUpProps) => void;
  handleMoveTransfer: (data: DataTransferProps) => void;
  handleMoveHistory: (playerId: string) => void;
  data: IPlayer;
}

export const Profile: FC<ProfileProps> = ({
  handleBackHome,
  handleTopUp,
  handleMoveTransfer,
  handleMoveHistory,
  data,
}) => {
  const [eyeOff, setEyeOff] = useState<boolean>(false);
  const [player, setPlayer] = useState<IdataProfile>(initDataProfile);
  const { id, saldo } = data;
  const { playerName, gender, description, skin, image } = player;
  const { profiles } = useGlobalStore();

  useEffect(() => {
    const dataPlayer = profiles.filter((profile: IdataProfile) => id === profile.playerId);
    setPlayer(dataPlayer[0]);
  }, [id, profiles]);

  const changeVisibilySaldo = () => {
    if (eyeOff) {
      setEyeOff(false);
    } else {
      setEyeOff(true);
    }
  };

  return (
    <Box flex={1}>
      <Header title={`Hello ${playerName} !`} buttonHeader={handleBackHome} />
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
              {eyeOff ? 'Show Saldo' : saldo?.toLocaleString()}
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
          <Button
            variant="link"
            size="sm"
            flexDirection="column"
            gap={2}
            onPress={() => handleTopUp({ ...player, saldo })}>
            <IconTopUp />
            <ButtonText size="xs" color="$coolGray500">
              Top up
            </ButtonText>
          </Button>
          <Button
            variant="link"
            size="sm"
            gap={2}
            flexDirection="column"
            onPress={() => handleMoveTransfer({ ...player, saldo })}>
            <IconTransfer />
            <ButtonText size="xs" color="$coolGray500">
              Transfer
            </ButtonText>
          </Button>
          <Button
            onPress={() => handleMoveHistory(id)}
            variant="link"
            size="sm"
            gap={2}
            flexDirection="column">
            <IconHistory />
            <ButtonText size="xs" color="$coolGray500">
              History
            </ButtonText>
          </Button>
        </Box>
      </Box>

      <Box flex={3} mt={20}>
        <Swiper
          dotStyle={{
            backgroundColor: 'gray',
          }}
          activeDotStyle={{
            backgroundColor: 'white',
            width: 10,
            height: 10,
            borderRadius: 5,
          }}>
          <ProfileImage
            data={{
              image: image,
              title: playerName,
              description: gender,
            }}
          />
          <ProfileImage
            data={{
              image: image,
              title: description,
              description: skin,
            }}
          />
        </Swiper>
      </Box>
    </Box>
  );
};
