import { Box, Image, Text } from '@gluestack-ui/themed';
import { FC } from 'react';
import { PlayerProps } from '..';
import { dataProfile } from '../../../components/dataProfile';

interface TopPlayerProps {
  index: number;
  player: PlayerProps;
}

export const TopPlayer: FC<TopPlayerProps> = ({ index, player }) => {
  let color = '';
  if (index === 1) {
    color = '$amber600';
  } else if (index === 2) {
    color = '$emerald700';
  } else {
    color = '$cyan900';
  }

  const size = index === 1 ? 130 : 90;

  const dataPlayer = dataProfile.find(profile => profile.playerId === player?.id);

  return (
    <Box justifyContent="center" alignItems="center">
      <Image
        top={-size / 3}
        position="absolute"
        w={40}
        h={40}
        display={index === 1 ? undefined : 'none'}
        source={require('../../../../asset/crown.png')}
        alt="icon"
      />
      <Box justifyContent="center" alignItems="center">
        <Image
          position="relative"
          rounded="$full"
          w={size}
          h={size}
          borderWidth={4}
          borderColor={color}
          alt="image"
          source={dataPlayer ? dataPlayer.image : require('../../../../asset/crown.png')}
        />
        <Box
          position="absolute"
          bottom="-$1.5"
          rounded="$full"
          width={20}
          height={20}
          bgColor={color}
          alignItems="center">
          <Text size="xs" bold color="white">
            {index}
          </Text>
        </Box>
      </Box>
      <Box mt={10} alignItems="center">
        <Text bold size="sm" color={color}>
          {dataPlayer?.playerName}
        </Text>
        <Text bold size="xs" color={color}>
          {player?.username}
        </Text>
        <Text size="sm" color={color}>
          {player?.saldo?.toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};
