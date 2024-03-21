import {
  Text,
  ChevronDownIcon,
  Box,
  Button,
  ButtonIcon,
  ChevronLeftIcon,
  ButtonText,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  Icon,
} from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { Image } from 'react-native';

import { Select } from '@gluestack-ui/themed';
import { useEffect } from 'react';

export const Transfer = () => {
  const [amount, setAmount] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [player, setPlayer] = useState<string>('');
  const handleInputNominal = (e: string) => {
    setAmount(e);
  };

  let disable = false;
  const funcDisable = () => {
    if (destination === 'bank') {
      if (!amount || !description) {
        disable = true;
      }
    }
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
        <Text bold>Money Transfer</Text>
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
          marginBottom={20}
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

        <Text bold>Transfer Destination</Text>
        <Select onValueChange={e => setDestination(e)}>
          <SelectTrigger variant="underlined" size="sm">
            <SelectInput placeholder="Select Destination" fontSize="$xs" />
            <SelectIcon>
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem label="Transfer Bank" value="bank" />
              <SelectItem label="Transfer Tax" value="tax" />
              <SelectItem label="Transfer Other Player" value="player" />
            </SelectContent>
          </SelectPortal>
        </Select>

        <Box marginTop={20} display={destination ? 'flex' : 'none'}>
          <Box display={destination === 'player' ? undefined : 'none'}>
            <Text bold>Enter Recipient</Text>
            <Select onValueChange={e => setPlayer(e)} marginBottom={20}>
              <SelectTrigger variant="outline" size="sm">
                <SelectInput placeholder="Select Player" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Player 1" value="Player 1" />
                  <SelectItem label="Player 2" value="Player 2" />
                  <SelectItem label="Player 3" value="Player 3" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
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

          <Box display={destination === 'bank' ? undefined : 'none'}>
            <Text marginBottom={2} bold>
              Description
            </Text>
            <Select onValueChange={e => setDescription(e)}>
              <SelectTrigger variant="underlined" size="sm">
                <SelectInput placeholder="Select Descriptions" fontSize="$xs" />
                <SelectIcon>
                  <Icon as={ChevronDownIcon} />
                </SelectIcon>
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Purchase Asset" value="purchaseAsset" />
                  <SelectItem label="Excess Transfer" value="excessTransfer" />
                  <SelectItem label="Other" value="other" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
        </Box>
        <Button
          isDisabled={disable}
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
  );
};
