import { Text } from '@gluestack-ui/themed';
import { Box } from '@gluestack-ui/themed';
import { FC } from 'react';
import { TextInput } from 'react-native';
import { ActiveTopUpType } from '..';
import { ButtonQuickAction } from './ButtonQuickAction';

interface TopupBankProps {
  active: string;
  err: string;
  amount: string;
  handleInputNominal: (e: string) => void;
  handleChangeAmount: (e: string) => void;
}

export const TopupBank: FC<TopupBankProps> = ({
  err,
  amount,
  handleInputNominal,
  active,
  handleChangeAmount,
}) => {
  const price = Number(amount);
  return (
    <Box
      marginHorizontal={4}
      flex={1}
      mb={10}
      display={active === ActiveTopUpType.TopUp ? 'flex' : 'none'}>
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
        <ButtonQuickAction
          display={true}
          buttonText="250.000"
          handleChangeAmount={handleChangeAmount}
          price="250000"
        />
        <ButtonQuickAction
          display={price > 0 ? true : false}
          buttonText="50% from amount"
          handleChangeAmount={handleChangeAmount}
          price={(price / 2).toString()}
        />
        <ButtonQuickAction
          display={price > 0 ? true : false}
          buttonText="2 X  from amount"
          handleChangeAmount={handleChangeAmount}
          price={(price * 2).toString()}
        />
      </Box>
    </Box>
  );
};
