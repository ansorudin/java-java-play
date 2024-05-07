import { Text, Box, Button, ButtonText, SelectItem } from '@gluestack-ui/themed';
import { TextInput } from 'react-native';
import { FC, useState } from 'react';
import { InputSelect } from './InputSelect';
import { BalanceCard } from '../../../components/BalanceCard';
import { Header } from '../../../components/Header';
import { dataConfirmationProps } from '../../../components/Confirmation';
import { dataProfileProps } from '../../profile';

interface TransferProps {
  navigateToConfirmation: (data: dataConfirmationProps) => void;
  handleBack: () => void;
  data: DataInputTransferProps;
}
export interface DataInputTransferProps extends dataProfileProps {
  transferDestination: string;
}

export const InputDataTransfer: FC<TransferProps> = ({
  navigateToConfirmation,
  handleBack,
  data,
}) => {
  const { transferDestination, playerName } = data;
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  const buttonNext = () => {
    const datas: dataConfirmationProps = {
      playerName: playerName,
      playerImage: 'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
      recipients: player,
      description,
      amount: parseInt(amount),
      transaction: 'Transfer to ' + transferDestination,
    };
    navigateToConfirmation(datas);
  };

  return (
    <Box flex={1}>
      <Header title={`Transfer to ${transferDestination}`} buttonHeader={handleBack} />
      <Box flex={1}>
        <BalanceCard currentSaldo={data.totalBalance} cardHolder={data.playerName} />

        <Box
          height={200}
          gap={10}
          marginTop={20}
          display={transferDestination ? 'flex' : 'none'}
          marginHorizontal={3}>
          <Box display={transferDestination === 'player' ? undefined : 'none'}>
            <InputSelect
              underline
              title="Recipient"
              handleChangeValue={e => setPlayer(e)}
              placeHolder="Select Player">
              <SelectItem label="Traveller - Happy Go Round" value="Traveller" />
              <SelectItem label="Corruptor - Bribery" value="Corruptor" />
              <SelectItem label="Businessman - Tax Evasion" value="Businessman" />
              <SelectItem label="Office Worker - Overtime Payment" value="Office Worker" />
              <SelectItem label="Contractor - Building Master" value="Contractor" />
              <SelectItem label="Celebrity - Endorsement" value="Celebrity" />
            </InputSelect>
          </Box>

          <Box gap={10}>
            <Text bold>Amount</Text>
            <Box
              borderBottomWidth={1}
              borderColor="$warmGray300"
              pl={10}
              paddingVertical={10}
              rounded={3}>
              <TextInput
                keyboardType="number-pad"
                value={amount}
                onChangeText={handleInputNominal}
                placeholder="Exp. 200.000"
              />
            </Box>
          </Box>

          <Box display={transferDestination === 'bank' ? undefined : 'none'}>
            <InputSelect
              underline
              title="Description"
              handleChangeValue={e => setDescription(e)}
              placeHolder="Select Descriptions">
              <SelectItem label="Purchase Asset" value="Purchase Asset" />
              <SelectItem label="Excess Transfer" value="Excess Transfer" />
              <SelectItem label="Other" value="Other" />
            </InputSelect>
          </Box>
        </Box>
      </Box>
      <Button
        isDisabled={
          !amount ||
          (transferDestination === 'bank' && !description) ||
          (transferDestination === 'player' && !player)
        }
        variant="solid"
        size="md"
        onPress={buttonNext}>
        <ButtonText size="sm" color="white">
          Next
        </ButtonText>
      </Button>
    </Box>
  );
};
