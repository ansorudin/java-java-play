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
  Box,
} from '@gluestack-ui/themed';

import { useState } from 'react';
import { ModalContents } from './ModalContent';
import { ModalConfirmation } from './ModalConfirmation';
import { Iconfirmation } from '../types';

interface IModalTransfer {
  openModal: boolean;
  handleCloseModal: (modal: string) => void;
}

export const ModalTransfer = (propsModalTransfer: IModalTransfer) => {
  const { openModal, handleCloseModal } = propsModalTransfer;
  const [destination, setDestination] = useState<string | null>(null);
  const [dataTransfer, setDataTransfer] = useState<Iconfirmation>({
    nominal: 0,
    isOpen: false,
    title: '',
  });

  const handleCloseDestination = () => setDestination(null);
  const handleCancel = () => setDataTransfer({ nominal: 0, isOpen: false, title: '' });

  const handleNextPlayer = (player: string, nominal: number) => {
    setDataTransfer({
      isOpen: true,
      nominal,
      title: player,
      handleClose: handleCancel,
    });
  };
  const handleNextBank = (nominal: number, description: string) => {
    setDataTransfer({
      isOpen: true,
      nominal,
      title: 'Bank',
      description,
      handleClose: handleCancel,
    });
  };
  const handleNextPajak = (nominal: number) => {
    setDataTransfer({
      isOpen: true,
      nominal,
      title: 'Pajak',
      handleClose: handleCancel,
    });
  };

  return (
    <Modal isOpen={openModal}>
      <ModalBackdrop />
      <ModalContent display={destination === null ? undefined : 'none'} height={300}>
        <ModalHeader alignItems="flex-start">
          <Box>
            <Heading>Transfer</Heading>
            <Text marginBottom={10} size="xs">
              Select where you want to transfer
            </Text>
          </Box>
          <ModalCloseButton onPress={() => handleCloseModal('transfer')}>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Box gap={10} justifyContent="center" alignItems="center">
            <Button
              onPress={() => setDestination('player')}
              action="secondary"
              variant="outline"
              size="sm"
              width="$3/4"
              isFocusVisible={true}>
              <ButtonText>Other Player</ButtonText>
            </Button>
            <Button
              onPress={() => setDestination('bank')}
              action="secondary"
              variant="outline"
              size="sm"
              width="$3/4">
              <ButtonText>Bank</ButtonText>
            </Button>
            <Button
              onPress={() => setDestination('pajak')}
              action="secondary"
              variant="outline"
              size="sm"
              width="$3/4">
              <ButtonText>Pajak</ButtonText>
            </Button>
          </Box>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
      <ModalContents
        methode={destination}
        handleClose={handleCloseDestination}
        handleNextPlayer={handleNextPlayer}
        handleNextBank={handleNextBank}
        handleNextPajak={handleNextPajak}
      />
      <ModalConfirmation data={dataTransfer} />
    </Modal>
  );
};
