import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  ButtonText,
  Box,
} from '@gluestack-ui/themed';
import { TextInput } from 'react-native';
import { FC, useState } from 'react';

interface ModalInputAmountProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  handleInputNominal: (e: string) => void;
}

export const ModalInputAmount: FC<ModalInputAmountProps> = ({
  isOpen,
  onClose,
  handleInputNominal,
  amount,
}) => {
  const [inputAmount, setInputAmount] = useState<string>(amount);

  const handleInputAmount = (e: string) => {
    setInputAmount(e);
  };
  const buttonContinue = () => {
    setInputAmount('');
    handleInputNominal(inputAmount);
  };

  const buttonClose = () => {
    setInputAmount('');
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody w="$full" gap={20}>
          <Box gap={30} w="$full">
            <Text textAlign="center" color="$blueGray700" bold>
              Transfer Tax Amount
            </Text>
            <Box>
              <Box
                w="$full"
                borderWidth={1}
                borderColor="$warmGray300"
                pl={5}
                paddingVertical={10}
                rounded={3}>
                <TextInput
                  keyboardType="number-pad"
                  value={inputAmount}
                  onChangeText={handleInputAmount}
                  placeholder="200,000"
                />
              </Box>
              <Text paddingLeft={5} size="2xs" italic>
                Please input the transfer tax amount.
              </Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter gap={10}>
          <Button size="sm" action="negative" width="$1/3" onPress={buttonClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" action="positive" width="$1/3" onPress={buttonContinue}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
