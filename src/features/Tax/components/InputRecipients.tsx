import { Box, Button, ButtonText, Image, SelectItem, Text } from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { Header } from '../../../components/Header';
import { InputSelect } from '../../transfer/components/InputSelect';
import { dataConfirmationTaxProps } from './ConfirmationTax';
import { useGlobalStore } from '../../../stores';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { IPlayer } from '../../../stores/type';

interface InputRecipientsProps {
  buttonBack: () => void;
  moveToConfirmation: (data: dataConfirmationTaxProps) => void;
  amount: number;
}

export const InputRecipients: FC<InputRecipientsProps> = ({
  buttonBack,
  moveToConfirmation,
  amount,
}) => {
  const { activePlayer, getSelectedProfile } = useGlobalStore();
  const [player, setPlayer] = useState<string>('');

  const renderRecipients = (listRenderItem: ListRenderItemInfo<IPlayer>) => {
    const idRecipient = listRenderItem?.item?.id;
    const username = listRenderItem?.item?.username;
    const recipientData = getSelectedProfile(idRecipient);

    return <SelectItem label={`${recipientData?.playerName} - ${username}`} value={idRecipient} />;
  };

  return (
    <Box flex={1}>
      <Header title="Transfer Tax" buttonHeader={buttonBack} />
      <Box flex={1} justifyContent="center">
        <Box alignItems="center">
          <Image w={230} h={230} source={require('../../../../asset/search.png')} alt="icon" />
        </Box>
        <Box mt={40}>
          <Box
            bgColor="$blueGray700"
            rounded={10}
            paddingHorizontal={10}
            marginBottom={16}
            justifyContent="center"
            alignItems="center">
            <Box alignItems="center" paddingTop={10} gap={2} borderColor="$secondary200">
              <Text size="xs" color="$secondary200">
                Total Transfer
              </Text>
            </Box>
            <Text size="sm" bold color="$success400">
              {amount.toLocaleString()}
            </Text>
            <Text
              size="2xs"
              color="$secondary200"
              textAlign="center"
              paddingTop={2}
              paddingBottom={10}>
              Last Transfer to Corruptor with amount 50.000
            </Text>
          </Box>
          <InputSelect
            underline
            title="Recipients"
            handleChangeValue={e => setPlayer(e)}
            placeHolder="Please select player">
            <FlatList
              data={activePlayer}
              renderItem={renderRecipients}
              keyExtractor={item => item.id.toLocaleString()}
            />
          </InputSelect>
        </Box>
      </Box>

      <Button
        marginTop={5}
        size="sm"
        variant="outline"
        borderColor="$blueGray700"
        onPress={() => moveToConfirmation({ amount, methode: 'noCard', playerName: player })}
        isDisabled={!player}
        isFocusVisible={false}>
        <ButtonText color="$blueGray700">Transfer Tax</ButtonText>
      </Button>
    </Box>
  );
};
