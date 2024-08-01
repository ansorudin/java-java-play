import { Box, Text, Image, Button, ButtonText } from '@gluestack-ui/themed';
import { FC } from 'react';
import { useGlobalStore } from '../../../stores';
import { HistoryType, TransactionType, History } from '../../../stores/type';

interface PlayerProps {
  playerId: string;
  amount: number;
  detail: string;
}

export const Player: FC<PlayerProps> = ({ playerId, amount, detail }) => {
  const { profiles, onChallengeIncome, setSaldoPlayer, setDataHistory, dataOtherPlayer } =
    useGlobalStore();
  const dataPlayer = profiles.find(profile => profile.playerId === playerId);

  const onSalary = () => {
    const officeWorkerId = '600da590';
    const dataBank = dataOtherPlayer.bank;
    if (dataPlayer) {
      // additional saldo
      const balanceAddition = dataPlayer.playerId === officeWorkerId ? 40000 : 20000;
      setSaldoPlayer(playerId, amount + balanceAddition);

      // add history
      const dataToSend: History = {
        ...dataPlayer,
        playerName: dataBank.name,
        image: dataBank.image,
        amount: dataPlayer.playerId === officeWorkerId ? 40000 : 20000,
        transaction: TransactionType.Salary,
        type: HistoryType.Income,
        color: 'white',
      };
      setDataHistory(dataToSend, playerId);
    }
  };

  const onPaymentTax = () => {
    if (dataPlayer) {
      // decreasing saldo
      setSaldoPlayer(playerId, amount - 20000);
      const dataTax = dataOtherPlayer.tax;

      //add history
      const dataToSend: History = {
        ...dataPlayer,
        playerName: dataTax.name,
        image: dataTax.image,
        amount: 20000,
        transaction: TransactionType.Tax,
        type: HistoryType.Payment,
        color: 'black',
      };
      setDataHistory(dataToSend, playerId);
    }
  };

  const onChallengeWinIncome = () => {
    if (dataPlayer?.playerId) {
      onChallengeIncome(dataPlayer?.playerId);
      return;
    }
  };

  return (
    <Box
      flexDirection="row"
      zIndex={10}
      w="$full"
      alignItems="center"
      position="relative"
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
          backgroundColor={dataPlayer?.color}
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
            onPress={onPaymentTax}>
            <ButtonText size="2xs">Tax</ButtonText>
          </Button>
          <Button size="xs" action="positive" onPress={onSalary}>
            <ButtonText size="2xs">Salary</ButtonText>
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
  );
};
