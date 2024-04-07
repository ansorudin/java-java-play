import { Box, Text, Image } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';

interface PlayerProps {
  playerName: string;
  amount: number;
  detail: string;
  image: string;
  moveProfile: () => void;
}

export const Player: FC<PlayerProps> = ({ playerName, amount, detail, image, moveProfile }) => {
  return (
    <TouchableOpacity onPress={moveProfile}>
      <Box
        flexDirection="row"
        w="$full"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={10}
        paddingVertical={20}
        borderBottomWidth={1}
        borderColor="$coolGray300"
        gap={2}
        rounded={6}>
        <Box>
          <Image
            rounded="$full"
            w={50}
            h={50}
            size="full"
            alt="image"
            source={{
              uri: image,
            }}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          w="$4/5"
          gap={10}>
          <Box>
            <Text bold size="sm" color="$coolGray700">
              {playerName}
            </Text>
            <Text size="2xs" color="$coolGray400">
              {detail}
            </Text>
          </Box>
          <Box alignItems="center" gap={8}>
            <Text size="2xs" bold color="$coolGray400">
              Amount
            </Text>
            <Text size="xs" color="$emerald900">
              {amount.toLocaleString()}
            </Text>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
