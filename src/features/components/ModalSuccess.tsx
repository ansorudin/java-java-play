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
  Image,
  Box,
} from '@gluestack-ui/themed';
import { navigate } from '../../routes/MainNavigator';

interface PropsModalSuccess {
  isOpen: boolean;
  text: string;
}

export const ModalSuccess = (props: PropsModalSuccess) => {
  const { isOpen, text } = props;
  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent alignItems="center" paddingVertical="$5">
        <ModalHeader />
        <ModalBody>
          <Box alignItems="center" gap={10}>
            <Image size="xs" source={require('../../../asset/success.png')} alt="card" />
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
            onPress={() => navigate('Profile')}>
            <ButtonText>Continue</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
