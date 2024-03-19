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
import { Iconfirmation } from '../type';

export const ModalTransfer = () => {
  const [methode, setMethode] = useState<string | null>(null);
  const [dataTransfer, setDataTransfer] = useState<Iconfirmation>({
    nominal: 0,
    isOpen: false,
    title: '',
  });

  const handleClose = () => setMethode(null);
  const handleCancel = () => setDataTransfer({ nominal: 0, isOpen: false, title: '' });

  console.log(dataTransfer);

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
    <Modal isOpen={true}>
      <ModalBackdrop />
      <ModalContent display={methode === null ? undefined : 'none'} height={300}>
        <ModalHeader alignItems="flex-start">
          <Box>
            <Heading>Transfer</Heading>
            <Text marginBottom={10} size="xs">
              Select where you want to transfer
            </Text>
          </Box>

          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>

        <ModalBody>
          <Box gap={10} justifyContent="center" alignItems="center">
            <Button
              onPress={() => setMethode('player')}
              action="secondary"
              variant="outline"
              size="sm"
              width="$3/4"
              isFocusVisible={true}>
              <ButtonText>Other Player</ButtonText>
            </Button>
            <Button
              onPress={() => setMethode('bank')}
              action="secondary"
              variant="outline"
              size="sm"
              width="$3/4">
              <ButtonText>Bank</ButtonText>
            </Button>
            <Button
              onPress={() => setMethode('pajak')}
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
        methode={methode}
        handleClose={handleClose}
        handleNextPlayer={handleNextPlayer}
        handleNextBank={handleNextBank}
        handleNextPajak={handleNextPajak}
      />
      <ModalConfirmation data={dataTransfer} />
    </Modal>
  );
};
