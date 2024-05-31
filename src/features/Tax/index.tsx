import {
  Box,
  Text,
  Button,
  ButtonText,
  CheckboxIcon,
  CheckboxLabel,
  Image,
  Alert,
  AlertIcon,
  AlertText,
  InfoIcon,
  HStack,
} from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { HistoryTransactionItem } from './components/HistoryTransactionItem';
import { Checkbox } from '@gluestack-ui/themed';
import { CheckboxIndicator } from '@gluestack-ui/themed';
import { CheckIcon } from '@gluestack-ui/themed';
import { ModalInputAmount } from './components/ModalInputAmount';
import { useGlobalStore } from '../../stores';
import { MethodeType } from './components/ConfirmationTax';
import { ActionType } from '../scanNfc';

interface TaxBalanceProps {
  moveNfcReaderTag: (amount: number, action: ActionType) => void;
  moveInputRecipients: (amount: number) => void;
}
export const TaxBalance: FC<TaxBalanceProps> = ({ moveInputRecipients, moveNfcReaderTag }) => {
  const [isNfc, setIsNfc] = useState<string>(MethodeType.NfC);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');
  const { taxAmount } = useGlobalStore();

  const handleTransferTax = () => {
    const nominal = Number(amount);
    if (isNfc === MethodeType.NfC) {
      moveNfcReaderTag(nominal, ActionType.history);
    } else {
      moveInputRecipients(nominal);
    }
    setAmount('');
  };
  const handleCheckbox = (value: string) => {
    if (isNfc === MethodeType.NfC) {
      setIsNfc(value);
    } else {
      setIsNfc(MethodeType.NfC);
    }
  };

  const handleInputNominal = (e: string) => {
    setAmount(e);
    setOpenModal(false);
  };
  const handleClose = () => {
    setAmount('');
    setOpenModal(false);
  };

  const widht = Dimensions.get('window').width;

  return (
    <Box flex={1}>
      <Box bgColor="$blueGray700" rounded={10} paddingHorizontal={10}>
        <Box
          borderBottomWidth={1}
          alignItems="center"
          paddingVertical={10}
          gap={2}
          borderColor="$secondary200">
          <Text size="xs" color="$secondary200">
            Current Saldo
          </Text>
          <Text size="sm" color="white" bold>
            {taxAmount.toLocaleString()}
          </Text>
        </Box>
        <Box alignItems="center" paddingTop={10} gap={2} borderColor="$secondary200">
          <Text size="xs" color="$secondary200">
            Total Transfer
          </Text>
          <Text size="sm" bold color={amount ? '$success400' : '$error400'}>
            {amount ? amount : '-'}
          </Text>
        </Box>
        <Text size="2xs" color="$secondary200" textAlign="center" paddingTop={2} paddingBottom={10}>
          Last Transfer to Corruptor with amount 50.000
        </Text>
      </Box>

      <Box flex={3} gap={5} justifyContent="flex-start" pt={30}>
        <Box>
          <HStack justifyContent="center" gap={50}>
            <TouchableOpacity onPress={() => setAmount(taxAmount.toLocaleString())}>
              <Box alignItems="center" gap={5}>
                <Box bgColor="$blueGray700" padding={8} rounded={5}>
                  <Image
                    w={40}
                    h={30}
                    source={require('../../../asset/government.png')}
                    alt="icon"
                  />
                </Box>
                <Text size="xs">Entire Tax</Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpenModal(true)}>
              <Box alignItems="center" gap={5}>
                <Box bgColor="$blueGray700" padding={8} rounded={5}>
                  <Image
                    w={40}
                    h={30}
                    source={require('../../../asset/government.png')}
                    alt="icon"
                  />
                </Box>
                <Text size="xs">Other Amount</Text>
              </Box>
            </TouchableOpacity>
          </HStack>
        </Box>
        <Checkbox
          marginTop={20}
          size="sm"
          value={isNfc}
          aria-label="label"
          onChange={() => handleCheckbox(MethodeType.NoCard)}>
          <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel size="xs">Transfer without card</CheckboxLabel>
        </Checkbox>

        <Button
          marginTop={5}
          size="sm"
          variant="outline"
          $active-borderColor="$amber100"
          borderColor="$blueGray700"
          isDisabled={!amount || Number(amount) <= 0}
          onPress={handleTransferTax}
          isFocusVisible={false}>
          <ButtonText color="$blueGray700">Transfer Tax</ButtonText>
        </Button>
      </Box>
      {/*
      <Box
        flex={2}
        gap={10}
        bgColor="$blueGray700"
        style={{ width: widht }}
        marginLeft={-20}
        marginBottom={-30}
        paddingHorizontal={20}
        borderTopStartRadius={20}
        borderTopEndRadius={20}>
        <Text color="$secondary200" size="sm" textAlign="center" paddingTop={15}>
          History Transaction
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HistoryTransactionItem
            title="Transfer to Corruptor"
            type="transfer"
            amount={60000}
            dateTime="31/03/24 14:27:27"
          />
          <HistoryTransactionItem
            title="Income from Corruptor"
            type="income"
            amount={70000}
            dateTime="31/03/24 14:27:27"
          />
          <HistoryTransactionItem
            title="Income from Bussinessman"
            type="income"
            amount={50000}
            dateTime="31/03/24 14:27:27"
          />
        </ScrollView>
      </Box> */}
      <ModalInputAmount
        isOpen={openModal}
        onClose={handleClose}
        handleInputNominal={handleInputNominal}
        amount={amount}
      />
    </Box>
  );
};
