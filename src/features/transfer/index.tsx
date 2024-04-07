import { Text, Box, Button, ButtonText, SelectItem } from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';
import { TextInput } from 'react-native';
import { FC, useState } from 'react';
import { InputSelect } from './components/InputSelect';
import { BalanceCard } from '../../components/BalanceCard';
import { Header } from '../../components/Header';
import { ConfirmationProps } from '../../components/Confirmation';

interface TransferProps {
  navigateToConfirmation: (data: ConfirmationProps) => void;
  handleBack: () => void;
  navigateToProfile: () => void;
}

export const Transfer: FC<TransferProps> = ({
  navigateToConfirmation,
  handleBack,
  navigateToProfile,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  const buttonNext = () => {
    const data: ConfirmationProps = {
      playerName: 'Siavash',
      playerImage: 'https://i.pinimg.com/474x/46/99/a9/4699a943e8eeb6adcfdfff87efbc1297.jpg',
      recipients: player,
      description,
      amount: parseInt(amount),
      transaction: 'Transfer to ' + destination,
      handleBack,
      navigateToProfile,
    };
    navigateToConfirmation(data);
  };

  return (
    <Box flex={1}>
      <Header title="Money Transfer" buttonHeader={() => navigate('Profile')} />
      <Box flex={1}>
        <BalanceCard currentSaldo={60000} cardHolder="Siavash" />
        <Box marginHorizontal={3} mt={40}>
          <InputSelect
            underline
            title="Transfer Destination"
            handleChangeValue={e => setDestination(e)}
            placeHolder="Select Destination">
            <SelectItem label="Transfer Bank" value="bank" />
            <SelectItem label="Transfer Tax" value="tax" />
            <SelectItem label="Transfer Other Player" value="player" />
          </InputSelect>
        </Box>

        <Box
          height={200}
          gap={10}
          marginTop={20}
          display={destination ? 'flex' : 'none'}
          marginHorizontal={3}>
          <Box display={destination === 'player' ? undefined : 'none'}>
            <InputSelect
              underline
              title="Recipient"
              handleChangeValue={e => setPlayer(e)}
              placeHolder="Select Player">
              <SelectItem label="Player 1" value="Player 1" />
              <SelectItem label="Player 2" value="Player 2" />
              <SelectItem label="Player 3" value="Player 3" />
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

          <Box display={destination === 'bank' ? undefined : 'none'}>
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
          (destination === 'bank' && !description) ||
          (destination === 'player' && !player)
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
