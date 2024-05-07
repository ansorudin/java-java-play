import { Box, Button, ButtonText, Image, SelectItem, Text } from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { Header } from '../../../components/Header';
import { InputSelect } from '../../transfer/components/InputSelect';
import { dataConfirmationTaxProps } from './ConfirmationTax';

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
  const [player, setPlayer] = useState<string>('');
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
            <SelectItem label="Traveller - Happy Go Round" value="Traveller" />
            <SelectItem label="Corruptor - Bribery" value="Corruptor" />
            <SelectItem label="Businessman - Tax Evasion" value="Businessman" />
            <SelectItem label="Office Worker - Overtime Payment" value="Office Worker" />
            <SelectItem label="Contractor - Building Master" value="Contractor" />
            <SelectItem label="Celebrity - Endorsement" value="Celebrity" />
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
