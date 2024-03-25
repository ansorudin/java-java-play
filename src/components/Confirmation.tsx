import { Box, Text, Button, Image, ButtonText } from '@gluestack-ui/themed';
import { ModalSuccess } from './ModalSuccess';
import { FC, useState } from 'react';
import { ItemTransaction } from './ItemTransaction';
import { Header } from './Header';

interface ConfirmationProps {
  playerImage: string;
  playerName: string;
  transaction: string;
  amount: string;
  handleBack: () => void;
  recipients?: string;
  description?: string;
  navigateToProfile: () => void;
}

export const Confirmation: FC<ConfirmationProps> = ({
  playerName,
  playerImage,
  amount,
  transaction,
  recipients,
  description,
  handleBack,
  navigateToProfile,
}) => {
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const amountStr: number = parseInt(amount);
  const handleClose = () => {
    setOpenModalSuccess(false);
    navigateToProfile;
  };
  console.log(recipients);

  return (
    <Box flex={1}>
      <Header title="Confirmation" buttonHeader={handleBack} />
      <Box alignItems="center" gap={10}>
        <Text size="2xl" bold>
          Are you sure ?
        </Text>
        <Text size="sm" textAlign="center">
          Please make sure that you want proceed this transaction.
        </Text>

        <Box alignItems="center" width="$full" mt={20}>
          <Image
            height={60}
            position="absolute"
            width={60}
            rounded="$full"
            borderColor="$secondary300"
            alt="image"
            zIndex={1}
            source={{ uri: playerImage }}
          />
          <Box
            backgroundColor="$coolGray200"
            rounded="$lg"
            mt={30}
            width="$full"
            paddingVertical="$10"
            paddingHorizontal={24}>
            <Text size="xl" bold textAlign="center">
              {playerName}
            </Text>

            <ItemTransaction
              title={transaction === 'Top Up' ? 'Funding source' : 'Recipients'}
              text={transaction === 'Top Up' ? 'Bank' : recipients}
              hidden={transaction !== 'Transfer to player'}
            />

            <ItemTransaction title="Transaction" text={transaction} />
            <ItemTransaction
              title={transaction === 'Top Up' ? 'Top Up Amount' : 'Transfer Amount'}
              text={`Rp. ${amountStr.toLocaleString()}`}
            />
            <ItemTransaction
              title="Description"
              text={description}
              hidden={transaction !== 'Transfer to bank'}
            />
          </Box>
        </Box>
        <Button variant="solid" p="$0" size="md" mt={40} width="$2/3">
          <ButtonText onPress={() => setOpenModalSuccess(true)} size="md">
            Continue
          </ButtonText>
        </Button>
      </Box>
      <ModalSuccess
        isOpen={openModalSuccess}
        text={transaction === 'Top Up' ? 'Top up money from bank' : 'Transfer money'}
        navigateToProfile={handleClose}
      />
    </Box>
  );
};

export type { ConfirmationProps };
