import { Box, Image, Text } from '@gluestack-ui/themed';
import { FC } from 'react';

interface TopPlayerProps {
  playerName: string;
  amount: number;
  index: number;
  image: string;
}

export const TopPlayer: FC<TopPlayerProps> = ({ playerName, amount, index, image }) => {
  let color = '';
  if (index === 1) {
    color = '$amber600';
  } else if (index === 2) {
    color = '$emerald700';
  } else {
    color = '$cyan900';
  }

  const size = index === 1 ? 130 : 90;
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
          source={{
            uri: image,
          }}
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
          {playerName}
        </Text>

        <Text size="sm" color={color}>
          {amount.toLocaleString()}
        </Text>
      </Box>
    </Box>
  );
};
