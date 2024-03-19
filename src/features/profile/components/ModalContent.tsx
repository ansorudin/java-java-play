import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Icon,
  Heading,
  Button,
  ButtonText,
  Box,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  ChevronDownIcon,
  SelectIcon,
  Text,
} from '@gluestack-ui/themed';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { IModalContent } from '../type';

export const ModalContents = (props: IModalContent) => {
  const { handleClose, methode, handleNextBank, handleNextPlayer, handleNextPajak } = props;
  const [nominal, setNominal] = useState<number>(0);
  const [player, setPlayer] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const handleActionClose = () => {
    setNominal(0);
    setDescription('');
    handleClose();
  };

  const isDisables = () => {
    if ((methode === 'bank' && nominal <= 0) || !description) {
      return true;
    } else if ((methode === 'player' && nominal <= 0) || !player) {
      return true;
    } else if (methode === 'pajak' && nominal <= 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log(nominal, player);

  const handleNext = () => {
    if (methode === 'bank') {
      handleNextBank(nominal, description);
    } else if (methode === 'player') {
      handleNextPlayer(player, nominal);
    } else if (methode === 'pajak') {
      handleNextPajak(nominal);
    }
  };

  return (
    <ModalContent display={methode != null ? undefined : 'none'} height={300}>
      <ModalHeader>
        <Heading>Transfer To {methode}</Heading>
      </ModalHeader>
      <ModalBody>
        <Text size="xs" marginBottom={2} display={methode === 'player' ? undefined : 'none'}>
          Player Name
        </Text>
        <Select
          onValueChange={e => setPlayer(e)}
          display={methode === 'player' ? undefined : 'none'}
          marginBottom={20}>
          <SelectTrigger variant="underlined" size="sm">
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

        <Box marginBottom={20}>
          <Text size="xs" marginBottom={2}>
            Nominal
          </Text>
          <Box borderBottomWidth={1} borderColor="$warmGray300" padding={5}>
            <TextInput
              keyboardType="numeric"
              placeholder="exps 200.000"
              onChangeText={e => setNominal(parseInt(e))}
            />
          </Box>
        </Box>

        <Box display={methode === 'bank' ? undefined : 'none'}>
          <Text size="xs" marginBottom={2}>
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
      </ModalBody>
      <ModalFooter>
        <Button onPress={handleActionClose} variant="outline" size="sm" action="secondary" mr="$3">
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button onPress={handleNext} size="sm" action="positive" borderWidth="$0">
          <ButtonText>Next</ButtonText>
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
