import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Icon,
  Heading,
  CloseIcon,
  Text,
  Button,
  ButtonText,
} from '@gluestack-ui/themed';
import { Iconfirmation } from '../types';

interface Props {
  data: Iconfirmation;
}

export const ModalConfirmation = (props: Props) => {
  const { title, nominal, description, isOpen, handleClose } = props.data;

  console.log(isOpen);

  return (
    <Modal isOpen={isOpen}>
      <ModalBackdrop />
      <ModalContent height={300}>
        <ModalHeader>
          <Heading>Confirmation Transfer To {title}</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody display="flex">
          <Text>
            Are you sure you make a transfer of <Text bold>{nominal.toLocaleString()}</Text> to the{' '}
            <Text bold>{title}</Text> describing <Text bold>{description}</Text>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" size="sm" action="negative" mr="$3" onPress={handleClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button size="sm" action="positive" borderWidth="$0">
            <ButtonText>Sure</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
