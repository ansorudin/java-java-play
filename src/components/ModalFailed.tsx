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

interface ModalFailedProps {
  isOpen: boolean;
  navigateNextScreen: () => void;
  text: string;
}

export const ModalFailed: FC<ModalFailedProps> = ({ isOpen, navigateNextScreen, text }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody>
          <Box alignItems="center" gap={5}>
            <Image w={80} h={80} source={require('../../asset/iconExit.png')} alt="icon" />
            <Text color="$red400" bold marginTop={20}>
              ERROR!!
            </Text>
            <Text size="sm" textAlign="center">
              {text}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            action="negative"
            borderWidth="$0"
            width="$1/2"
            onPress={navigateNextScreen}>
            <ButtonText>Sure</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
