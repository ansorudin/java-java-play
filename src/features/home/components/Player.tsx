import { Box, Text, Image, Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useGlobalStore } from '../../../stores';

interface PlayerProps {
  playerId: string;
  amount: number;
  detail: string;
  moveProfile: () => void;
}

export const Player: FC<PlayerProps> = ({ playerId, amount, detail, moveProfile }) => {
  const { profiles, onTaxPayment, onSalaryIncome } = useGlobalStore();
  const dataPlayer = profiles.find(profile => profile.playerId === playerId);
  return (
    <TouchableOpacity onPress={moveProfile}>
      <Box
        flexDirection="row"
        w="$full"
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={10}
        paddingVertical={15}
        borderBottomWidth={1}
        borderColor="$coolGray300"
        gap={2}
        rounded={6}>
        <Box justifyContent="center" alignItems="center">
          <Image
            rounded="$full"
            w={50}
            h={50}
            size="full"
            alt="image"
            source={dataPlayer?.image}
            backgroundColor="$emerald100"
          />
          <Text size="2xs" color="$emerald900" bold>
            {dataPlayer?.playerName}
          </Text>
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          w="$4/5"
          gap={10}>
          <Box>
            <Text bold size="sm" color="$coolGray700">
              {detail}
            </Text>
            <Text size="xs" color="$emerald900">
              <Text size="sm" strikeThrough bold color="$emerald900">
                M
              </Text>{' '}
              {amount.toLocaleString()}
            </Text>
          </Box>

          <Box flexDirection="row" gap={6}>
            <Button
              size="xs"
              variant="outline"
              action="negative"
              onPress={() => onTaxPayment(20000, playerId)}>
              <ButtonText>Tax</ButtonText>
            </Button>
            <Button size="xs" action="positive" onPress={() => onSalaryIncome(20000, playerId)}>
              <ButtonText>Salary</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
