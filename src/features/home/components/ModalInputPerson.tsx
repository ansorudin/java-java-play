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
  Input,
  InputField,
  Box,
} from '@gluestack-ui/themed';
import { FC, useState } from 'react';

interface ModalInputAmountProps {
  isOpen: boolean;
  onClose: () => void;
  handleInputUsername: (e: string) => void;
}

export const ModalInputPerson: FC<ModalInputAmountProps> = ({
  isOpen,
  onClose,
  handleInputUsername,
}) => {
  const [inputUsername, setInputUsername] = useState<string>('');

  const handleInput = (e: string) => {
    setInputUsername(e);
  };
  const buttonContinue = () => {
    setInputUsername('');
    handleInputUsername(inputUsername);
    onClose();
  };

  const buttonClose = () => {
    setInputUsername('');
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
              Input Username
            </Text>
            <Box>
              <Input
                variant="outline"
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}>
                <InputField onChangeText={handleInput} placeholder="Enter Text here" />
              </Input>
              <Text paddingLeft={5} size="2xs" italic>
                Please input username
              </Text>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter gap={10}>
          <Button size="xs" action="negative" width="$1/3" onPress={buttonClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button
            isDisabled={!inputUsername}
            size="xs"
            action="positive"
            width="$1/3"
            onPress={buttonContinue}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
