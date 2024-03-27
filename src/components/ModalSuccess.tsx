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
import { FC } from 'react';
import { IconSuccess } from '../../asset/IconSuccess';

interface ModalSuccessProps {
  isOpen: boolean;
  text: string;
  navigateToProfile: () => void;
}

export const ModalSuccess: FC<ModalSuccessProps> = ({ isOpen, text, navigateToProfile }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody>
          <Box alignItems="center" gap={5}>
            <IconSuccess />
            <Text color="$success400" bold>
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
            onPress={navigateToProfile}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
