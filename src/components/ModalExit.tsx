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
import { IconSuccess } from '../../asset/IconSuccess';

interface ModalSuccessProps {
  isOpen: boolean;
  navigateToProfile: () => void;
}

export const ModalExit: FC<ModalSuccessProps> = ({ isOpen, navigateToProfile }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody>
          <Box alignItems="center" gap={5}>
            <Image w={200} h={200} source={require('../../asset/iconExit.png')} alt="icon" />
            <Text color="$success400" bold>
              SUCCESS
            </Text>
            <Text size="sm" textAlign="center">
              Are you sure want to exit game
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            action="negative"
            borderWidth="$0"
            width="$1/2"
            onPress={navigateToProfile}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
