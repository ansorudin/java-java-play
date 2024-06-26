import { Text } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { TextInput } from 'react-native';
import { QuickButtonTopup } from './QuickButtonTopup';

interface TopupBankProps {
  err: string;
  amount: string;
  handleInputNominal: (e: string) => void;
  handleChangeAmount: (e: string) => void;
}

export const TopupBank: FC<TopupBankProps> = ({
  err,
  amount,
  handleInputNominal,
  handleChangeAmount,
}) => {
  const price = Number(amount);

  const [activeButton, setActiveButton] = useState<number>(0);

  const onChangeAmount = (event: number) => {
    if (event === 1) {
      setActiveButton(1);
      handleChangeAmount('10000');
    } else if (event === 2) {
      setActiveButton(2);
      handleChangeAmount('20000');
    } else if (event === 3) {
      setActiveButton(3);
      handleChangeAmount((price / 2).toString());
    } else {
      setActiveButton(4);
      handleChangeAmount((price * 2).toString());
    }
  };
  return (
    <Box marginHorizontal={4} marginTop={10} flex={1} mb={10}>
      <Text bold>Enter Amount</Text>
      <Box marginTop={10} marginBottom={10}>
        <Box
          borderWidth={1}
          borderColor={err ? '$red400' : '$warmGray300'}
          pl={5}
          paddingVertical={10}
          rounded={3}>
          <TextInput
            style={err ? { color: 'red' } : { color: 'black' }}
            keyboardType="number-pad"
            value={amount}
            onChangeText={handleInputNominal}
            placeholder="Please enter amount"
          />
        </Box>
        <Text paddingLeft={5} size="2xs" color={err ? '$red400' : '$blueGray400'} italic>
          {err ? err : 'Exp. 200.000'}
        </Text>
      </Box>

      <Text bold>Quick Actions</Text>
      <Box flexDirection="row" justifyContent="space-between" marginTop={10}>
        <QuickButtonTopup
          display={true}
          title="10.000"
          type={1}
          active={activeButton === 1}
          onChangeAmount={onChangeAmount}
        />
        <QuickButtonTopup
          display={true}
          title="20.000"
          type={2}
          active={activeButton === 2}
          onChangeAmount={onChangeAmount}
        />
        <QuickButtonTopup
          display={price > 0}
          title="50%"
          type={3}
          active={activeButton === 3}
          onChangeAmount={onChangeAmount}
        />
        <QuickButtonTopup
          display={price > 0}
          title="2X"
          type={4}
          active={activeButton === 4}
          onChangeAmount={onChangeAmount}
        />
      </Box>
    </Box>
  );
};
