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
  Image,
} from '@gluestack-ui/themed';
import { FC } from 'react';
// import { IconSuccess } from '../../asset/IconSuccess';

interface ModalSuccessProps {
  isOpen: boolean;
  text: string;
  navigateNextScreen: () => void;
}

export const ModalSuccess: FC<ModalSuccessProps> = ({ isOpen, text, navigateNextScreen }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody>
          <Box alignItems="center" gap={5}>
            <Image w={80} h={80} source={require('../../asset/success.png')} alt="icon" />
            <Text color="$success400" bold marginTop={20}>
              SUCCESS
            </Text>
            <Text size="sm" textAlign="center">
              {text} successful!!
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            action="positive"
            borderWidth="$0"
            width="$1/2"
            onPress={navigateNextScreen}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
