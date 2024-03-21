import { Text, Box, Button, ButtonIcon, ChevronLeftIcon, ButtonText } from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';
import { ButtonQuickAction } from './components/ButtonQuickAction';

export const Topup = () => {
  const [amount, setAmount] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  return (
    <Box flex={1}>
      <Button
        onPress={() => navigate('Profile')}
        position="absolute"
        size="sm"
        variant="solid"
        aspectRatio={1}
        rounded="$full"
        backgroundColor="$coolGray300"
        zIndex={1}>
        <ButtonIcon size="md" as={ChevronLeftIcon} color="$coolGray500" />
      </Button>
      <Box paddingVertical={5} alignItems="center" marginBottom={30}>
        <Text bold>Money Top Up</Text>
      </Box>

      <Box position="relative">
        <Box position="absolute">
          <Image
            source={require('../../../asset/Standar.jpg')}
            alt="card"
            style={{ height: 165, borderRadius: 10 }}
          />
        </Box>
        <Box
          height={165}
          paddingVertical={20}
          paddingHorizontal={25}
          justifyContent="space-between"
          gap={10}>
          <Box gap={4}>
            <Text color="white" size="sm">
              Available Balance
            </Text>
            <Text color="white" size="xl" bold>
              Rp 500,000
            </Text>
          </Box>

          <Box>
            <Text color="white" size="xs">
              Card Holder
            </Text>
            <Text color="white" size="lg">
              Siavash
            </Text>
          </Box>
        </Box>

        <Box marginTop={30}>
          <Text bold>Enter Amount</Text>
          <Box marginTop={10} marginBottom={20}>
            <Box borderWidth={1} borderColor="$warmGray300" pl={5} paddingVertical={10} rounded={3}>
              <TextInput
                keyboardType="number-pad"
                value={amount}
                onChangeText={handleInputNominal}
                placeholder="Please enter amount"
              />
            </Box>
            <Text paddingLeft={5} size="xs" italic>
              Exp. 200.000
            </Text>
          </Box>

          <Text bold>Quick Actions</Text>
          <Box flexDirection="row" justifyContent="space-between" marginTop={10}>
            <ButtonQuickAction
              buttonText="Rp.100.000"
              handleChangeAmount={() => setAmount('100000')}
            />
            <ButtonQuickAction
              buttonText="Rp.200.000"
              handleChangeAmount={() => setAmount('200000')}
            />
            <ButtonQuickAction
              buttonText="Rp.300.000"
              handleChangeAmount={() => setAmount('300000')}
            />
          </Box>
          <Button
            isDisabled={!amount}
            variant="solid"
            size="md"
            marginTop={30}
            onPress={() => navigate('Confirmation')}>
            <ButtonText size="sm" color="white">
              Next
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
