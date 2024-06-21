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
  const { profiles, onTaxPayment, onSalaryIncome, onChallengeIncome } = useGlobalStore();
  const dataPlayer = profiles.find(profile => profile.playerId === playerId);

  const onSalary = () => {
    if (dataPlayer?.playerId === '600da590') {
      onSalaryIncome(40000, playerId);
      return;
    }
    onSalaryIncome(20000, playerId);
  };

  const onChallengeWinIncome = () => {
    if (dataPlayer?.playerId) {
      onChallengeIncome(dataPlayer?.playerId);
      return;
    }
  };

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
              isDisabled={dataPlayer?.playerId === '9d71fb69' ? true : false}
              size="xs"
              variant="outline"
              action="negative"
              onPress={() => onTaxPayment(20000, playerId)}>
              <ButtonText size="2xs">Tax</ButtonText>
            </Button>
            <Button size="xs" action="positive" onPress={onSalary}>
              <ButtonText size="2xs">Fee</ButtonText>
            </Button>
            <Button
              display={dataPlayer?.playerId === 'ddd0861a' ? 'flex' : 'none'}
              size="xs"
              bg="$warning400"
              onPress={onChallengeWinIncome}>
              <ButtonText size="2xs">Dare</ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
